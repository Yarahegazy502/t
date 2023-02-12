import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountCategory } from 'src/app/Shared/Model/AccountCategory.model';
import { AccountType } from 'src/app/Shared/Model/AccountType.model';
import { Client } from 'src/app/Shared/Model/Client.model';
import { ClientAccountCategory } from 'src/app/Shared/Model/ClientAccountCategoryID.model';
import { Country } from 'src/app/Shared/Model/Country.model';
import { District } from 'src/app/Shared/Model/District.model';
import { Gender } from 'src/app/Shared/Model/Gender.model';
import { Governorate } from 'src/app/Shared/Model/Governorate.model';
import { KnowUs } from 'src/app/Shared/Model/KnowUs.model';
import { YearsOfExperience } from 'src/app/Shared/Model/YearsOfExperience.model';
import { AccountCategoryService } from 'src/app/Shared/Services/account-category.service';
import { AccountTypeService } from 'src/app/Shared/Services/account-type.service';
import { ClientService } from 'src/app/Shared/Services/client.service';
import { CountryService } from 'src/app/Shared/Services/country.service';
import { DistrictService } from 'src/app/Shared/Services/district.service';
import { GenderService } from 'src/app/Shared/Services/gender.service';
import { GovernorateService } from 'src/app/Shared/Services/governorate.service';
import { KnowUsService } from 'src/app/Shared/Services/know-us.service';
import { YearsOfExperienceService } from 'src/app/Shared/Services/years-of-experience.service';


export interface IFilesPath{
  isUpdated : boolean;
  File : File;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() requiredFileType : string = "image/jpeg, image/jpg, image/png";

  public myForm: FormGroup;
  strGender : Gender[] = [];
  strExperience : YearsOfExperience[] = [];
  strKnowUs : KnowUs[] = [];
  strCountry : Country[] = [];
  strGovernorate : Governorate[] = [];
  strDistrict : District[] = [];
  strAccType : AccountType[] = [];
  strAccCategory : AccountCategory[] = [];
  strClientData : Client[] = [];
  strclientAccountCategories : ClientAccountCategory[] = [];

  FileData : IFilesPath[] = [];
  FilesToUpload : File[]= [];
  intFileSize : number = 5242880;

  imageURL : string = "assets/images/Person.png";
  strArray : string[] = [];

  strWebSite : string = '';
  strfb : string = '';
  strPhoto : string = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;

  constructor(private route: Router,
              private cf: FormBuilder,
              private gender : GenderService,
              private experience : YearsOfExperienceService,
              private knowus : KnowUsService,
              private country : CountryService,
              private governorate : GovernorateService,
              private district : DistrictService,
              private acctype : AccountTypeService,
              private acccategory : AccountCategoryService,
              private clientdata : ClientService,
              private _snackBar: MatSnackBar)
   {
    this.myForm = cf.group({
      cName : ['', Validators.required],
      cGender : ['0', Validators.required],
      cJob : [''],
      cExperience : ['0'],
      cPhone : ['', Validators.required],
      cEmail : ['', [Validators.required, Validators.email]],
      cWebSite : [''],
      cFacebook : [''],
      cKnowUs : ['0', Validators.required],
      cBiography : ['', Validators.required],
      cCountry : ['0', Validators.required],
      cGovernorate : ['0', Validators.required],
      cDistrict : ['0', Validators.required],
      cAddress : [''],
      cAccType : ['0', Validators.required],
      cAccCategory : ['0', Validators.required]
    })
   }

  ngOnInit(): void {
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      this.getGender();
      this.getExperience();
      this.getKnowUs();
      this.getCountry();
      this.getAccType();
      this.DisplayData();
    }    
  }

 getGender(){
  this.gender.GetAllGender().subscribe( (data) => {
    this.strGender = data;
  })
 }

 getExperience(){
  this.experience.GetAllYearsOfExperience().subscribe((data) => {
    this.strExperience = data;   
  })
 }

 getKnowUs(){
  this.knowus.GetAllKnowUs().subscribe((data) => {
    this.strKnowUs = data;
  })
 }

 getCountry(){
    this.country.GetAllCountry().subscribe((data) => {
      this.strCountry = data;
    })
 }

 getGovernorate(){
  if(this.myForm.get('cCountry')?.value != '' && this.myForm.get('cCountry')?.value != '0' && this.myForm.get('cCountry')?.value != null){
    this.governorate.GetGovernorateByCountryID(this.myForm.get('cCountry')?.value).subscribe((data) => {
      this.strGovernorate = data;
    })
  }
  else{
    this.myForm.get('cCountry')?.setValue('0');
    this.strGovernorate = [];
    this.myForm.get('cGovernorate')?.setValue('0');
    this.strDistrict = [];
    this.myForm.get('cDistrict')?.setValue('0');
  }
}

getDistrict(){
  if(this.myForm.get('cGovernorate')?.value != '' && this.myForm.get('cGovernorate')?.value != '0' && this.myForm.get('cGovernorate')?.value != null){
    this.district.GetDistrictByGovernorateID(this.myForm.get('cGovernorate')?.value).subscribe((data) => {
      this.strDistrict = data;
    })
  }
  else{
    this.myForm.get('cGovernorate')?.setValue('0');
    this.strDistrict = [];
    this.myForm.get('cDistrict')?.setValue('0');
  }
}

getAccType(){
  this.acctype.GetAllAccountType().subscribe((data) => {
    this.strAccType = data;
  })
}

getAccCategory(){
  if(this.myForm.get('cAccType')?.value != '' && this.myForm.get('cAccType')?.value != '0'){
    this.acccategory.GetAccountCategoryByAccountTypeID(this.myForm.get('cAccType')?.value).subscribe((data) => {
      this.strAccCategory = data;
    })
  }
  else{
    this.myForm.get('cAccCategory')?.setValue('0');
    this.strAccCategory = [];
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


onFileSelected(event : any){
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

    this.FileData.length = 0;

    var obj = {} as IFilesPath;
    obj.isUpdated = true;
    obj.File = file;
    this.FileData.push(obj);

    document.getElementById('imgPhoto')?.setAttribute('src', URL.createObjectURL(event.target.files[0]));
  }
}

clearFile(){
  if(this.FileData.length > 0){
    this.FileData.length = 0;
  }
  document.getElementById('imgPhoto')?.setAttribute('src', this.imageURL);
}

DisplayData(){
  this.clientdata.getClientByID(sessionStorage.getItem('UserID')).subscribe((data) => {
    this.strClientData = data;

    if(this.strClientData != null){
      this.myForm.get('cName')?.setValue(this.strClientData[0].clientName);
      this.myForm.get('cJob')?.setValue(this.strClientData[0].jobName);
      this.myForm.get('cGender')?.setValue(this.strClientData[0].genderID);
      this.myForm.get('cExperience')?.setValue(this.strClientData[0].yearsOfExperienceID);
      this.myForm.get('cPhone')?.setValue(this.strClientData[0].phone);
      this.myForm.get('cEmail')?.setValue(this.strClientData[0].email);
      this.myForm.get('cWebSite')?.setValue(this.strClientData[0].webSite);
      this.myForm.get('cFacebook')?.setValue(this.strClientData[0].faceBook);
      this.myForm.get('cKnowUs')?.setValue(this.strClientData[0].knowUsID);
      this.myForm.get('cBiography')?.setValue(this.strClientData[0].aboutMe);
      this.myForm.get('cCountry')?.setValue(this.strClientData[0].countryID);
      this.getGovernorate()
      this.myForm.get('cGovernorate')?.setValue(this.strClientData[0].governorateID);
      this.getDistrict();
      this.myForm.get('cDistrict')?.setValue(this.strClientData[0].districtID);
      this.myForm.get('cAddress')?.setValue(this.strClientData[0].address);
      this.myForm.get('cAccType')?.setValue(this.strClientData[0].accountTypeID);
      this.getAccCategory()

      // Display Account Category
      if(this.strClientData[0].clientAccountCategories.length > 0){
        for(let i = 0; i <= this.strClientData[0].clientAccountCategories.length - 1; i++){
          this.strArray.push(this.strClientData[0].clientAccountCategories[0].accountCategoryID);
        }
        this.myForm.get('cAccCategory')?.setValue(this.strArray);
      }

      // Display Photo
      if(this.strClientData[0].photo != null){
        this.imageURL = 'http://192.236.146.161/Client/ClientPhoto/' + this.strClientData[0].photo;
        var blob = new Blob(['http://192.236.146.161/Client/ClientPhoto/' + this.strClientData[0].photo]);
        let Idx = this.strClientData[0].photo?.indexOf('.');
        let StrExtension = this.strClientData[0].photo?.substring(Idx + 1, this.strClientData[0].photo.length);
        var file = new File([blob], this.strClientData[0].photo, {lastModified : new Date().getTime(), type : 'image/' + StrExtension});
  
        var obj = {} as IFilesPath;
        obj.isUpdated = false;
        obj.File = file;
        this.FileData.push(obj);
      }
    }
  })
}

SaveData(){
  
  // Validation
  if(this.myForm.get('cName')?.value.trim() == ''){
    this.OpenErrorMessage('Must Enter Name');
      return;
  }
  else if(this.myForm.get('cGender')?.value == '0' || this.myForm.get('cGender')?.value == '' || this.myForm.get('cGender')?.value == null){
    this.OpenErrorMessage('Must Select Gender');
      return;
  }
  else if(this.myForm.get('cJob')?.value.trim() == ''){
    this.OpenErrorMessage('Must Enter Job Name');
      return;
  }
  else if(this.myForm.get('cExperience')?.value == '0' || this.myForm.get('cExperience')?.value == '' || this.myForm.get('cExperience')?.value == null){
    this.OpenErrorMessage('Must Select Experience');
      return;
  }
  else if(this.myForm.get('cPhone')?.value.trim() == '' || this.myForm.get('cPhone')?.value.trim() == '0'){
    this.OpenErrorMessage('Must Enter Phone');
      return;
  }
  else if (isNaN(this.myForm.get('cPhone')?.value) == true) {
    this.OpenErrorMessage('Phone Number must be only a number');
    return;
  }
  else if (this.myForm.get('cPhone')?.value.length < 11) {
    this.OpenErrorMessage('Phone Number can not be less than 11 character');
    return;
  }
  else if(this.myForm.get('cEmail')?.value.trim() == ''){
    this.OpenErrorMessage('Must Enter Email');
      return;
  }
  else if(this.myForm.get('cKnowUs')?.value == '0' || this.myForm.get('cKnowUs')?.value == '' || this.myForm.get('cKnowUs')?.value == null){
    this.OpenErrorMessage('Must Select How Did You Know Us');
      return;
  }
  else if(this.myForm.get('cBiography')?.value.trim() == ''){
    this.OpenErrorMessage('Must Enter cBiography');
      return;
  }
  else if (this.myForm.get('cBiography')?.value.length < 20) {
    this.OpenErrorMessage('cBiography can not be less than 20 character');
    return;
  }
  else if(this.myForm.get('cCountry')?.value == '0' || this.myForm.get('cCountry')?.value == '' || this.myForm.get('cCountry')?.value == null){
    this.OpenErrorMessage('Must Select Country');
      return;
  }
  else if(this.myForm.get('cGovernorate')?.value == '0' || this.myForm.get('cGovernorate')?.value == '' || this.myForm.get('cGovernorate')?.value == null){
    this.OpenErrorMessage('Must Select Governorate');
      return;
  }
  else if(this.myForm.get('cDistrict')?.value == '0' || this.myForm.get('cDistrict')?.value == '' || this.myForm.get('cDistrict')?.value == null){
    this.OpenErrorMessage('Must Select District');
      return;
  }
  else if(this.myForm.get('cAddress')?.value.trim() == ''){
    this.OpenErrorMessage('Must Enter Address');
      return;
  }
  else if (this.myForm.get('cAddress')?.value.length < 11) {
    this.OpenErrorMessage('Address can not be less than 10 character');
    return;
  }
  else if(this.myForm.get('cAccType')?.value == '0' || this.myForm.get('cAccType')?.value == '' || this.myForm.get('cAccType')?.value == null){
    this.OpenErrorMessage('Must Select Account Type');
      return;
  }
  else if(this.myForm.get('cAccCategory')?.value == '0' || this.myForm.get('cAccCategory')?.value == '' || this.myForm.get('cAccCategory')?.value == null){
    this.OpenErrorMessage('Must Select Account Category');
      return;
  }

  // Prepare Data to Save
    let cAccCat = this.myForm.get('cAccCategory')?.value;
    if(cAccCat.length > 0){
      for(let i = 0; i <= cAccCat.length - 1; i++){
        if(cAccCat[i] != 0){
          let newClientAccCat = {
            accountCategoryID : cAccCat[i]
          }
          this.strclientAccountCategories.push(newClientAccCat);
        }
      }
    }


    if(this.myForm.get('cWebSite')?.value == null){
      this.strWebSite = '';
    }
    else if(this.myForm.get('cWebSite')?.value == null){
      this.strWebSite = this.myForm.get('cWebSite')?.value;
    }

    if(this.myForm.get('cFacebook')?.value == null){
      this.strfb = '';
    }
    else if(this.myForm.get('cFacebook')?.value == null){
      this.strfb = this.myForm.get('cFacebook')?.value;
    }

 
    if(this.FileData.length > 0){
      if(this.FileData[0].isUpdated == true){
        this.FilesToUpload.push(this.FileData[0].File);
      }
    }

    this.Loading = true;

    if(this.FilesToUpload.length > 0){

      let ExistingClientData = {
        clientID : sessionStorage.getItem('UserID'),
        clientName : this.myForm.get('cName')?.value,
        genderID : this.myForm.get('cGender')?.value,
        jobName : this.myForm.get('cJob')?.value,
        yearsOfExperienceID : this.myForm.get('cExperience')?.value,
        phone : this.myForm.get('cPhone')?.value,
        email : this.myForm.get('cEmail')?.value,
        webSite : this.strWebSite,
        faceBook : this.strfb,
        knowUsID : this.myForm.get('cKnowUs')?.value,
        aboutMe : this.myForm.get('cBiography')?.value,
        countryID : this.myForm.get('cCountry')?.value,
        governorateID : this.myForm.get('cGovernorate')?.value,
        districtID : this.myForm.get('cDistrict')?.value,
        address : this.myForm.get('cAddress')?.value,
        accountTypeID : this.myForm.get('cAccType')?.value,
        isActivated : this.strClientData[0].isActivated,
        loginType : this.strClientData[0].loginType,
        password : this.strClientData[0].password
      }

      this.clientdata.UpdateClient(ExistingClientData).subscribe((result) => {

        this.clientdata.AddClientPhoto(sessionStorage.getItem('UserID'), this.FilesToUpload[0]).subscribe((res) => {
            this.Loading = false;
            this.OpenErrorMessage('Data has benn Saved Successfully');
            this.DisplayData();
        })
      })
    }
    else if(this.FilesToUpload.length == 0){

      let ExistingClientData = {
        clientID : sessionStorage.getItem('UserID'),
        clientName : this.myForm.get('cName')?.value,
        genderID : this.myForm.get('cGender')?.value,
        jobName : this.myForm.get('cJob')?.value,
        yearsOfExperienceID : this.myForm.get('cExperience')?.value,
        phone : this.myForm.get('cPhone')?.value,
        email : this.myForm.get('cEmail')?.value,
        webSite : this.strWebSite,
        faceBook : this.strfb,
        knowUsID : this.myForm.get('cKnowUs')?.value,
        aboutMe : this.myForm.get('cBiography')?.value,
        countryID : this.myForm.get('cCountry')?.value,
        governorateID : this.myForm.get('cGovernorate')?.value,
        districtID : this.myForm.get('cDistrict')?.value,
        address : this.myForm.get('cAddress')?.value,
        accountTypeID : this.myForm.get('cAccType')?.value,
        isActivated : this.strClientData[0].isActivated,
        loginType : this.strClientData[0].loginType,
        password : this.strClientData[0].password,
        photo : this.strClientData[0].photo
      }

      this.clientdata.UpdateClient(ExistingClientData).subscribe((result) => {
        this.Loading = false;
        this.OpenErrorMessage('Data has benn Saved Successfully');
        this.DisplayData();
      })
    }
    
  }
 
}
