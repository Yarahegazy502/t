import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountCategory } from 'src/app/Shared/Model/AccountCategory.model';
import { AccountType } from 'src/app/Shared/Model/AccountType.model';
import { City } from 'src/app/Shared/Model/City.model';
import { ClientAccountCategory } from 'src/app/Shared/Model/ClientAccountCategoryID.model';
import { Country } from 'src/app/Shared/Model/Country.model';
import { District } from 'src/app/Shared/Model/District.model';
import { Gender } from 'src/app/Shared/Model/Gender.model';
import { Governorate } from 'src/app/Shared/Model/Governorate.model';
import { KnowUs } from 'src/app/Shared/Model/KnowUs.model';
import { YearsOfExperience } from 'src/app/Shared/Model/YearsOfExperience.model';
import { AccountCategoryService } from 'src/app/Shared/Services/account-category.service';
import { AccountTypeService } from 'src/app/Shared/Services/account-type.service';
import { CityService } from 'src/app/Shared/Services/city.service';
import { ClientService } from 'src/app/Shared/Services/client.service';
import { CountryService } from 'src/app/Shared/Services/country.service';
import { DistrictService } from 'src/app/Shared/Services/district.service';
import { GenderService } from 'src/app/Shared/Services/gender.service';
import { GovernorateService } from 'src/app/Shared/Services/governorate.service';
import { KnowUsService } from 'src/app/Shared/Services/know-us.service';
import { YearsOfExperienceService } from 'src/app/Shared/Services/years-of-experience.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public myForm: FormGroup;
  _Gender: Gender[] = [];
  _Country: Country[] = [];
  _District: District[] = [];
  _Governorate: Governorate[] = [];
  _City: City[] = [];
  _KnowUs: KnowUs[] = [];
  _YearsOfExperience: YearsOfExperience[] = [];
  _AccountType: AccountType[] = [];
  _AccountCategory: AccountCategory[] = [];
  strclientAccountCategories : ClientAccountCategory[] = [];
  submitted: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gender: GenderService,
    private country: CountryService,
    private district: DistrictService,
    private governorate: GovernorateService,
    private city: CityService,
    private knowus: KnowUsService,
    private yearsofexperience: YearsOfExperienceService,
    private accounttype: AccountTypeService,
    private accountcategory: AccountCategoryService,
    private client: ClientService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = fb.group({
      cFullName: ['', Validators.required],
      // cJob: [''],
      cPhone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      // cCountry: [0, Validators.required],
      // cDistrict: [0, Validators.required],
      // cGovernorate: [0, Validators.required],
      // cCity: [0, Validators.required],
      cGender: [0, Validators.required],
      // cYearsOfExperience: [0],
      cAccountType: [0, Validators.required],
      cAccountCategory: [0, Validators.required],
      cKnowUs: [0, Validators.required],
      cEMail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      // cAddress: [''],
    });
  }

  LoadGender() {
    this.gender.GetAllGender().subscribe((data) => {
      this._Gender = data;
    });
  }

  LoadCountry() {
    this.country.GetAllCountry().subscribe((data) => {
      this._Country = data;
    });
  }

  LoadDistrict(CountryID: any) {
    // this._Governorate = [];
    // this._City = [];

    // if (CountryID.target.value != '0') {
    //   this.district
    //     .GetDistrictByCountryID(CountryID.target.value)
    //     .subscribe((data) => {
    //       this._District = data;
    //     });
    // } else {
    //   this._District = [];
    //   this.myForm.get('cDistrict')?.setValue(0);
    // }
  }

  LoadGovernorate(DistrictID: any) {
    // this._City = [];
    // if (DistrictID.target.value != '0') {
    //   this.governorate
    //     .GetGovernorateByDistrictID(DistrictID.target.value)
    //     .subscribe((data) => {
    //       this._Governorate = data;
    //     });
    // } else {
    //   this._Governorate = [];
    //   this.myForm.get('cGovernorate')?.setValue(0);
    // }
  }

  LoadCity(GovernorateID: any) {
    if (GovernorateID.target.value != '0') {
      this.city
        .GetCityByGovernorateID(GovernorateID.target.value)
        .subscribe((data) => {
          this._City = data;
        });
    } else {
      this._City = [];
      this.myForm.get('cCity')?.setValue(0);
    }
  }

  LoadKnowUs() {
    this.knowus.GetAllKnowUs().subscribe((data) => {
      this._KnowUs = data;
    });
  }

  LoadYearsOfExperience() {
    this.yearsofexperience.GetAllYearsOfExperience().subscribe((data) => {
      this._YearsOfExperience = data;
    });
  }

  LoadAccountType() {
    this.accounttype.GetAllAccountType().subscribe((data) => {
      this._AccountType = data;
    });
  }

  LoadAccountCategory(AccountTypeID: any) {
    if (AccountTypeID.target.value != '0') {
      this.accountcategory
        .GetAccountCategoryByAccountTypeID(AccountTypeID.target.value)
        .subscribe((data) => {
          this._AccountCategory = data;
        });
    } else {
      this._AccountCategory = [];
      this.myForm.get('cAccountCategory')?.setValue(0);
    }
  }

  ngOnInit(): void {
    this.Loading = true;
    this.LoadGender();
    // this.LoadCountry();
    this.LoadKnowUs();
    // this.LoadYearsOfExperience();
    this.LoadAccountType();
    this.Loading = false;
  }

  get f() {
    return this.myForm.controls;
  }

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  SaveData() {
    if (this.myForm.get('cFullName')?.value.trim() == '') {
      this.OpenErrorMessage('Must Enter Full Name');
      return;
    } else if (this.myForm.get('cPhone')?.value.trim() == '') {
      this.OpenErrorMessage('Must Enter Telephone');
      return;
    } else if (isNaN(this.myForm.get('cPhone')?.value.trim()) == true) {
      this.OpenErrorMessage('Telephone must be a Number Only');
      return;
    } else if (this.myForm.get('cPhone')?.value.length < 11) {
      this.OpenErrorMessage('Telephone must be 11 Number');
      return;
      // } else if (this.myForm.get('cCountry')?.value == '0') {
      //   this.OpenErrorMessage('Must select Country');
      //   return;
      // } else if (this.myForm.get('cDistrict')?.value == '0') {
      //   this.OpenErrorMessage('Must select District');
      //   return;
      // } else if (this.myForm.get('cGovernorate')?.value == '0') {
      //   this.OpenErrorMessage('Must select Governorate');
      //   return;
      // } else if (this.myForm.get('cCity')?.value == '0') {
      //   this.OpenErrorMessage('Must select City');
      //   return;
    } else if (this.myForm.get('cGender')?.value == '0') {
      this.OpenErrorMessage('Must select Gender');
      return;
    } else if (this.myForm.get('cAccountType')?.value == '0') {
      this.OpenErrorMessage('Must select AccountType');
      return;
    } else if (this.myForm.get('cAccountCategory')?.value == '0') {
      this.OpenErrorMessage('Must select AccountCategory');
      return;
    } else if (this.myForm.get('cKnowUs')?.value == '0') {
      this.OpenErrorMessage('Must select KnowUs');
      return;
    } else if (this.myForm.get('cEMail')?.value.trim() == '') {
      this.OpenErrorMessage('Must enter E-Mail');
      return;
    } else if (this.myForm.controls['cEMail'].hasError('pattern') == true) {
      this.OpenErrorMessage('Invalid E-Mail');
      return;
    }

    let YOE;

    // if (this.myForm.get('cYearsOfExperience')?.value == 0) {
    //   YOE = null;
    // } else {
    //   YOE = this.myForm.get('cYearsOfExperience')?.value;
    // }

     // Prepare Data to Save
     let cAccCat = this.myForm.get('cAccountCategory')?.value;
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
 

    let NewClient = {
      clientName: this.myForm.get('cFullName')?.value,
      jobName: '', // this.myForm.get('cJob')?.value,
      email: this.myForm.get('cEMail')?.value,
      phone: this.myForm.get('cPhone')?.value,
      address: '', //this.myForm.get('cAddress')?.value,
      genderID: this.myForm.get('cGender')?.value,
      knowUsID: this.myForm.get('cKnowUs')?.value,
      yearsOfExperienceID: null, //YOE,
      countryID: null, //this.myForm.get('cCountry')?.value,
      districtID: null, //this.myForm.get('cDistrict')?.value,
      governorateID: null, //this.myForm.get('cGovernorate')?.value,
      cityID: null, //this.myForm.get('cCity')?.value,
      accountTypeID: this.myForm.get('cAccountType')?.value,
      clientAccountCategories: this.strclientAccountCategories,
      loginType: 1,
      isActivated: true,
      password: '',
    };

    this.Loading = true;
    this.client.AddClient(NewClient).subscribe((res) => {
      this.Loading = false;
      this.route.navigate(['/Auth/RegisterSuccessfully']);
    });
  }
}
