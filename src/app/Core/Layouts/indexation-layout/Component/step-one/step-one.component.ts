import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControlDirective,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SiteItemData } from 'src/app/Shared/Model/SiteItemData.model';
import { SiteItem } from 'src/app/Shared/Model/SiteItem.model';
import { SiteType } from 'src/app/Shared/Model/SiteType.model';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { SiteItemService } from 'src/app/Shared/Services/site-item.service';
import { SiteTypeService } from 'src/app/Shared/Services/site-type.service';
import { Router } from '@angular/router';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { AddSiteItemData } from 'src/app/Shared/Model/AddSiteItemData.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent implements OnInit {
  SType: SiteType[] = [];
  SItem: SiteItem[] = [];
  strSiteItemData: AddSiteItemData[] = [];
  contents?: object;

  public myForm: FormGroup;
  public DynamicForm: FormGroup = this.df.group({});

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;
  Loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private df: FormBuilder,
    private sitetype: SiteTypeService,
    private siteitem: SiteItemService,
    private sitedata: SiteDataService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private elementRef : ElementRef
  ) {
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
      cSiteType: ['0', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadScript();
    
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      this.getSiteTypeData();
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

  getSiteTypeData() {
    this.sitetype.getSiteTypeData().subscribe((data) => {
      this.SType = data;
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

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  ShowLoading() {}

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
        // alert(
        //   'Must enter value in ' +
        //     this.SItem.find((m) => m.siteItemID == itmD)?.siteItemName
        // );
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
          // alert(
          //   'Value must be a Number in ' +
          //     this.SItem.find((m) => m.siteItemID == itmD)?.siteItemName
          // );
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

    // Collect the SiteData Data
    let strSiteData = {
      Address: this.myForm.get('cAddress')?.value,
      Area: this.myForm.get('cArea')?.value,
      Floor: this.myForm.get('cFloor')?.value,
      ClientID: sessionStorage.getItem('UserID'),
      SiteTypeID: this.myForm.get('cSiteType')?.value,
      siteItemDatas: this.strSiteItemData,
      projectType : 1
    };

    // Save Data and goto next step
    this.Loading = true;
    this.sitedata.AddSiteData(strSiteData).subscribe((res) => {
      sessionStorage.setItem('SiteDataID', res.toString());
      this.Loading = false;
      this.route.navigate(['/Indexation/StepTwo']);
    });
  }
}


