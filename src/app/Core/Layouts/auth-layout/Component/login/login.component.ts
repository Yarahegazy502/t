import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Client } from 'src/app/Shared/Model/Client.model';
import { ClientService } from 'src/app/Shared/Services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public myForm: FormGroup;
  submitted: boolean = false;
  Credential: boolean = false;
  _Client: Client[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private SpinnerService: NgxSpinnerService,
    private client: ClientService,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = fb.group({
      cUserName: ['', Validators.required],
      cPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  SaveData() {
    if (this.myForm.get('cUserName')?.value.trim() == '') {
      this.OpenErrorMessage('Must enter UserName');
      return;
    } else if (this.myForm.get('cPassword')?.value.trim() == '') {
      this.OpenErrorMessage('Must enter Password');
      return;
    }

    this.Loading = true;
    this.client
      .getClientDataByCredential(
        this.myForm.get('cUserName')?.value,
        this.myForm.get('cPassword')?.value
      )
      .subscribe((res) => {
        if (res.length == 0) {
          this.Loading = false;
          this.OpenErrorMessage('Invalid UserName or Password');
          return;
        } else {
          this._Client = res;
          sessionStorage.setItem('UserID', this._Client[0].clientID || '');
          sessionStorage.setItem('UserName', this._Client[0].clientName || '');
          this.Loading = false;
          this.route.navigate(['/User/EditProfile']);
        }
      });
  }
}
