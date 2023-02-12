import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RequiredOutput } from 'src/app/Shared/Model/RequiredOutput.model';
import { SiteItemData } from 'src/app/Shared/Model/SiteItemData.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { spaceOutput } from 'src/app/Shared/Model/SpaceOutput.model';
import { Style } from 'src/app/Shared/Model/Style.model';
import { SanitizerUrlPipe } from 'src/app/Shared/Pipes/sanitizer-url.pipe';
import { RequiredOutputService } from 'src/app/Shared/Services/required-output.service';
import { SiteItemDataService } from 'src/app/Shared/Services/site-item-data.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';
import { StyleService } from 'src/app/Shared/Services/style.service';

export interface IROCheckedIDs{
  idx : number;
  RequiredOutputID : string;
}

export interface IFilesPath{
  idx : number;
  Tpe : number;
  File : File;
}

@Component({
  selector: 'app-dostep-two',
  templateUrl: './dostep-two.component.html',
  styleUrls: ['./dostep-two.component.scss']
})

export class DOStepTwoComponent implements OnInit {

  @Input() requiredFileType : string = "image/jpeg, image/jpg, image/png";
  strSpaceData : SpaceData[] = [];
  strRequiredOutput : spaceOutput[] = [];
  strStyle : Style[] = [];
  SID: SiteItemData[] = [];
  RealSID: SiteItemData[] = [];
  RealSIDWithData: SiteItemData[] = [];
  StrSpaceData : SpaceData[] = [];
  intCount: number = 0;
  RequiredOutputCheckedIDs : IROCheckedIDs[] = [];
  FileData : IFilesPath[] = [];
  SwapFileData : IFilesPath[] = [];
  FilesToUpload : File[]= [];
  intFileIndex : number[] = [];

  intFileSize : number = 5242880;

  public myForm: FormGroup = this.mf.group({});
  intImagesNumber : number = 2;

  imageURLList1 : string[] = [];
  imageURLList2 : string[] = [];

  imageURL : string = "assets/images/NoImage.jpg";


  StrImageURL1 : string[] = [];
  StrImageURL2 : string[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;
  isFound : boolean = false;


  constructor(private route: Router,              
              private siteitemdata: SiteItemDataService,
              private mf: FormBuilder,
              private _snackBar: MatSnackBar,
              private requiredoutput : RequiredOutputService,
              private style : StyleService,
              private spacedata : SpaceDataService,
              private elementRef : ElementRef) {

               }

  ngOnInit(): void {
    this.loadScript();

    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      if (sessionStorage.getItem('SiteDataID') == null) {
        this.route.navigate(['/User/DOProfile']);
      } else {        
        this.getRequiredOutputData();
        this.getStyleData();
        this.getSiteItemData(sessionStorage.getItem('SiteDataID'));
      }
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

  getStyleData(){
    this.style.getStyleData().subscribe((sdata) => {
      this.strStyle = sdata;
    })
  }

  getRequiredOutputData(){
    this.requiredoutput.getRequiredOutputData().subscribe((data) => {
      this.strRequiredOutput = data;
    })
  }

  getSelectedIDs(strID : any, e : any, intfIndex : any, intsIndex : any){
    if(e.target.checked == true){
      var obj = {} as IROCheckedIDs;
      obj.idx = intfIndex;
      obj.RequiredOutputID = strID;
      this.RequiredOutputCheckedIDs.push(obj);
    }
    else if(e.target.checked == false){
      if(this.RequiredOutputCheckedIDs.length > 0){
        for(let i = 0; i <= this.RequiredOutputCheckedIDs.length - 1; i++){
          if(this.RequiredOutputCheckedIDs[i].idx == intfIndex && this.RequiredOutputCheckedIDs[i].RequiredOutputID == strID){
            this.RequiredOutputCheckedIDs.splice(i, 1);
          }
        }
      }
    }
  }

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  getSiteItemData(SiteDataID: any) {
    this.siteitemdata
    .getAllSiteItemDataBySiteDataID(SiteDataID)
    .subscribe((data) => {
      this.SID = data;

      this.SID.forEach((elem) => {
        for (let i = 0; i <= elem.itemCount - 1; i++) {
          this.RealSID.push(elem);
        }
      });

      this.SID.forEach((elem) => {
        for (let i = 0; i <= elem.spaceDatas.length - 1; i++) {
          this.StrSpaceData.push(elem.spaceDatas[i]);
        }
      });

      this.intCount = 0;

      for (const control of this.RealSID) {
        this.intCount += 1;
        const validatorsToAdd = [];

        // Text Hidden
        this.myForm.addControl('HD' + '_' + this.intCount, this.mf.control(''));

        // Text Name
        validatorsToAdd.push(Validators.required);
        this.myForm.addControl('N' + '_' + this.intCount, this.mf.control('', validatorsToAdd));

        // Height Name
        validatorsToAdd.push(Validators.required);
        this.myForm.addControl('H' + '_' + this.intCount, this.mf.control('0', validatorsToAdd));

        // Width Name
        validatorsToAdd.push(Validators.required);
        this.myForm.addControl('W' + '_' + this.intCount, this.mf.control('0', validatorsToAdd));

        // Length Name
        validatorsToAdd.push(Validators.required);
        this.myForm.addControl('L' + '_' + this.intCount, this.mf.control('0', validatorsToAdd)
        );

        if(this.strRequiredOutput.length > 0){
          for (let j = 0; j <= this.strRequiredOutput.length - 1; j++){
            this.myForm.addControl('RO_' + this.intCount + '_' + (j + 1), this.mf.control(false));
          }
        }

        if(this.strStyle.length > 0){
          this.myForm.addControl('cStyle' + this.intCount, this.mf.control(0));
        }

        this.StrImageURL1[this.intCount] = '';
        this.StrImageURL2[this.intCount] = '';

      }

      // Display Data
      this.DisplayData(SiteDataID);
    });
  }

  DisplayData(SiteDataID: any){
    let filetype : number;
    
    if(this.StrSpaceData.length > 0){
      for(let i = 0; i <= this.StrSpaceData.length - 1; i++){

        this.myForm.get('HD' + '_' + (i + 1))?.setValue(this.StrSpaceData[i].spaceDataID);
        this.myForm.get('N' + '_' + (i + 1))?.setValue(this.StrSpaceData[i].name);
        this.myForm.get('L' + '_' + (i + 1))?.setValue(this.StrSpaceData[i].length);
        this.myForm.get('W' + '_' + (i + 1))?.setValue(this.StrSpaceData[i].width);
        this.myForm.get('H' + '_' + (i + 1))?.setValue(this.StrSpaceData[i].height);
        this.myForm.get('cStyle' + (i + 1))?.setValue(this.StrSpaceData[i].styleID);

        if(this.StrSpaceData[i].spaceOutputs.length > 0 && this.strRequiredOutput.length > 0){
          for(let j = 0; j <= this.StrSpaceData[i].spaceOutputs.length - 1; j++){
            for(let k = 0; k <= this.strRequiredOutput.length - 1; k++){                         
              if(this.StrSpaceData[i].spaceOutputs[j].requiredOutputID == this.strRequiredOutput[k].requiredOutputID){
                this.myForm.get('RO_' + (i + 1) + '_' + (k + 1))?.setValue(true);

                var IROobj = {} as IROCheckedIDs;
                IROobj.idx = i + 1;
                IROobj.RequiredOutputID = this.StrSpaceData[i].spaceOutputs[j].requiredOutputID;
                this.RequiredOutputCheckedIDs.push(IROobj);
              }
            }
          }
        }

        filetype = 0;
        if(this.StrSpaceData[i].spacePhotos.length > 0){
          for(let j = 0; j <= this.StrSpaceData[i].spacePhotos.length - 1; j++){
            if(j == 0){
              // filetype = 1;
              this.StrImageURL1[i + 1] = 'http://192.236.146.161/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath;     
              // this.StrImageURL1[i + 1] = 'http://dtopia-eg.com/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath;     
              
              fetch('http://192.236.146.161/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath)
              .then((e) => {return e.blob()})
              .then((blob) => {
                let strblob : any = blob;
                let Idx = this.StrSpaceData[i].spacePhotos[j].photoPath.indexOf('.');
                let StrExtension = this.StrSpaceData[i].spacePhotos[j].photoPath.substring(Idx + 1, this.StrSpaceData[i].spacePhotos[j].photoPath.length);
                var file = new File([strblob], this.StrSpaceData[i].spacePhotos[j].photoPath, {lastModified : new Date().getTime(), type : 'image/' + StrExtension});
                
                var obj = {} as IFilesPath;
                obj.idx = (i + 1);
                obj.Tpe = 1;
                obj.File = file;
                this.FileData.push(obj);
              })

            }
            else if(j > 0){
              // filetype = 2;
              this.StrImageURL2[i + 1] = 'http://192.236.146.161/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath;

              fetch('http://192.236.146.161/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath)
              .then((e) => {return e.blob()})
              .then((blob) => {
                let strblob : any = blob;
                let Idx = this.StrSpaceData[i].spacePhotos[j].photoPath.indexOf('.');
                let StrExtension = this.StrSpaceData[i].spacePhotos[j].photoPath.substring(Idx + 1, this.StrSpaceData[i].spacePhotos[j].photoPath.length);
                var file = new File([strblob], this.StrSpaceData[i].spacePhotos[j].photoPath, {lastModified : new Date().getTime(), type : 'image/' + StrExtension});
                
                var obj = {} as IFilesPath;
                obj.idx = (i + 1);
                obj.Tpe = 2;
                obj.File = file;
                this.FileData.push(obj);
              })
            }
            // var blob = new Blob(['http://localhost/SpacePhoto/' + this.StrSpaceData[i].spacePhotos[j].photoPath]);
            // let Idx = this.StrSpaceData[i].spacePhotos[j].photoPath.indexOf('.');
            // let StrExtension = this.StrSpaceData[i].spacePhotos[j].photoPath.substring(Idx + 1, this.StrSpaceData[i].spacePhotos[j].photoPath.length);
            // var file = new File([blob], this.StrSpaceData[i].spacePhotos[j].photoPath, {lastModified : new Date().getTime(), type : 'image/' + StrExtension});

            // var obj = {} as IFilesPath;
            // obj.idx = i + 1;
            // obj.Tpe = filetype;
            // obj.File = file;
            // this.FileData.push(obj);
          }
        }
      }
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


  onFileSelected(event : any, idx : number, intType : number){
    const file = event.target.files[0];
    if(file != undefined){
      if(file.size > this.intFileSize){
        this.OpenErrorMessage('Image size is greater then 5 M.B');
        return;
      }
      if(file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
        this.OpenErrorMessage('Image type must be in format (JPEG - JPG - PNG) Only');
        return;
      }

      this.intFileIndex = [];
      if(this.FileData.length > 0){
        for(let i = 0; i <= this.FileData.length - 1; i++){
          if((this.FileData[i].idx == idx && this.FileData[i].Tpe == intType)){
            this.intFileIndex.push(i);
          }
        }

        this.intFileIndex.sort();

        for(let j = this.intFileIndex.length - 1; j >= 0; j--){
          this.FileData.splice(this.intFileIndex[j], 1);
        }
      }

      var obj = {} as IFilesPath;
      obj.idx = idx;
      obj.Tpe = intType;
      obj.File = file;
      this.FileData.push(obj);

      document.getElementById('img_' + idx + '_' + intType)?.setAttribute('src', URL.createObjectURL(event.target.files[0]));
    }
  }

  clearFile(intType : number, idx : number){
    if(this.FileData.length > 0){
      for(let i = 0; i <= this.FileData.length -1 ; i++){
        var c = document.getElementById('img_' + idx + '_' + intType)?.setAttribute('src', 'assets/images/NoImage.jpg');
        if(this.FileData[i].idx == idx && this.FileData[i].Tpe == intType){
          this.FileData.splice(i, 1);
        }
      }
    }
    document.getElementById('img_' + idx + '_' + intType)?.setAttribute('src', 'assets/images/NoImage.jpg');
  }

  getSecondStepData(){
    if(this.RealSID.length > 0){
      for(let i = 0; i <= this.RealSID.length - 1; i++){

      // Validation
      if(this.myForm.get('N_' + (i + 1))?.value.trim() != ''){  // && (this.myForm.get('H_' + (i + 1))?.value.trim() != '' || this.myForm.get('H_' + (i + 1))?.value.trim() != '0') && (this.myForm.get('W_' + (i + 1))?.value.trim() != '' || this.myForm.get('W_' + (i + 1))?.value.trim() != '0') && (this.myForm.get('L_' + (i + 1))?.value.trim() != '' || this.myForm.get('L_' + (i + 1))?.value.trim() != '0') && this.myForm.get('cStyle' + (i + 1))?.value != '0'
        
        if (this.myForm.get('N_' + (i + 1))?.value.trim() == '') {
          this.OpenErrorMessage(
            'Name for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        }
        else if (
          this.myForm.get('L_' + (i + 1))?.value == '0' ||
          this.myForm.get('L_' + (i + 1))?.value == ''
        ) {
          this.OpenErrorMessage(
            'Length for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        } else if (this.myForm.get('L_' + (i + 1))?.value.length < 1) {
          this.OpenErrorMessage(
            'Length must at least 1 character for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        } else if (isNaN(this.myForm.get('L_' + (i + 1))?.value) == true) {
          this.OpenErrorMessage(
            'Length must be a Number only for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        }
        else if (
          this.myForm.get('W_' + (i + 1))?.value == '0' ||
          this.myForm.get('W_' + (i + 1))?.value == ''
        ) {
          this.OpenErrorMessage(
            'Width for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        } else if (this.myForm.get('W_' + (i + 1))?.value.length < 1) {
          this.OpenErrorMessage(
            'Width must at least 1 character for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        } else if (isNaN(this.myForm.get('W_' + (i + 1))?.value) == true) {
          this.OpenErrorMessage(
            'Width must be a Number only for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        }
        else if (
          this.myForm.get('H_' + (i + 1))?.value == '0' ||
          this.myForm.get('H_' + (i + 1))?.value == ''
        ) {
          this.OpenErrorMessage(
            'Height for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        } else if (this.myForm.get('H_' + (i + 1))?.value.length < 1) {
          this.OpenErrorMessage(
            'Height must at least 1 character for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        } else if (isNaN(this.myForm.get('H_' + (i + 1))?.value) == true) {
          this.OpenErrorMessage(
            'Height must be a Number only for space ' +
              this.RealSID[i].siteItemName
          );
          return;
        }
        else if (this.myForm.get('cStyle' + (i + 1))?.value == '') {
          this.OpenErrorMessage(
            'Style for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        }

        this.isFound = false;
        if(this.RequiredOutputCheckedIDs.length > 0){
          for(let x = 0; x <= this.RequiredOutputCheckedIDs.length - 1; x++){
            if(this.RequiredOutputCheckedIDs[x].idx == (i + 1)){
              this.isFound = true;
            }
          }
        }

        if (this.isFound == false) {
          this.OpenErrorMessage(
            'Required Output for space ' + this.RealSID[i].siteItemName + ' is Required'
          );
          return;
        }

      }
    }

    this.Loading = true;

    for(let i = 0; i <= this.RealSID.length - 1; i++){
      if(this.myForm.get('N_' + (i + 1))?.value.trim() != ''){

        // Get Space Output Data
       this.strRequiredOutput = [];
       if(this.RequiredOutputCheckedIDs.length > 0){
         for(let j = 0; j <= this.RequiredOutputCheckedIDs.length - 1; j++){
           if(this.RequiredOutputCheckedIDs[j].idx == (i + 1)){
             let strRO = {
               requiredOutputID : this.RequiredOutputCheckedIDs[j].RequiredOutputID
             }
             this.strRequiredOutput.push(strRO);
           }
         }
       }

       if(this.myForm.get('HD_' + (i + 1))?.value == ''){
          // Get Space Data
          let newSpaceData = {
            name: this.myForm.get('N_' + (i + 1))?.value,
            height: this.myForm.get('H_' + (i + 1))?.value,
            width: this.myForm.get('W_' + (i + 1))?.value,
            length: this.myForm.get('L_' + (i + 1))?.value,
            styleID : this.myForm.get('cStyle' + (i + 1))?.value,
            siteItemDataID: this.RealSID[i].siteItemDataID,
            spaceWindowDoorDatas : [],
            spaceOutputs: this.strRequiredOutput
          };

          // Save Data and goto next step
          this.spacedata.AddSpaceData(newSpaceData).subscribe((data) => {

            this.FilesToUpload.length = 0;
            if(this.FileData.length > 0){
              for(let k = 0; k <= this.FileData.length - 1; k++){
                if(this.FileData[k].idx == (i + 1)){
                this.FilesToUpload.push(this.FileData[k].File);
                }
              }
            }

            if(this.FilesToUpload.length > 0){
              this.spacedata.AddSpaceDataWithPhoto(data.toString(), this.FilesToUpload).subscribe((res) => {

              });
            }
          });
       }
       else if(this.myForm.get('HD_' + (i + 1))?.value != ''){
          // Get Space Data
          let newSpaceData = {
            spaceDataID : this.myForm.get('HD_' + (i + 1))?.value,
            name: this.myForm.get('N_' + (i + 1))?.value,
            height: this.myForm.get('H_' + (i + 1))?.value,
            width: this.myForm.get('W_' + (i + 1))?.value,
            length: this.myForm.get('L_' + (i + 1))?.value,
            styleID : this.myForm.get('cStyle' + (i + 1))?.value,
            siteItemDataID: this.RealSID[i].siteItemDataID,
            spaceWindowDoorDatas : [],
            spaceOutputs: this.strRequiredOutput
          };

          // Save Data and goto next step
          this.spacedata.AddSpaceData(newSpaceData).subscribe((data) => {

            this.FilesToUpload.length = 0;
            if(this.FileData.length > 0){
              for(let k = 0; k <= this.FileData.length - 1; k++){
                if(this.FileData[k].idx == (i + 1)){
                this.FilesToUpload.push(this.FileData[k].File);
                }
              }
            }

            if(this.FilesToUpload.length > 0){
              this.spacedata.AddSpaceDataWithPhoto(data.toString(), this.FilesToUpload).subscribe((res) => {

              });
            }
          });
       }

    }
  }

    this.Loading = false;
    this.route.navigate(['/DesignOffer/DOStepThree']);
  }
    
  }

}


