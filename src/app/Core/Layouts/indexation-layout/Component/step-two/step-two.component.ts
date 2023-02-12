import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddSpaceWindowDoorData } from 'src/app/Shared/Model/AddSpaceWindowDoorData.model';
import { ProjectStatus } from 'src/app/Shared/Model/ProjectStatus.model';
import { Setting } from 'src/app/Shared/Model/Setting.model';
import { SiteItemData } from 'src/app/Shared/Model/SiteItemData.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { ProjectStatusService } from 'src/app/Shared/Services/project-status.service';
import { SettingService } from 'src/app/Shared/Services/setting.service';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { SiteItemDataService } from 'src/app/Shared/Services/site-item-data.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss'],
})
export class StepTwoComponent implements OnInit {
  SID: SiteItemData[] = [];
  RealSID: SiteItemData[] = [];
  PS: ProjectStatus[] = [];
  sett: Setting[] = [];
  intCount: number = 0;
  intMaxCount: number = 0;
  WinNo: number = 0;
  intArr: number[] = [];
  EngSup: boolean = false;
  IsDisplayWall: boolean = false;
  strSpaceData: SpaceData[] = [];
  strSpaceWindowDoorData: AddSpaceWindowDoorData[] = [];

  strSupervisionValue: string = '';
  strSupervisionType: string = '';

  public myForm: FormGroup = this.mf.group({});
  public fixForm: FormGroup;
  public DynamicForm: FormGroup = this.df.group({});

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;

  constructor(
    private route: Router,
    private siteitemdata: SiteItemDataService,
    private projectstatus: ProjectStatusService,
    private setting: SettingService,
    private spacedata: SpaceDataService,
    private sitedata: SiteDataService,
    private mf: FormBuilder,
    private fb: FormBuilder,
    private df: FormBuilder,
    private _snackBar: MatSnackBar,
    private elementRef : ElementRef
  ) {
    this.fixForm = fb.group({
      cProjectStatus: [0, Validators.required],
      cEngSupervision: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadScript();

    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      if (sessionStorage.getItem('SiteDataID') == null) {
        this.route.navigate(['/User/Profile']);
      } else {
        this.getProjectStatus();
        this.getSetting();
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

  getSetting() {
    this.setting.getSettingByName('EngSupervision').subscribe((data) => {
      this.sett = data;
      this.strSupervisionValue = this.sett[0].value;
      if (
        this.sett[0].flagID.toUpperCase() ==
        '8F989BFC-BD95-4289-7851-08D9DAAAC180'
      ) {
        this.strSupervisionType = '%';
      } else if (
        this.sett[0].flagID.toUpperCase() ==
        '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
      ) {
        this.strSupervisionType = 'جنيه';
      }
    });
  }

  getProjectStatus() {
    this.projectstatus.getAllProjectStatus().subscribe((data) => {
      this.PS = data;
    });
  }

  counter(k: number) {
    return new Array(k);
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

        this.intCount = 0;

        for (const control of this.RealSID) {
          this.intCount += 1;
          const validatorsToAdd = [];

          // Text Name
          validatorsToAdd.push(Validators.required);
          this.myForm.addControl(
            'N' + '_' + this.intCount,
            this.mf.control('', validatorsToAdd)
          );

          // Height Name
          validatorsToAdd.push(Validators.required);
          this.myForm.addControl(
            'H' + '_' + this.intCount,
            this.mf.control('0', validatorsToAdd)
          );

          // Width Name
          validatorsToAdd.push(Validators.required);
          this.myForm.addControl(
            'W' + '_' + this.intCount,
            this.mf.control('0', validatorsToAdd)
          );

          // Length Name
          validatorsToAdd.push(Validators.required);
          this.myForm.addControl(
            'L' + '_' + this.intCount,
            this.mf.control('0', validatorsToAdd)
          );

          for (let j = 0; j < 5; j++) {
            // Window Number Name
            this.myForm.addControl(
              'WNH' + (j + 1) + '_' + this.intCount,
              this.mf.control('0', validatorsToAdd)
            );
            this.myForm.addControl(
              'WNL' + (j + 1) + '_' + this.intCount,
              this.mf.control('0', validatorsToAdd)
            );
          }

          for (let j = 0; j < 3; j++) {
            // Door Number Name
            this.myForm.addControl(
              'DNH' + (j + 1) + '_' + this.intCount,
              this.mf.control('0', validatorsToAdd)
            );
            this.myForm.addControl(
              'DNL' + (j + 1) + '_' + this.intCount,
              this.mf.control('0', validatorsToAdd)
            );
          }
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

  getSecondStepData() {
    this.intMaxCount = this.RealSID.length;
    for (let i = 0; i <= this.intMaxCount - 1; i++) {

      if(this.myForm.get('N_' + (i + 1))?.value.trim() != ''){

        if (this.myForm.get('N_' + (i + 1))?.value.trim() == '') {
        this.OpenErrorMessage(
          'Name for space ' + this.RealSID[i].siteItemName + ' is Required'
        );
        return;
      } else if (this.myForm.get('N_' + (i + 1))?.value.trim().length < 3) {
        this.OpenErrorMessage(
          'Name must at least 3 character for space ' +
            this.RealSID[i].siteItemName
        );
        return;
      } else if (
        this.myForm.get('H_' + (i + 1))?.value.trim() == '0' ||
        this.myForm.get('H_' + (i + 1))?.value.trim() == ''
      ) {
        this.OpenErrorMessage(
          'Height for space ' + this.RealSID[i].siteItemName + ' is Required'
        );
        return;
      } else if (this.myForm.get('H_' + (i + 1))?.value.trim().length < 1) {
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
      } else if (
        this.myForm.get('W_' + (i + 1))?.value.trim() == '0' ||
        this.myForm.get('W_' + (i + 1))?.value.trim() == ''
      ) {
        this.OpenErrorMessage(
          'Width for space ' + this.RealSID[i].siteItemName + ' is Required'
        );
        return;
      } else if (this.myForm.get('W_' + (i + 1))?.value.trim().length < 1) {
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
      } else if (
        this.myForm.get('L_' + (i + 1))?.value.trim() == '0' ||
        this.myForm.get('L_' + (i + 1))?.value.trim() == ''
      ) {
        this.OpenErrorMessage(
          'Length for space ' + this.RealSID[i].siteItemName + ' is Required'
        );
        return;
      } else if (this.myForm.get('L_' + (i + 1))?.value.trim().length < 1) {
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

      for (let j = 0; j < 5; j++) {
        // Window Number Validation
        if (
          this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value.trim() !=
            '' &&
          this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value.trim() != '0'
        ) {
          if (
            isNaN(this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value) ==
            true
          ) {
            this.OpenErrorMessage(
              'Height for Window Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' must be a Number only'
            );
            return;
          } else if (
            this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '' ||
            this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '0'
          ) {
            this.OpenErrorMessage(
              'Length for Window Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' is Required'
            );
            return;
          }
        } else if (
          this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value.trim() !=
            '' &&
          this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value.trim() != '0'
        ) {
          if (
            isNaN(this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value) ==
            true
          ) {
            this.OpenErrorMessage(
              'Length for Window Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' must be a Number only'
            );
            return;
          } else if (
            this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '' ||
            this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '0'
          ) {
            this.OpenErrorMessage(
              'Height for Window Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' is Required'
            );
            return;
          }
        }
      }

      for (let j = 0; j < 3; j++) {
        // Door Number Validation
        if (
          this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value.trim() !=
            '' &&
          this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value.trim() != '0'
        ) {
          if (
            isNaN(this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value) ==
            true
          ) {
            this.OpenErrorMessage(
              'Height for Door Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' must be a Number only'
            );
            return;
          } else if (
            this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '' ||
            this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '0'
          ) {
            this.OpenErrorMessage(
              'Length for Door Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' is Required'
            );
            return;
          }
        } else if (
          this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value.trim() !=
            '' &&
          this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value.trim() != '0'
        ) {
          if (
            isNaN(this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value) ==
            true
          ) {
            this.OpenErrorMessage(
              'Length for Door Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' must be a Number only'
            );
            return;
          } else if (
            this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '' ||
            this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value.trim() ==
              '0'
          ) {
            this.OpenErrorMessage(
              'Height for Door Number ' +
                (j + 1) +
                ' for space ' +
                this.RealSID[i].siteItemName +
                ' is Required'
            );
            return;
          }
        }
      }
    }
  }



    if (this.fixForm.get('cProjectStatus')?.value == '0') {
      this.OpenErrorMessage('Must Choose Project Status');
      return;
    } else if (this.fixForm.get('cEngSupervision')?.value == '') {
      this.OpenErrorMessage('Must Choose Engineering Supervision');
      return;
    }

    // Save Data
    for (let i = 0; i <= this.intMaxCount - 1; i++) {

      if(this.myForm.get('N_' + (i + 1))?.value.trim() != ''){

      this.strSpaceWindowDoorData = [];
      // Get Window and Door Data
      for (let j = 0; j < 5; j++) {
        if (
          this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value != 0 &&
          this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value != 0
        ) {
          let newSpaceWindowData = {
            height: this.myForm.get('WNH' + (j + 1) + '_' + (i + 1))?.value,
            length: this.myForm.get('WNL' + (j + 1) + '_' + (i + 1))?.value,
            flagID: 'ab5152f9-7035-433d-eb97-08d9e0649af0',
          };
          this.strSpaceWindowDoorData.push(newSpaceWindowData);
        }
      }

      for (let j = 0; j < 3; j++) {
        if (
          this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value != 0 &&
          this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value != 0
        ) {
          let newSpaceDoorData = {
            height: this.myForm.get('DNH' + (j + 1) + '_' + (i + 1))?.value,
            length: this.myForm.get('DNL' + (j + 1) + '_' + (i + 1))?.value,
            flagID: 'e93de226-73a3-4559-eb98-08d9e0649af0',
          };
          this.strSpaceWindowDoorData.push(newSpaceDoorData);
        }
      }

      // Get Space Data
      let newSpaceData = {
        name: this.myForm.get('N_' + (i + 1))?.value,
        height: this.myForm.get('H_' + (i + 1))?.value,
        width: this.myForm.get('W_' + (i + 1))?.value,
        length: this.myForm.get('L_' + (i + 1))?.value,
        siteItemDataID: this.RealSID[i].siteItemDataID,
        spaceWindowDoorDatas: this.strSpaceWindowDoorData,
        styleID : '00000000-0000-0000-0000-000000000000',
        spacePhotos : [],
        spaceOutputs : []
      };

      this.strSpaceData.push(newSpaceData);
    }
  }


    if (this.fixForm.get('cEngSupervision')?.value == 0) {
      this.EngSup = false;
    } else if (this.fixForm.get('cEngSupervision')?.value == 1) {
      this.EngSup = true;
    }

    this.IsDisplayWall =
      this.PS.find(
        (x) => x.projectStatusID == this.fixForm.get('cProjectStatus')?.value
      )?.isDisplayWall || false;

    let modSiteData = {
      siteDataID: sessionStorage.getItem('SiteDataID'),
      projectStatusID: this.fixForm.get('cProjectStatus')?.value,
      engSupervision: this.EngSup,
    };

    // Save Data and goto next step
    this.Loading = true;
    this.spacedata.AddSpaceDataRange(this.strSpaceData).subscribe((res) => {
      this.sitedata
        .UpdateProjectAndEngSupervisionSiteData(modSiteData)
        .subscribe((data) => {
          sessionStorage.setItem('EngSupervision', this.sett[0].value);
          sessionStorage.setItem('EngSupervisionTypeID', this.sett[0].flagID);
          if (this.EngSup == true) {
            sessionStorage.setItem('IsEngSupervision', '1');
          } else {
            sessionStorage.setItem('IsEngSupervision', '0');
          }
          if (this.IsDisplayWall == true) {
            sessionStorage.setItem('isDisplayWall', '1');
          } else {
            sessionStorage.setItem('isDisplayWall', '0');
          }
          this.Loading = false;
          this.route.navigate(['/Indexation/StepThree']);
        });
    });


  }
}
