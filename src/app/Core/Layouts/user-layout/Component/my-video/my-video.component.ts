import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ClientVideo } from 'src/app/Shared/Model/ClientVideo.model';
import { ClientVideoService } from 'src/app/Shared/Services/client-video.service';

export interface IFilesPath{
  isUpdated : boolean;
  idx : number;
  File : File;
}

@Component({
  selector: 'app-my-video',
  templateUrl: './my-video.component.html',
  styleUrls: ['./my-video.component.scss']
})
export class MyVideoComponent implements OnInit {

  @Input() requiredFileType : string = "video/mp4";

  FileData : IFilesPath[] = [];
  FilesToUpload : File[]= [];
  strClientVideoData : ClientVideo[] = [];

  intFileSize : number = 10485760;

  imageURL : string = "";
  strImageURL : string[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;
  isFound : boolean = false;

  constructor(private _snackBar: MatSnackBar,
              private clientvideo : ClientVideoService) { }

  ngOnInit(): void {
    this.strImageURL[1] = '';
    this.strImageURL[2] = '';
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
        this.OpenErrorMessage('Video size is greater than 15 M.B');
        return;
      }
      if(file.type != 'video/mp4'){
        this.OpenErrorMessage('Video type must be in format (mp4) Only');
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
  
      document.getElementById('vid' + idx)?.setAttribute('src', URL.createObjectURL(event.target.files[0]));
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
    document.getElementById('vid' + idx)?.setAttribute('src', this.imageURL);
  }

  DisplayData(){
    this.clientvideo.GetClientVideoByClientID(sessionStorage.getItem('UserID'))
    .subscribe((data) => {
      this.strClientVideoData = data;

      if(this.strClientVideoData != null){
        for(let i = 0; i <= this.strClientVideoData.length - 1; i++){
          if(this.strClientVideoData[i].videoPath != null){
            // this.strImageURL[i + 1] = 'http://localhost/Client/ClientVideo/' + this.strClientVideoData[i].videoPath;
            this.strImageURL[i + 1] = 'http://192.236.146.161/Client/ClientVideo/' + this.strClientVideoData[i].videoPath;
            
            fetch('http://192.236.146.161/Client/ClientVideo/' + this.strClientVideoData[i].videoPath)
            .then((e) => {return e.blob()})
            .then((blob) => {
              let strblob : any = blob;
              let Idx = this.strClientVideoData[0].videoPath?.indexOf('.');
              let StrExtension = this.strClientVideoData[0].videoPath?.substring(Idx + 1, this.strClientVideoData[0].videoPath.length);
              var file = new File([strblob], this.strClientVideoData[0].videoPath, {lastModified : new Date().getTime(), type : 'video/' + StrExtension});

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
      this.OpenErrorMessage('you must select at least one Video');
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

    this.clientvideo.AddClientVideo(sessionStorage.getItem('UserID'), this.FilesToUpload)
    .subscribe((res) => {
      this.Loading = false;
      this.OpenErrorMessage('Data has been Saved Successfully');
      this.DisplayData();
    });

  }

}
