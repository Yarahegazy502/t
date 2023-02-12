import { NumberSymbol } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddSpaceWindowDoorData } from 'src/app/Shared/Model/AddSpaceWindowDoorData.model';
import { IndexationDataMaster } from 'src/app/Shared/Model/IndexationDataMaster.model';
import { RepProjectAssay_TotalItems } from 'src/app/Shared/Model/RepProjectAssay_TotalItems.model';
import { RepProjectAssay_TotalSpaces } from 'src/app/Shared/Model/RepProjectAssay_TotalSpaces.model';
import { SiteData } from 'src/app/Shared/Model/SiteData.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { IndexationFormReportService } from 'src/app/Shared/Services/indexation-form-report.service';
import { SiteDataService } from 'src/app/Shared/Services/site-data.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.scss'],
})
export class StepFourComponent implements OnInit {
  public ChoiceForm: FormGroup;
  public FixForm: FormGroup;
  public SiteForm: FormGroup;
  strSiteData: SiteData[] = [];
  strSpaceData: SpaceData[] = [];
  cmbstrSpaceData: SpaceData[] = [];
  strRepProjectAssay_TotalItems: RepProjectAssay_TotalItems[] = [];
  strRepProjectAssay_TotalSpaces: RepProjectAssay_TotalSpaces[] = [];
  strRepProjectAssay_DetailedSpaces: IndexationDataMaster[] = [];

  dblIndxChoiceNo: number = 0;
  dblIndexationTotal: number = 0;
  dblSpaceTotal: number = 0;

  Loading: boolean = false;

  strSpaceID: string = '';

  constructor(
    private cf: FormBuilder,
    private ff: FormBuilder,
    private SD: FormBuilder,
    private sitedata: SiteDataService,
    private repprojectassay: IndexationFormReportService,
    private route: Router,
    private spacedata: SpaceDataService,
    private elementRef : ElementRef
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
      cSpaceData: [0],
      cSpaceTotal: [0],
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
        this.GetSiteDataID();
        this.GetSpaceData();
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

  GoToProfile() {
    this.route.navigate(['/User/Profile']);
    sessionStorage.removeItem('SiteDataID');
    sessionStorage.removeItem('IsEngSupervision');
    sessionStorage.removeItem('EngSupervisionTypeID');
    sessionStorage.removeItem('EngSupervision');
    sessionStorage.removeItem('isDisplayWall');
  }

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  GetWallArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          let H: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].height;
          let W: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;
          let L: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;

          Area = H * L * 2 + W * H * 2;
          break;
        }
      }
    }
    let DoorArea = this.GetDoorArea(SpaceID);
    let WindowArea = this.GetWindowArea(SpaceID);

    return Math.fround(Area - (DoorArea + WindowArea));
  }

  GetWallOneAndTwoArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          let H: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].height;
          let L: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;

          Area = H * L;
          break;
        }
      }
    }
    return Math.fround(Area);
  }

  GetFloorArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          let L: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;
          let W: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;

          Area = L * W;
          break;
        }
      }
    }
    return Math.fround(Area);
  }

  GetWallThreeAndFourArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          let W: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;
          let H: number =
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].height;

          Area = W * H;
          break;
        }
      }
    }
    return Math.fround(Area);
  }

  GetDoorArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          for (
            let k = 0;
            k <=
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
              .spaceWindowDoorDatas?.length -
              1;
            k++
          ) {
            if (
              this.strSiteData[0].siteItemDatas[i].spaceDatas[
                j
              ].spaceWindowDoorDatas[k].flagID.toUpperCase() ==
              'E93DE226-73A3-4559-EB98-08D9E0649AF0'
            ) {
              Area =
                Number(Area) +
                Number(
                  this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
                    .spaceWindowDoorDatas[k].height
                ) *
                  Number(
                    this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
                      .spaceWindowDoorDatas[k].length
                  );
            }
          }
          break;
        }
      }
    }
    return Math.fround(Area);
  }

  GetWindowArea(SpaceID: any) {
    let Area: number = 0;
    for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
      for (
        let j = 0;
        j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
        j++
      ) {
        if (
          this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
          SpaceID
        ) {
          for (
            let k = 0;
            k <=
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
              .spaceWindowDoorDatas?.length -
              1;
            k++
          ) {
            if (
              this.strSiteData[0].siteItemDatas[i].spaceDatas[
                j
              ].spaceWindowDoorDatas[k].flagID.toUpperCase() ==
              'AB5152F9-7035-433D-EB97-08D9E0649AF0'
            ) {
              Area =
                Number(Area) +
                Number(
                  this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
                    .spaceWindowDoorDatas[k].height
                ) *
                  Number(
                    this.strSiteData[0].siteItemDatas[i].spaceDatas[j]
                      .spaceWindowDoorDatas[k].length
                  );
            }
          }
          break;
        }
      }
    }
    return Math.fround(Area);
  }

  GetDependCount(spaceID: any, IndxItmID: any, indexationItemDetailID: any) {
    let intCount = this.strRepProjectAssay_DetailedSpaces
      .find((x) => x.spaceID == spaceID)
      ?.indexationDataDetails.find((y) => y.indexationItemID == IndxItmID)
      ?.indexationDataDetailDs.find(
        (k) => k.indexationItemDetailID == indexationItemDetailID
      )?.itemCount;

    return intCount || 0;
  }

  GetCeilingArea(SpaceID: any, IndexationItemID: any) {
    let Area: number = 0;

    if (
      this.strRepProjectAssay_DetailedSpaces
        .find((m) => m.spaceID == SpaceID)
        ?.indexationDataDetails.find(
          (v) => v.indexationItemID == IndexationItemID
        )?.indexationDataDetailDs[0].calculatePriceMethod == 1
    ) {
      for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
        for (
          let j = 0;
          j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
          j++
        ) {
          if (
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
            SpaceID
          ) {
            let L: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;
            let W: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;

            Area = L * W;
            break;
          }
        }
      }
    } else if (
      this.strRepProjectAssay_DetailedSpaces
        .find((m) => m.spaceID == SpaceID)
        ?.indexationDataDetails.find(
          (v) => v.indexationItemID == IndexationItemID
        )?.indexationDataDetailDs[0].calculatePriceMethod == 2
    ) {
      for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
        for (
          let j = 0;
          j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
          j++
        ) {
          if (
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
            SpaceID
          ) {
            let L: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;
            let W: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;

            Area = (L * W) / 2;
            break;
          }
        }
      }
    } else if (
      this.strRepProjectAssay_DetailedSpaces
        .find((m) => m.spaceID == SpaceID)
        ?.indexationDataDetails.find(
          (v) => v.indexationItemID == IndexationItemID
        )?.indexationDataDetailDs[0].calculatePriceMethod == 3
    ) {
      for (let i = 0; i <= this.strSiteData[0].siteItemDatas.length - 1; i++) {
        for (
          let j = 0;
          j <= this.strSiteData[0].siteItemDatas[i].spaceDatas.length - 1;
          j++
        ) {
          if (
            this.strSiteData[0].siteItemDatas[i].spaceDatas[j].spaceDataID ==
            SpaceID
          ) {
            let L: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].length;
            let W: number =
              this.strSiteData[0].siteItemDatas[i].spaceDatas[j].width;

            Area = L * 2 + W * 2;
            break;
          }
        }
      }
    }
    return Math.fround(Area);
  }

  GetSpaceData() {
    this.spacedata
      .getSpaceDataBySiteDataID(sessionStorage.getItem('SiteDataID'))
      .subscribe((data) => {
        this.cmbstrSpaceData = data;
      });
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

  DisplayIndexationDataForm(e: any) {
    this.dblIndxChoiceNo = e.target.value;
    this.strSpaceID = '';
    this.SiteForm.get('cSpaceData')?.setValue(0);
    this.dblSpaceTotal = 0;
    if (this.dblIndxChoiceNo == 1) {
      this.Loading = true;
      this.repprojectassay
        .GetTotalItemsBySiteDataID(sessionStorage.getItem('SiteDataID'))
        .subscribe((data) => {
          this.strRepProjectAssay_TotalItems = data;
          this.dblIndexationTotal = 0;
          for (
            let i = 0;
            i <= this.strRepProjectAssay_TotalItems.length - 1;
            i++
          ) {
            this.dblIndexationTotal =
              Number(this.dblIndexationTotal) +
              Number(this.strRepProjectAssay_TotalItems[i].total);
          }
        });
      this.Loading = false;
    } else if (this.dblIndxChoiceNo == 2) {
      this.Loading = true;
      this.repprojectassay
        .GetTotalSpacesBySiteDataID(sessionStorage.getItem('SiteDataID'))
        .subscribe((data) => {
          this.strRepProjectAssay_TotalSpaces = data;
          this.dblIndexationTotal = 0;
          for (
            let i = 0;
            i <= this.strRepProjectAssay_TotalSpaces.length - 1;
            i++
          ) {
            this.dblIndexationTotal =
              Number(this.dblIndexationTotal) +
              Number(this.strRepProjectAssay_TotalSpaces[i].total);
          }
        });
      this.Loading = false;
    } else if (this.dblIndxChoiceNo == 3) {
      this.Loading = true;
      this.repprojectassay
        .GetDetailedSpacesBySiteDataID(sessionStorage.getItem('SiteDataID'))
        .subscribe((data) => {
          this.strRepProjectAssay_DetailedSpaces = data;
          this.dblIndexationTotal = 0;
          for (
            let i = 0;
            i <= this.strRepProjectAssay_DetailedSpaces.length - 1;
            i++
          ) {
            for (
              let j = 0;
              j <=
              this.strRepProjectAssay_DetailedSpaces[i].indexationDataDetails
                .length -
                1;
              j++
            ) {
              this.dblIndexationTotal =
                Number(this.dblIndexationTotal) +
                Number(
                  this.strRepProjectAssay_DetailedSpaces[i]
                    .indexationDataDetails[j].total
                );
            }
          }
        });
      this.Loading = false;
    }
  }

  DisplaySpaceDetail() {
    this.strSpaceID = this.SiteForm.get('cSpaceData')?.value;
    this.dblSpaceTotal = 0;

    for (
      let i = 0;
      i <= this.strRepProjectAssay_DetailedSpaces.length - 1;
      i++
    ) {
      if (
        this.strRepProjectAssay_DetailedSpaces[i].spaceID == this.strSpaceID
      ) {
        for (
          let j = 0;
          j <=
          this.strRepProjectAssay_DetailedSpaces[i].indexationDataDetails
            .length -
            1;
          j++
        ) {
          this.dblSpaceTotal =
            Number(this.dblSpaceTotal) +
            Number(
              this.strRepProjectAssay_DetailedSpaces[i].indexationDataDetails[j]
                .total
            );
        }
      }
    }

    // this.dblSpaceTotal =
    //   this.strRepProjectAssay_DetailedSpaces.find(
    //     (x) => x.spaceID == this.SiteForm.get('cSpaceData')?.value
    //   )?.total || 0;
  }
}
