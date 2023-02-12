import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddSiteItemData } from 'src/app/Shared/Model/AddSiteItemData.model';
import { EngineerClassification } from 'src/app/Shared/Model/EngineerClassification.model';
import { siteEngineerClassifications } from 'src/app/Shared/Model/siteEngineerClassifications.model';
import { SiteItem } from 'src/app/Shared/Model/SiteItem.model';
import { SiteType } from 'src/app/Shared/Model/SiteType.model';
import { EngineerClassificationService } from 'src/app/Shared/Services/engineer-classification.service';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { SiteItemService } from 'src/app/Shared/Services/site-item.service';
import { SiteTypeService } from 'src/app/Shared/Services/site-type.service';

@Component({
  selector: 'app-dostep-one',
  templateUrl: './dostep-one.component.html',
  styleUrls: ['./dostep-one.component.scss']
})
export class DOStepOneComponent implements OnInit {
  SType: SiteType[] = [];
  SItem: SiteItem[] = [];
  EngClass : EngineerClassification[] = [];
  strSiteItemData: AddSiteItemData[] = [];
  strEngClassIDs : siteEngineerClassifications[] = [];
  FilesToUpload : File[]= [];

  EngClassCheckedIDs : string[] = [];

  file1 : File | null = null;
  imageURL1 : string = "assets/images/NoImage.jpg";

  file2 : File | null = null;
  imageURL2 : string = "assets/images/NoImage.jpg";

  intFileSize : number = 5242880;

  public myForm: FormGroup;
  public DynamicForm: FormGroup = this.df.group({});

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  Loading: boolean = false;

  @Input() requiredFileType : string = "image/jpeg, image/jpg, image/png";

  constructor(private fb: FormBuilder,
              private df: FormBuilder,
              private mf: FormBuilder,
              private sitetype: SiteTypeService,
              private engineerclassification : EngineerClassificationService,
              private siteitem: SiteItemService,
              private sitedata: SiteDataService,
              private route: Router,
              private _snackBar: MatSnackBar,
              private elementRef : ElementRef)
  {
    this.myForm = fb.group({
      cAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100),
        ],
      ],
      cArea: [
        '0',
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
      cFloor: [
        '0',
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      cSiteType: ['0', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadScript();
    
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      this.getSiteTypeData();
      this.getEngineerClassificationData();
    }
  }

  loadScript(){
    // Include CSS files
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');

    link.id = 'pattern';
    link.rel = 'stylesheet';      
    link.type = 'text/css';
    link.href = 'assets/css/media.css';
    link.media = 'all';

    head.appendChild(link);

  // Include javascript files
  var s = document.createElement("script");

  s.type = "text/javascript";
  s.src = "assets/js/respond.min.js";
  s.src = "assets/js/jquery-ui.js";
  s.src = "assets/js/plugins.js";
  s.src = "assets/js/index.js";
  s.src = "assets/js/html5shiv.min.js";

  this.elementRef.nativeElement.appendChild(s);
}

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  getSiteTypeData() {
    this.sitetype.getSiteTypeData().subscribe((data) => {
      this.SType = data;
    });
  }

  getEngineerClassificationData() {
    this.engineerclassification.getEngineerClassificationData().subscribe((data) => {
      this.EngClass = data;
      let V1 = 1;
      let V2 = 1;
      for (let i = 0; i <= this.EngClass.length - 1; i++)
      {
        this.myForm.addControl('EC_' + V2 + '_' + (i + 1), this.mf.control(false));
        if(V1 == 3){
          V1 = 1;
          V2 = V2 + 1;
        }
        else{
          V1 = V1 + 1;
        }
      }
    });
  }

  onSiteTypeChange(e: any) {
    if (e.target.value != '0') {
      this.getSiteItemData(e.target.value);
    } else {
      this.SItem = [];
    }
  }

  getSiteItemData(SiteTypeID: any) {
    this.siteitem.GetSiteTypeItemBySiteTypeID(SiteTypeID).subscribe((item) => {
      this.SItem = item;

      for (const control of this.SItem) {
        const validatorsToAdd = [];

        validatorsToAdd.push(Validators.required);
        validatorsToAdd.push(Validators.maxLength(2));

        this.DynamicForm.addControl(
          control.siteItemID,
          this.df.control('0', validatorsToAdd)
        );
      }
    });
  }

  onFileSelected(event : any, intType : number){
    const file = event.target.files[0];

    if(file.size > this.intFileSize){
      this.OpenErrorMessage('Image size is greater then 5 M.B');
      return;
    }
    if(file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
      this.OpenErrorMessage('Image type must be in format (JPEG - JPG - PNG) Only');
      return;
    }

    if (intType == 1){
      this.file1 = event.target.files[0];
      this.imageURL1 = URL.createObjectURL(event.target.files[0]);
    }
    else if (intType == 2){
      this.file2 = event.target.files[0];
      this.imageURL2 = URL.createObjectURL(event.target.files[0]);
    }
  }

  clearFile(intType : number)
  {
    if(intType == 1){
      this.file1 = null;
      this.imageURL1 = "assets/images/NoImage.jpg";
    }
    else if(intType == 2){
      this.file2 = null;
      this.imageURL2 = "assets/images/NoImage.jpg";
    }
  }

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  getSelectedIDs(strID : any, e : any){
    if(e.target.checked == true){
      this.EngClassCheckedIDs.push(strID);
    }
    else if(e.target.checked == false){
      if (this.EngClassCheckedIDs.includes(strID) == true){
        this.EngClassCheckedIDs.splice(this.EngClassCheckedIDs.indexOf(strID), 1);
      }
    }
  }

  getFirstStepData() {
    // Make Validation
    if (this.myForm.get('cAddress')?.value == '') {
      this.OpenErrorMessage('Address is Required');
      return;
    } else if (this.myForm.get('cAddress')?.value.length < 6) {
      this.OpenErrorMessage('Address must be at least 6 character');
      return;
    } else if (isNaN(this.myForm.get('cArea')?.value) == true) {
      this.OpenErrorMessage('Area must be only a number');
      return;
    } else if (this.myForm.get('cArea')?.value == '0') {
      this.OpenErrorMessage('Area is Required');
      return;
    } else if (this.myForm.get('cArea')?.value.length < 1) {
      this.OpenErrorMessage('Area must be at least 1 character');
      return;
    } else if (isNaN(this.myForm.get('cFloor')?.value) == true) {
      this.OpenErrorMessage('Floor must be only a number');
      return;
    } else if (this.myForm.get('cFloor')?.value == '0') {
      this.OpenErrorMessage('Floor is Required');
      return;
    } else if (this.myForm.get('cFloor')?.value.length < 1) {
      this.OpenErrorMessage('Floor must be at least 1 character');
      return;
    } else if (this.myForm.get('cSiteType')?.value == '0') {
      this.OpenErrorMessage('Site Type is Required');
      return;
    }


    // Check that all the input is a number
    for (const itmD in this.DynamicForm.controls) {
      if (this.DynamicForm.get(itmD)?.value == '') {
        this.OpenErrorMessage(
          'Must enter value in ' +
            this.SItem.find((m) => m.siteItemID == itmD)?.siteItemName
        );
        return;
      } else if (
        this.DynamicForm.get(itmD)?.value != '0' &&
        this.DynamicForm.get(itmD)?.value.length >= 1
      ) {
        if (isNaN(this.DynamicForm.get(itmD)?.value) == true) {
          this.OpenErrorMessage(
            'Value must be a Number in ' +
              this.SItem.find((m) => m.siteItemID == itmD)?.siteItemName
          );
          return;
        }
      }
    }

    // check if all the input = 0
    let intTotal: number = 0;

    for (const itmD in this.DynamicForm.controls) {
      intTotal += this.DynamicForm.get(itmD)?.value;
    }

    if (intTotal == 0) {
      this.OpenErrorMessage('Must enter at least one Space');
      return;
    }

    if (this.EngClassCheckedIDs.length == 0) {
      this.OpenErrorMessage('Must Choose at least one Engineer Classification');
      return;
    }


    // Collect the SiteItemData Data
    this.strSiteItemData.length = 0;
    for (const itmD in this.DynamicForm.controls) {
      if (this.DynamicForm.get(itmD)?.value != '0') {
        let strSiteItem = {
          siteItemID: itmD,
          itemCount: this.DynamicForm.get(itmD)?.value,
        };

        this.strSiteItemData.push(strSiteItem);
      }
    }

    // Collect the EngClass Data
    for(let i = 0; i <= this.EngClassCheckedIDs.length - 1 ; i++){
      let strEngC = {
        enginnerClassificationID : this.EngClassCheckedIDs[i]
      };

      this.strEngClassIDs.push(strEngC);
    }

    // Collect the SiteData Data
    let strSiteData = {
      Address: this.myForm.get('cAddress')?.value,
      Area: this.myForm.get('cArea')?.value,
      Floor: this.myForm.get('cFloor')?.value,
      ClientID: sessionStorage.getItem('UserID'),  //sessionStorage.getItem('UserID'),
      SiteTypeID: this.myForm.get('cSiteType')?.value,
      projectType : 2,
      siteItemDatas: this.strSiteItemData,
      siteEngineerClassifications : this.strEngClassIDs,
    };

    this.FilesToUpload.push(this.file1 as File);
    this.FilesToUpload.push(this.file2 as File);

    // Save Data and goto next step
    this.Loading = true;
    this.sitedata.AddSiteData(strSiteData).subscribe((res) => {
      sessionStorage.setItem('SiteDataID', res.toString());

      if(this.FilesToUpload.length > 0){
        this.sitedata.AddSiteDataWithPhoto(res.toString(), this.FilesToUpload).subscribe((result) => {
        });
      }

      // if(this.FilesToUpload[0] != null && this.FilesToUpload[1] != null){
      //   this.sitedata.AddSiteDataWithPhoto(res.toString(), this.FilesToUpload).subscribe((result) => {
      //   });
      // }

      this.Loading = false;
      this.route.navigate(['/DesignOffer/DOStepTwo']);
    });

  }

}
