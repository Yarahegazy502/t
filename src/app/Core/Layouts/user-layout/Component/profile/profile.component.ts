import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SiteData } from 'src/app/Shared/Model/SiteData.model';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { ShowIndexationComponent } from '../show-indexation/show-indexation.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SettingService } from 'src/app/Shared/Services/setting.service';
import { Setting } from 'src/app/Shared/Model/Setting.model';
import { MessageService } from 'src/app/Shared/Services/message.service';
import { DeleteSpaceOrBandComponent } from '../delete-space-or-band/delete-space-or-band.component';
import { MessageComponent } from 'src/app/Shared/Components/message/message.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  _SiteData: SiteData[] = [];
  _SelectedSiteData: SiteData[] = [];
  _sett: Setting[] = [];
  Loading: boolean = false;

  displayedColumns: string[] = [
    'address',
    'area',
    'floor',
    'Display',
    'Edit',
    'DeleteSpace',
    'Delete',
  ];
  dataSource: MatTableDataSource<SiteData>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    private sitedata: SiteDataService,
    private setting: SettingService,
    private route: Router,
    private MSG: MessageService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this._SiteData);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('UserID') == null) {
      this.route.navigate(['/Auth/Login']);
    } else {
      sessionStorage.removeItem('SiteDataID');
      sessionStorage.removeItem('IsEngSupervision');
      sessionStorage.removeItem('EngSupervisionTypeID');
      sessionStorage.removeItem('EngSupervision');
      sessionStorage.removeItem('isDisplayWall');
      this.GetSiteData();
    }
  }

  DeleteSpaceOrBand(strSiteDataID: any) {
    if (strSiteDataID != null) {
      sessionStorage.setItem('SiteDataID', strSiteDataID);
      const dialogRef = this.dialog.open(DeleteSpaceOrBandComponent, {
        height: '900px',
        width: '1200px',
        disableClose: true,
        autoFocus: true,
        data: '',
      });

      dialogRef.afterClosed().subscribe((result) => {
        sessionStorage.removeItem('SiteDataID');
      });
    }
  }

  EditIndexation(strSiteDataID: any) {
    this.Loading = true;
    this.sitedata.GetSiteDataByID(strSiteDataID).subscribe((data) => {
      this._SelectedSiteData = data;

      if (this._SelectedSiteData.length > 0) {
        if (this._SelectedSiteData[0].isAddToStore == true) {
          this.MSG.OpenErrorMessage(
            'لا يمكن التعديل على هذه المقايسة... حيث انه تم عرضها فى المعرض'
          );
          this.Loading = false;
          return;
        }
        sessionStorage.setItem(
          'SiteDataID',
          this._SelectedSiteData[0].siteDataID
        );
        if (this._SelectedSiteData[0].isDisplayWall == true) {
          sessionStorage.setItem('isDisplayWall', '1');
        } else {
          sessionStorage.setItem('isDisplayWall', '0');
        }
        if (this._SelectedSiteData[0].engSupervision == true) {
          sessionStorage.setItem('IsEngSupervision', '1');
        } else {
          sessionStorage.setItem('IsEngSupervision', '0');
        }
        // Get Eng Supervision Setting
        this.setting.getSettingByName('EngSupervision').subscribe((data) => {
          this._sett = data;
          if (this._sett != null) {
            sessionStorage.setItem(
              'EngSupervisionTypeID',
              this._sett[0].flagID
            );
            sessionStorage.setItem('EngSupervision', this._sett[0].value);
            this.route.navigate(['/Indexation/StepThree']);
            this.Loading = false;
          } else {
            this.MSG.OpenErrorMessage(
              'حدث خطأ أثناء تحميل بيانات المقايسة المختارة.... من فضلك حاول مرة أخرى'
            );
            this.Loading = false;
            return;
          }
        });
      } else {
        this.MSG.OpenErrorMessage(
          'حدث خطأ أثناء تحميل بيانات المقايسة المختارة.... من فضلك حاول مرة أخرى'
        );
        this.Loading = false;
        return;
      }
    });
  }

  OpenIndexation(strSiteDataID: any) {
    if (strSiteDataID != null) {
      sessionStorage.setItem('SiteDataID', strSiteDataID);
      const dialogRef = this.dialog.open(ShowIndexationComponent, {
        height: '900px',
        width: '1200px',
        disableClose: true,
        autoFocus: true,
        data: '',
      });

      dialogRef.afterClosed().subscribe((result) => {
        sessionStorage.removeItem('SiteDataID');
      });
    }
  }

  DeleteIndexation(strSiteDataID: any) {
    let newMessage = {
      TitleMessage: 'Question',
      BodyMessage: 'Do you want to delete this Indexation?',
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
        this.sitedata.DeleteSiteData(strSiteDataID).subscribe((res) => {
          this.MSG.OpenErrorMessage('تم حذف المقايسة المختارة بنجاح');
          this.GetSiteData();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  CreateIndexation() {
    this.route.navigate(['/Indexation']);
  }

  GetSiteData() {
    this.sitedata
      .GetAllSiteDataByClientID(sessionStorage.getItem('UserID'), 1)
      .subscribe((res) => {
        this._SiteData = res;

        this.dataSource = new MatTableDataSource(this._SiteData);
        this.dataSource.paginator = this.paginator || null;
        this.dataSource.sort = this.sort || null;
      });
  }
}
