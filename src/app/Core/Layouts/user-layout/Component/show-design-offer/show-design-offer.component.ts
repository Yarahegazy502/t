import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SiteData } from 'src/app/Shared/Model/SiteData.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { spaceOutput } from 'src/app/Shared/Model/SpaceOutput.model';
import { Style } from 'src/app/Shared/Model/Style.model';
import { RequiredOutputService } from 'src/app/Shared/Services/required-output.service';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';
import { StyleService } from 'src/app/Shared/Services/style.service';

@Component({
  selector: 'app-show-design-offer',
  templateUrl: './show-design-offer.component.html',
  styleUrls: ['./show-design-offer.component.scss']
})
export class ShowDesignOfferComponent implements OnInit {

  public FixForm: FormGroup;
  public myForm: FormGroup = this.mf.group({});
  intCount: number = 0;

  imageURL1 : string = "assets/images/NoImage.jpg";
  imageURL2 : string = "assets/images/NoImage.jpg";

  imageURL3 : string = "assets/images/NoImage.jpg";
  imageURL4 : string = "assets/images/NoImage.jpg";

  strSiteData: SiteData[] = [];
  cmbstrSpaceData: SpaceData[] = [];
  strSpaceRequiredOutput : spaceOutput[] = [];
  strRequiredOutput : spaceOutput[] = [];
  strStyle : Style[] = [];

  Loading: boolean = false;

  constructor(private cf: FormBuilder,
              private sitedata: SiteDataService,
              private spacedata: SpaceDataService,
              private requiredoutput : RequiredOutputService,
              private style : StyleService,
              private mf: FormBuilder,
              public dialogRef: MatDialogRef<ShowDesignOfferComponent>,
              private route : Router)
   {
    this.FixForm = cf.group({
      cAddress: [0],
      cFloor: [0],
      cArea: [0],
      cSiteType: [''],
      cSpaceData : [0]
    });

    this.myForm = mf.group({
      cLength : [0],
      cWidth : [0],
      cHeight : [0],
      cStyle : [{value : false, disabled : true}]
    });
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      if (sessionStorage.getItem('SiteDataID') == null) {
        this.route.navigate(['/User/Profile']);
      } else {
        this.getRequiredOutputData();
        this.getStyleData();
        this.GetSiteDataID();
        this.GetSpaceData();
      }
    }
  }

  getStyleData(){
    this.style.getStyleData().subscribe((data) => {
      this.strStyle = data;
    })
  }

  getRequiredOutputData(){
    this.requiredoutput.getRequiredOutputData().subscribe((data) => {
      this.strRequiredOutput = data;

      if(this.strRequiredOutput.length > 0){
        for (let j = 0; j <= this.strRequiredOutput.length - 1; j++){
          this.myForm.addControl('RO_' + (j + 1), this.mf.control({value : false, disabled : true}));
        }
      }

    })
  }

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  GetSiteDataID() {
    this.Loading = true;
    this.sitedata
      .GetFullSiteDataByID(sessionStorage.getItem('SiteDataID'))
      .subscribe((data) => {
        this.strSiteData = data;

        this.FixForm.get('cAddress')?.setValue(this.strSiteData[0].address);
        this.FixForm.get('cFloor')?.setValue(this.strSiteData[0].floor);
        this.FixForm.get('cArea')?.setValue(this.strSiteData[0].area);
        this.FixForm.get('cSiteType')?.setValue(this.strSiteData[0].siteTypeName);

        if(this.strSiteData[0].sitePhotos.length == 1){
          this.imageURL1 = 'http://192.236.146.161/SitePhoto/' + this.strSiteData[0].sitePhotos[0].photoPath; //  | sanitizerUrl
        }
        else if(this.strSiteData[0].sitePhotos.length == 2){
          this.imageURL1 = 'http://192.236.146.161/SitePhoto/' + this.strSiteData[0].sitePhotos[0].photoPath; //  | sanitizerUrl
          this.imageURL2 = 'http://192.236.146.161/SitePhoto/' + this.strSiteData[0].sitePhotos[1].photoPath; //  | sanitizerUrl
        }

      });
    this.Loading = false;
  }

  GetSpaceData() {
    this.spacedata
      .getSpaceDataBySiteDataID(sessionStorage.getItem('SiteDataID'))
      .subscribe((data) => {
        this.cmbstrSpaceData = data;
      });
  }

  ClearData(){
    this.myForm.get('cLength')?.setValue('0');
    this.myForm.get('cWidth')?.setValue('0');
    this.myForm.get('cHeight')?.setValue('0');

    for (let j = 0; j <= this.strRequiredOutput.length - 1; j++){
      this.myForm.get('RO_' + (j + 1))?.setValue(false);
    }

    this.myForm.get('cStyle')?.setValue(false);

    this.imageURL3 = "assets/images/NoImage.jpg";
    this.imageURL4 = "assets/images/NoImage.jpg";
  }

  // GoToProfile() {
  //   this.route.navigate(['/User/Profile']);
  //   sessionStorage.removeItem('SiteDataID');
  // }

  CloseIndexation() {
    this.dialogRef.close();
  }

  DisplaySpaceDetail() {
    if(this.FixForm.get('cSpaceData')?.value != 0){
      if(this.cmbstrSpaceData.length > 0){
        let Entity = this.cmbstrSpaceData.find(x => x.spaceDataID == this.FixForm.get('cSpaceData')?.value) || null;

        if(Entity != null){

          this.myForm.get('cLength')?.setValue(Entity.length);
          this.myForm.get('cWidth')?.setValue(Entity.width);
          this.myForm.get('cHeight')?.setValue(Entity.height);

          this.imageURL3 = "assets/images/NoImage.jpg";
          this.imageURL4 = "assets/images/NoImage.jpg";

          // Display Space Photo
          if(Entity.spacePhotos.length == 1){
            this.imageURL3 = 'http://192.236.146.161/SpacePhoto/' + Entity.spacePhotos[0].photoPath; //  | sanitizerUrl
          }
          else if(Entity.spacePhotos.length == 2){
            this.imageURL3 = 'http://192.236.146.161/SpacePhoto/' + Entity.spacePhotos[0].photoPath; //  | sanitizerUrl
            this.imageURL4 = 'http://192.236.146.161/SpacePhoto/' + Entity.spacePhotos[1].photoPath; //  | sanitizerUrl
          }

          // Display Required Output
          for (let j = 0; j <= this.strRequiredOutput.length - 1; j++){
            let EntityExist = Entity.spaceOutputs?.find(c => c.requiredOutputID == this.strRequiredOutput[j].requiredOutputID);
            if(EntityExist != null){
              this.myForm.get('RO_' + (j + 1))?.setValue(true);
            }
            else{
              this.myForm.get('RO_' + (j + 1))?.setValue(false);
            }
          }

          // Display Style
          this.myForm.get('cStyle')?.setValue(Entity.styleID);
        }
        else{
          this.ClearData();
        }
      }
    }
    else{
      this.ClearData();
    }

  }


}
