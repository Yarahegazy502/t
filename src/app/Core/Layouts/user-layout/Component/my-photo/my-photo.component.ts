import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ClientImage } from 'src/app/Shared/Model/ClientImage.model';
import { ClientImageService } from 'src/app/Shared/Services/client-image.service';


export interface IFilesPath{
  isUpdated : boolean;
  idx : number;
  File : File;
}

@Component({
  selector: 'app-my-photo',
  templateUrl: './my-photo.component.html',
  styleUrls: ['./my-photo.component.scss']
})
export class MyPhotoComponent implements OnInit {

  @Input() requiredFileType : string = "image/jpeg, image/jpg, image/png";

  FileData : IFilesPath[] = [];
  FilesToUpload : File[]= [];
  strClientImageData : ClientImage[] = [];

  intFileSize : number = 5242880;

  imageURL : string = "assets/images/NoImage.jpg";
  strImageURL : string[] = [];

  public myForm: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;
  isFound : boolean = false;

  constructor(private cf: FormBuilder,
              private clientimage : ClientImageService,
              private _snackBar: MatSnackBar)
        {
          this.myForm = cf.group({

          })
        }

  ngOnInit(): void {
    this.strImageURL[1] = '';
    this.strImageURL[2] = '';
    this.strImageURL[3] = '';
    this.strImageURL[4] = '';
    this.DisplayData();
  }

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  onFileSelected(event : any, idx : number){
    const file = event.target.files[0];
    if(file != undefined){
      if(file.size > this.intFileSize){
        this.OpenErrorMessage('Image size is greater than 5 M.B');
        return;
      }
      if(file.type != 'image/jpeg' && file.type != 'image/jpg' && file.type != 'image/png'){
        this.OpenErrorMessage('Image type must be in format (JPEG - JPG - PNG) Only');
        return;
      }

      if(this.FileData.length > 0){
        for(let i = 0; i <= this.FileData.length - 1; i++){
          if(this.FileData[i].idx == idx){
            this.FileData.splice(i, 1);
          }
        }
      }

      var obj = {} as IFilesPath;
      obj.idx = idx;
      obj.isUpdated = true;
      obj.File = file;
      this.FileData.push(obj);
  
      document.getElementById('img' + idx)?.setAttribute('src', URL.createObjectURL(event.target.files[0]));
    }
  }

  clearFile(idx : number){
    if(this.FileData.length > 0){
      for(let i = 0; i <= this.FileData.length -1 ; i++){
        if(this.FileData[i].idx == idx){
          this.FileData.splice(i, 1);
        }
      }
    }
    document.getElementById('img' + idx)?.setAttribute('src', this.imageURL);
  }

  DisplayData(){
    this.clientimage.GetClientImageByClientID(sessionStorage.getItem('UserID'))
    .subscribe((data) => {
      this.strClientImageData = data;

      if(this.strClientImageData != null){
        for(let i = 0; i <= this.strClientImageData.length - 1; i++){
          if(this.strClientImageData[i].imagePath != null){
            // this.strImageURL[i + 1] = 'http://localhost/Client/ClientImage/' + this.strClientImageData[i].imagePath;

            this.strImageURL[i + 1] = 'http://192.236.146.161/Client/ClientImage/' + this.strClientImageData[i].imagePath;

            fetch('http://192.236.146.161/Client/ClientImage/' + this.strClientImageData[i].imagePath)
            .then((e) => {return e.blob()})
            .then((blob) => {
              let strblob : any = blob;
              let Idx = this.strClientImageData[0].imagePath?.indexOf('.');
              let StrExtension = this.strClientImageData[0].imagePath?.substring(Idx + 1, this.strClientImageData[0].imagePath.length);
              var file = new File([strblob], this.strClientImageData[0].imagePath, {lastModified : new Date().getTime(), type : 'image/' + StrExtension});

              var obj = {} as IFilesPath;
              obj.isUpdated = false;
              obj.idx = i + 1;
              obj.File = file;
              this.FileData.push(obj);
            })
          }
        }
      }
    })
  }

  SaveData(){
    if(this.FileData.length == 0){
      this.OpenErrorMessage('you must select at least one Photo');
      return;
    }

    this.FilesToUpload.length = 0;
    if(this.FileData.length > 0){
      for(let k = 0; k <= this.FileData.length - 1; k++){
        this.FilesToUpload.push(this.FileData[k].File);
        // if(this.FileData[k].isUpdated == true){
        // this.FilesToUpload.push(this.FileData[k].File);
        // }
      }
    }

    this.Loading = true;

    this.clientimage.AddClientImage(sessionStorage.getItem('UserID'), this.FilesToUpload)
    .subscribe((res) => {
      this.Loading = false;
      this.OpenErrorMessage('Data has been Saved Successfully');
      this.DisplayData();
    });

    // if(this.FilesToUpload.length > 0){
    //   this.Loading = true;

    //   this.clientimage.AddClientImage(sessionStorage.getItem('UserID'), this.FilesToUpload)
    //   .subscribe((res) => {
    //     this.Loading = false;
    //     this.OpenErrorMessage('Data has been Saved Successfully');
    //     this.DisplayData();
    //   });
    // }
    // else{
    //   this.OpenErrorMessage('There is no any Update to Save');
    // }







  }

}
