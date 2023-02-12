import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from 'src/app/Shared/Components/message/message.component';
import { DeleteSpaceOrBand } from 'src/app/Shared/Model/DeleteSpaceOrBand.model';
import { ListOfIDs } from 'src/app/Shared/Model/ListOfIDs.model';
import { RepProjectAssay_TotalItems } from 'src/app/Shared/Model/RepProjectAssay_TotalItems.model';
import { RepProjectAssay_TotalSpaces } from 'src/app/Shared/Model/RepProjectAssay_TotalSpaces.model';
import { SiteData } from 'src/app/Shared/Model/SiteData.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { IndexationFormReportService } from 'src/app/Shared/Services/indexation-form-report.service';
import { MessageService } from 'src/app/Shared/Services/message.service';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';

@Component({
  selector: 'app-delete-space-or-band',
  templateUrl: './delete-space-or-band.component.html',
  styleUrls: ['./delete-space-or-band.component.scss'],
})
export class DeleteSpaceOrBandComponent implements OnInit, AfterViewChecked {
  strRepProjectAssay_TotalItems: RepProjectAssay_TotalItems[] = [];
  strRepProjectAssay_TotalSpaces: RepProjectAssay_TotalSpaces[] = [];
  strSpaceData: SpaceData[] = [];
  cmbstrSpaceData: SpaceData[] = [];
  strSiteData: SiteData[] = [];

  strDeleteSpaceOrBand: DeleteSpaceOrBand[] = [];
  strListOfIDs: ListOfIDs[] = [];

  public FixForm: FormGroup;
  public SiteForm: FormGroup;
  public ChoiceForm: FormGroup;

  strSpaceID: string = '';

  dblIndxChoiceNo: number = 0;
  dblIndexationTotal: number = 0;
  dblSpaceTotal: number = 0;
  Loading: boolean = false;

  constructor(
    private route: Router,
    private spacedata: SpaceDataService,
    private sitedata: SiteDataService,
    private ff: FormBuilder,
    private SD: FormBuilder,
    private cf: FormBuilder,
    private MSG: MessageService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private repprojectassay: IndexationFormReportService,
    public dialogRef: MatDialogRef<DeleteSpaceOrBandComponent>
  ) {
    this.ChoiceForm = cf.group({
      cIndxFormChoice: [0],
    });

    this.FixForm = ff.group({
      cAddress: [0],
      cFloor: [0],
      cArea: [0],
      cSiteType: [''],
      cProjectStatus: [''],
      cEngSupervision: [''],
    });

    this.SiteForm = SD.group({
      cIndexItmID: [false],
      cspaceDataID: [false],
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      if (sessionStorage.getItem('SiteDataID') == null) {
        this.route.navigate(['/User/Profile']);
      } else {
        this.GetSiteDataID();
        this.GetSpaceData();
      }
    }
  }

  ngAfterViewChecked() {
    // this.CalculateIndexationTotal();
    this.cdRef.detectChanges();
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
        this.FixForm.get('cSiteType')?.setValue(
          this.strSiteData[0].siteTypeName
        );
        this.FixForm.get('cProjectStatus')?.setValue(
          this.strSiteData[0].projectStatusName
        );
        if (this.strSiteData[0].engSupervision == true) {
          this.FixForm.get('cEngSupervision')?.setValue('تشمل');
        } else {
          this.FixForm.get('cEngSupervision')?.setValue('لا تشمل');
        }

        for (
          let i = 0;
          i <= this.strSiteData[0].siteItemDatas.length - 1;
          i++
        ) {
          for (
            let j = 0;
            j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
            j++
          ) {
            let newSpaceData = {
              name: this.strSiteData[0].siteItemDatas[i].spaceDatas[j].name,
              height: this.strSiteData[0].siteItemDatas[i].spaceDatas[j].height,
              width: this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width,
              length: this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length,
              styleID : '',
              spaceWindowDoorDatas: [],
              spacePhotos : [],
              spaceOutputs : []
            };

            this.strSpaceData.push(newSpaceData);
          }
        }
      });
    this.Loading = false;
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetSpaceData() {
    this.spacedata
      .getSpaceDataBySiteDataID(sessionStorage.getItem('SiteDataID'))
      .subscribe((data) => {
        this.cmbstrSpaceData = data;
      });
  }

  DisplayIndexationDataForm(e: any) {
    this.dblIndxChoiceNo = e.value;
    this.strSpaceID = '';
    if (this.dblIndxChoiceNo == 1) {
      this.Loading = true;
      this.repprojectassay
        .GetTotalItemsBySiteDataID(sessionStorage.getItem('SiteDataID'))
        .subscribe((data) => {
          this.strRepProjectAssay_TotalItems = data;

          for (
            let i = 0;
            i <= this.strRepProjectAssay_TotalItems.length - 1;
            i++
          ) {
            this.SiteForm.addControl(
              'cIndexItmID' + (i + 1),
              this.SD.control(false)
            );
            this.SiteForm.get('cIndexItmID' + (i + 1))?.setValue(false);
          }
        });
      this.Loading = false;
    } else if (this.dblIndxChoiceNo == 2) {
      this.Loading = true;
      this.repprojectassay
        .GetTotalSpacesBySiteDataID(sessionStorage.getItem('SiteDataID'))
        .subscribe((data) => {
          this.strRepProjectAssay_TotalSpaces = data;

          for (
            let i = 0;
            i <= this.strRepProjectAssay_TotalSpaces.length - 1;
            i++
          ) {
            this.SiteForm.addControl(
              'cspaceDataID' + (i + 1),
              this.SD.control(false)
            );
            this.SiteForm.get('cspaceDataID' + (i + 1))?.setValue(false);
          }
        });

      this.Loading = false;
    }
  }

  DeleteIndexation() {
    let blnNotSelected = false;

    if (this.ChoiceForm.get('cIndxFormChoice')?.value == 1) {
      this.strListOfIDs.length = 0;
      blnNotSelected = false;
      var elements = <HTMLInputElement[]>(
        (<any>document.getElementsByName('IndexItmID'))
      );
      for (let i = 0; i <= elements.length - 1; i++) {
        if (elements[i].type == 'checkbox') {
          if (elements[i].checked == true) {
            let newIDs = {
              SpaceIndexationItemID: elements[i].value,
            };
            this.strListOfIDs.push(newIDs);
            blnNotSelected = true;
          }
        }
      }
      if (blnNotSelected == false) {
        this.MSG.OpenErrorMessage(
          'يجب اختيار بند واحد على الاقل لاستكمال عملية الحذف'
        );
        return;
      }

      let newMessage = {
        TitleMessage: 'Question',
        BodyMessage: 'Do you want to Delete the Selected Bands?',
      };

      const dialogRef = this.dialog.open(MessageComponent, {
        height: '240px',
        width: '790px',
        disableClose: true,
        autoFocus: true,
        data: newMessage,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == 1) {
          // Delete From DB
          let newDeleteSpaceOrBand = {
            siteDataID: sessionStorage.getItem('SiteDataID'),
            flag: 1,
            ListOfIDs: this.strListOfIDs,
          };

          // Call Delete API
          this.sitedata
            .DeleteSpaceOrBand(newDeleteSpaceOrBand)
            .subscribe((res) => {
              this.MSG.OpenErrorMessage('تم حذف الفراغات المختارة بنجاح');

              // ReLoad Data
              this.Loading = true;
              this.repprojectassay
                .GetTotalItemsBySiteDataID(sessionStorage.getItem('SiteDataID'))
                .subscribe((data) => {
                  this.strRepProjectAssay_TotalItems = data;

                  for (
                    let i = 0;
                    i <= this.strRepProjectAssay_TotalItems.length - 1;
                    i++
                  ) {
                    this.SiteForm.addControl(
                      'cIndexItmID' + (i + 1),
                      this.SD.control(false)
                    );
                    this.SiteForm.get('cIndexItmID' + (i + 1))?.setValue(false);
                  }
                });
              this.Loading = false;
            });
        }
      });
    } else if (this.ChoiceForm.get('cIndxFormChoice')?.value == 2) {
      this.strListOfIDs.length = 0;
      blnNotSelected = false;

      var elements = <HTMLInputElement[]>(
        (<any>document.getElementsByName('SpaceDataID'))
      );
      for (let i = 0; i <= elements.length - 1; i++) {
        if (elements[i].type == 'checkbox') {
          if (elements[i].checked == true) {
            let newIDs = {
              SpaceIndexationItemID: elements[i].value,
            };
            this.strListOfIDs.push(newIDs);
            blnNotSelected = true;
          }
        }
      }
      if (blnNotSelected == false) {
        this.MSG.OpenErrorMessage(
          'يجب اختيار فراغ واحد على الاقل لاستكمال عملية الحذف'
        );
        return;
      }

      let newMessage = {
        TitleMessage: 'Question',
        BodyMessage: 'Do you want to Delete the Selected Spaces?',
      };

      const dialogRef = this.dialog.open(MessageComponent, {
        height: '240px',
        width: '790px',
        disableClose: true,
        autoFocus: true,
        data: newMessage,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == 1) {
          // Delete From DB
          let newDeleteSpaceOrBand = {
            siteDataID: sessionStorage.getItem('SiteDataID'),
            flag: 2,
            ListOfIDs: this.strListOfIDs,
          };

          // Call Delete API
          this.sitedata
            .DeleteSpaceOrBand(newDeleteSpaceOrBand)
            .subscribe((res) => {
              this.MSG.OpenErrorMessage('تم حذف البنود المختارة بنجاح');

              // ReLoad Data
              this.Loading = true;
              this.repprojectassay
                .GetTotalSpacesBySiteDataID(
                  sessionStorage.getItem('SiteDataID')
                )
                .subscribe((data) => {
                  this.strRepProjectAssay_TotalSpaces = data;

                  for (
                    let i = 0;
                    i <= this.strRepProjectAssay_TotalSpaces.length - 1;
                    i++
                  ) {
                    this.SiteForm.addControl(
                      'cspaceDataID' + (i + 1),
                      this.SD.control(false)
                    );
                    this.SiteForm.get('cspaceDataID' + (i + 1))?.setValue(
                      false
                    );
                  }
                });

              this.Loading = false;
            });
        }
      });
    }
  }

  CloseIndexation() {
    this.dialogRef.close();
  }
}
