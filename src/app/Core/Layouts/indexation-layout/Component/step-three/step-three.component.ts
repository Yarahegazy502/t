import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddSpaceWindowDoorData } from 'src/app/Shared/Model/AddSpaceWindowDoorData.model';
import { IndexationDataDetail } from 'src/app/Shared/Model/IndexationDataDetail.model';
import { IndexationDataDetailD } from 'src/app/Shared/Model/IndexationDataDetailD.model';
import { IndexationDataDetailDPrice } from 'src/app/Shared/Model/IndexationDataDetailDPrice.model';
import { IndexationDataMaster } from 'src/app/Shared/Model/IndexationDataMaster.model';
import { IndexationItem } from 'src/app/Shared/Model/IndexationItem.model';
import { IndexationSiteItem } from 'src/app/Shared/Model/IndexationSiteItem.model';
import { SpaceData } from 'src/app/Shared/Model/SpaceData.model';
import { SpaceWindowDoorData } from 'src/app/Shared/Model/SpaceWindowDoorData.model';
import { GlobalService } from 'src/app/Shared/Services/global.service';
import { IndexationDataMasterService } from 'src/app/Shared/Services/indexation-data-master.service';
import { IndexationItemService } from 'src/app/Shared/Services/indexation-item.service';
import { SpaceDataService } from 'src/app/Shared/Services/space-data.service';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
})
export class StepThreeComponent implements OnInit, AfterViewChecked {
  strPrevSpaceID: string = '';
  strSpaceData: SpaceData[] = [];
  strIndexationSiteItem: IndexationSiteItem[] = [];
  strSpaceDoorData: AddSpaceWindowDoorData[] = [];
  strIndexationDatasMaster: IndexationDataMaster[] = [];
  strIndexationDataDetail: IndexationDataDetail[] = [];
  strIndexationDataDetailD: IndexationDataDetailD[] = [];
  strIndexationDataDetailDForEveryItem: IndexationDataDetailD[] = [];
  strIndexationDataDetailDPrice: IndexationDataDetailDPrice[] = [];
  strSavedIndexationDataMaster: IndexationDataMaster[] = [];
  public fixForm: FormGroup;
  public myForm: FormGroup = this.mf.group({});

  dblSpaceDataTotal: number = 0;
  dblItemPrice: number = 0;
  intCount: number = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  Loading: boolean = false;
  IsDisplayWall: string = '';

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private mf: FormBuilder,
    private spacedata: SpaceDataService,
    private indexationitem: IndexationItemService,
    private cdRef: ChangeDetectorRef,
    private IndxDataMasterService: IndexationDataMasterService,
    private _snackBar: MatSnackBar,
    private elementRef : ElementRef
  ) {
    this.fixForm = fb.group({
      cSpaceData: [0, Validators.required],
      cTotalPrice: [0],
      cHeight: [0],
      cWidth: [0],
      cLength: [0],
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
        this.GetSpaceData();
        this.IsDisplayWall = sessionStorage.getItem('isDisplayWall') || '0';
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

  ngAfterViewChecked() {
    // this.CalculateIndexationTotal();
    this.cdRef.detectChanges();
  }

  GetSpaceData() {
    this.spacedata
      .getSpaceDataBySiteDataID(sessionStorage.getItem('SiteDataID'))
      .subscribe((data) => {
        this.strSpaceData = data;
        // console.log(this.strSpaceData);
      });
  }

  GetSpaceWindowDoorData(SpaceID: string) {
    return this.strSpaceData.find((x) => x.spaceDataID == SpaceID)
      ?.spaceWindowDoorDatas;
  }

  GetNumbers(num: number) {
    return new Array(num);
  }

  GetIntegerNumber(decnum: number) {
    return Math.floor(decnum);
  }

  GetSpaceHeight(SpaceID: string) {
    return this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.height;
  }

  GetSpaceWidth(SpaceID: string) {
    return this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.width;
  }

  GetSpaceLength(SpaceID: string) {
    return this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.length;
  }

  CalculateWallArea(SpaceID: string, Idx: number) {
    let H: number =
      this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.height || 0;
    let L =
      this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.length || 0;
    let W = this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.width || 0;
    let dblsuperVisionPrice: number = 0;
    let TotalDoorArea: number = 0;

    this.GetSpaceWindowDoorData(this.fixForm.get('cSpaceData')?.value)?.forEach(
      (elem) => {
        if (
          elem.flagID.toUpperCase() == 'E93DE226-73A3-4559-EB98-08D9E0649AF0'
        ) {
          TotalDoorArea =
            Number(TotalDoorArea) + Number(elem.height) * Number(elem.length);
        }
      }
    );

    this.GetSpaceWindowDoorData(this.fixForm.get('cSpaceData')?.value)?.forEach(
      (elem) => {
        if (
          elem.flagID.toUpperCase() == 'AB5152F9-7035-433D-EB97-08D9E0649AF0'
        ) {
          TotalDoorArea =
            Number(TotalDoorArea) + Number(elem.height) * Number(elem.length);
        }
      }
    );

    let dblPrice =
      (this.strIndexationSiteItem[Idx].indexationItem.indexationItemDetails[0]
        .supplyPrice +
        this.strIndexationSiteItem[Idx].indexationItem.indexationItemDetails[0]
          .workmanShipPrice) *
      (L * H * 2 + W * H * 2 - TotalDoorArea);

    if (sessionStorage.getItem('IsEngSupervision') == '1') {
      if (
        sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
        '8F989BFC-BD95-4289-7851-08D9DAAAC180'
      ) {
        dblsuperVisionPrice =
          (Number(dblPrice) *
            Number(sessionStorage.getItem('EngSupervision'))) /
          100;
      } else if (
        sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
        '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
      ) {
        dblsuperVisionPrice = Number(sessionStorage.getItem('EngSupervision'));
      }
    }

    dblPrice = Number(dblPrice) + Number(dblsuperVisionPrice);

    this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblPrice));

    this.CalculateIndexationTotal();

    return Math.round(L * H * 2 + W * H * 2 - TotalDoorArea);
  }

  CalculateItemPrice(e: any, IndexationItmID: string, Idx: number) {
    let dblItemPrice: number = 0;
    let dblsupplyPrice: number = 0;
    let dblworkmanShipPrice: number = 0;
    let dblsuperVisionPrice: number = 0;

    // حساب السعر للادخال عن طريق عدد
    if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 1
    ) {
      for (
        let i = 0;
        i <=
        this.strIndexationSiteItem[Idx].indexationItem.indexationItemDetails
          .length -
          1;
        i++
      ) {
        if (
          this.myForm.get(
            this.strIndexationSiteItem[Idx].indexationItem
              .indexationItemDetails[i].indexationItemDetailID
          )?.value > 0
        ) {
          dblsupplyPrice =
            this.strIndexationSiteItem[Idx].indexationItem
              .indexationItemDetails[i].supplyPrice;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[Idx].indexationItem
              .indexationItemDetails[i].workmanShipPrice;
          dblItemPrice +=
            (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
            Number(
              this.myForm.get(
                this.strIndexationSiteItem[Idx].indexationItem
                  .indexationItemDetails[i].indexationItemDetailID
              )?.value
            );
        }
      }

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));

      let IndexationDependOn = this.strIndexationSiteItem.find(
        (v) =>
          v.indexationItem.indxItmID ==
          this.strIndexationSiteItem[Idx].indexationItem.indexationItemID
      );

      if (IndexationDependOn != null) {
        if (
          IndexationDependOn.indexationItem.indxType == 0 &&
          IndexationDependOn.indexationItem.calculatePrice == 7
        ) {
          //==================================
          let ItemNumber: number = 0;
          let IndexationDependOnIndex = this.strIndexationSiteItem.findIndex(
            (b) =>
              b.indexationSiteItemID == IndexationDependOn?.indexationSiteItemID
          );
          dblItemPrice = 0;

          let IndexationDepend = this.strIndexationSiteItem.find(
            (v) =>
              v.indexationItemID ==
              this.strIndexationSiteItem[IndexationDependOnIndex].indexationItem
                .indxItmID
          );

          if (
            IndexationDepend?.indexationItem.indxType == 0 &&
            IndexationDepend?.indexationItem.calculatePrice == 1
          ) {
            for (
              let i = 0;
              i <=
              IndexationDepend.indexationItem.indexationItemDetails.length - 1;
              i++
            ) {
              ItemNumber =
                Number(ItemNumber) +
                Number(
                  this.myForm.get(
                    IndexationDepend.indexationItem.indexationItemDetails[i]
                      .indexationItemDetailID
                  )?.value
                );
            }

            dblsupplyPrice =
              this.strIndexationSiteItem[
                IndexationDependOnIndex
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (IndexationDependOnIndex + 1))?.value
              )?.supplyPrice || 0;
            dblworkmanShipPrice =
              this.strIndexationSiteItem[
                IndexationDependOnIndex
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (IndexationDependOnIndex + 1))?.value
              )?.workmanShipPrice || 0;

            dblItemPrice =
              Number(ItemNumber) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          }

          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

          this.myForm
            .get('P_' + (IndexationDependOnIndex + 1))
            ?.setValue(Math.round(dblItemPrice));
          //==================================
        } else if (
          IndexationDependOn.indexationItem.indxType == 0 &&
          IndexationDependOn.indexationItem.calculatePrice == 8
        ) {
          // =================================
          let ItemNumber: number = 0;
          let IndexationDependOnIndex = this.strIndexationSiteItem.findIndex(
            (b) =>
              b.indexationSiteItemID == IndexationDependOn?.indexationSiteItemID
          );
          dblItemPrice = 0;

          let IndexationDepend = this.strIndexationSiteItem.find(
            (v) =>
              v.indexationItemID ==
              this.strIndexationSiteItem[IndexationDependOnIndex].indexationItem
                .indxItmID
          );

          if (
            IndexationDepend?.indexationItem.indxType == 0 &&
            IndexationDepend?.indexationItem.calculatePrice == 1
          ) {
            for (
              let i = 0;
              i <=
              IndexationDepend.indexationItem.indexationItemDetails.length - 1;
              i++
            ) {
              ItemNumber = this.myForm.get(
                IndexationDepend.indexationItem.indexationItemDetails[i]
                  .indexationItemDetailID
              )?.value;

              dblsupplyPrice =
                this.strIndexationSiteItem[
                  IndexationDependOnIndex
                ].indexationItem.indexationItemDetails
                  .find(
                    (k) =>
                      k.indexationItemDetailID ==
                      this.myForm.get('R_' + (IndexationDependOnIndex + 1))
                        ?.value
                  )
                  ?.indexationItemDetailsPricesM.find(
                    (m) =>
                      m.indexationItemDetailDID ==
                      IndexationDepend?.indexationItem.indexationItemDetails[i]
                        .indexationItemDetailID
                  )?.supplyPrice || 0;
              dblworkmanShipPrice =
                this.strIndexationSiteItem[
                  IndexationDependOnIndex
                ].indexationItem.indexationItemDetails
                  .find(
                    (k) =>
                      k.indexationItemDetailID ==
                      this.myForm.get('R_' + (IndexationDependOnIndex + 1))
                        ?.value
                  )
                  ?.indexationItemDetailsPricesM.find(
                    (m) =>
                      m.indexationItemDetailDID ==
                      IndexationDepend?.indexationItem.indexationItemDetails[i]
                        .indexationItemDetailID
                  )?.workmanShipPrice || 0;

              dblItemPrice =
                Number(dblItemPrice) +
                (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
                  Number(ItemNumber);
            }
          }

          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

          this.myForm
            .get('P_' + (IndexationDependOnIndex + 1))
            ?.setValue(Math.round(dblItemPrice));
          //==================================
        }
      }
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 4
    ) {
      let L =
        this.strSpaceData.find(
          (x) => x.spaceDataID == this.fixForm.get('cSpaceData')?.value
        )?.length || 0;
      let W =
        this.strSpaceData.find(
          (x) => x.spaceDataID == this.fixForm.get('cSpaceData')?.value
        )?.width || 0;

      dblsupplyPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.supplyPrice || 0;
      dblworkmanShipPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.workmanShipPrice || 0;

      dblItemPrice =
        (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) * Number(L * W);

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 2
    ) {
      dblsupplyPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.supplyPrice || 0;
      dblworkmanShipPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.workmanShipPrice || 0;

      dblItemPrice = Number(dblsupplyPrice) + Number(dblworkmanShipPrice);

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط لكل حائط وعددهم 4 حوائط
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 1 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 4
    ) {
      let H = this.GetSpaceHeight(this.fixForm.get('cSpaceData')?.value) || 0;
      let W = this.GetSpaceWidth(this.fixForm.get('cSpaceData')?.value) || 0;
      let L = this.GetSpaceLength(this.fixForm.get('cSpaceData')?.value) || 0;

      for (let i = 0; i <= 3; i++) {
        if (this.myForm.get('R' + (i + 1) + '_' + (Idx + 1))?.value != '') {
          dblsupplyPrice =
            this.strIndexationSiteItem[
              Idx
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R' + (i + 1) + '_' + (Idx + 1))?.value
            )?.supplyPrice || 0;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[
              Idx
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R' + (i + 1) + '_' + (Idx + 1))?.value
            )?.workmanShipPrice || 0;
        } else {
          dblsupplyPrice = 0;
          dblworkmanShipPrice = 0;
        }

        if (i == 0 || i == 1) {
          dblItemPrice =
            Number(dblItemPrice) +
            Number(L * H) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
        } else if (i == 2 || i == 3) {
          dblItemPrice =
            Number(dblItemPrice) +
            Number(W * H) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
        }
      }

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط للابواب
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 3 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 6
    ) {
      let TotalDoorArea: number = 0;

      dblsupplyPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.supplyPrice || 0;
      dblworkmanShipPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.workmanShipPrice || 0;

      this.GetSpaceWindowDoorData(
        this.fixForm.get('cSpaceData')?.value
      )?.forEach((elem) => {
        if (
          elem.flagID.toUpperCase() == 'E93DE226-73A3-4559-EB98-08D9E0649AF0'
        ) {
          TotalDoorArea =
            Number(TotalDoorArea) + Number(elem.height) * Number(elem.length);
        }
      });

      // dblItemPrice =
      //   (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
      //   Number(TotalDoorArea);
      dblItemPrice = Number(dblsupplyPrice) + Number(dblworkmanShipPrice);

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط للشبابيك
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 2 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 5
    ) {
      let TotalWindowArea: number = 0;

      dblsupplyPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.supplyPrice || 0;
      dblworkmanShipPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.workmanShipPrice || 0;

      this.GetSpaceWindowDoorData(
        this.fixForm.get('cSpaceData')?.value
      )?.forEach((elem) => {
        if (
          elem.flagID.toUpperCase() == 'AB5152F9-7035-433D-EB97-08D9E0649AF0'
        ) {
          TotalWindowArea =
            Number(TotalWindowArea) + Number(elem.height) * Number(elem.length);
        }
      });

      dblItemPrice =
        (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
        Number(TotalWindowArea);

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط للاسقف
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 3
    ) {
      let L = this.GetSpaceLength(this.fixForm.get('cSpaceData')?.value) || 0;
      let W = this.GetSpaceWidth(this.fixForm.get('cSpaceData')?.value) || 0;

      dblsupplyPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.supplyPrice || 0;
      dblworkmanShipPrice =
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.workmanShipPrice || 0;

      if (
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.calculatePriceMethod == 1
      ) {
        dblItemPrice =
          Number(L) *
          Number(W) *
          (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
      } else if (
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.calculatePriceMethod == 2
      ) {
        dblItemPrice =
          ((Number(L) * Number(W)) / 2) *
          (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
      } else if (
        this.strIndexationSiteItem[
          Idx
        ].indexationItem.indexationItemDetails.find(
          (x) => x.indexationItemDetailID == IndexationItmID
        )?.calculatePriceMethod == 3
      ) {
        dblItemPrice =
          (Number(L) * 2 + Number(W) * 2) *
          (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
      }

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    }
    // حساب السعر للادخال عن طريق اختيار واحد فقط ومعتمد على بند سابق - تشطيب الكهرباء
    else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 7
    ) {
      let ItemNumber: number = 0;
      let IndexationDepend = this.strIndexationSiteItem.find(
        (v) =>
          v.indexationItemID ==
          this.strIndexationSiteItem[Idx].indexationItem.indxItmID
      );

      if (
        IndexationDepend?.indexationItem.indxType == 0 &&
        IndexationDepend?.indexationItem.calculatePrice == 1
      ) {
        for (
          let i = 0;
          i <= IndexationDepend.indexationItem.indexationItemDetails.length - 1;
          i++
        ) {
          ItemNumber =
            Number(ItemNumber) +
            Number(
              this.myForm.get(
                IndexationDepend.indexationItem.indexationItemDetails[i]
                  .indexationItemDetailID
              )?.value
            );
        }

        dblsupplyPrice =
          this.strIndexationSiteItem[
            Idx
          ].indexationItem.indexationItemDetails.find(
            (x) => x.indexationItemDetailID == IndexationItmID
          )?.supplyPrice || 0;
        dblworkmanShipPrice =
          this.strIndexationSiteItem[
            Idx
          ].indexationItem.indexationItemDetails.find(
            (x) => x.indexationItemDetailID == IndexationItmID
          )?.workmanShipPrice || 0;

        dblItemPrice =
          Number(ItemNumber) *
          (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
      }

      if (sessionStorage.getItem('IsEngSupervision') == '1') {
        if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '8F989BFC-BD95-4289-7851-08D9DAAAC180'
        ) {
          dblsuperVisionPrice =
            (Number(dblItemPrice) *
              Number(sessionStorage.getItem('EngSupervision'))) /
            100;
        } else if (
          sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
          '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
        ) {
          dblsuperVisionPrice = Number(
            sessionStorage.getItem('EngSupervision')
          );
        }
      }

      dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

      this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
    } else if (
      this.strIndexationSiteItem[Idx].indexationItem.indxType == 0 &&
      this.strIndexationSiteItem[Idx].indexationItem.calculatePrice == 8
    ) {
      let ItemNumber: number = 0;
      let IndexationDepend = this.strIndexationSiteItem.find(
        (v) =>
          v.indexationItemID ==
          this.strIndexationSiteItem[Idx].indexationItem.indxItmID
      );

      if (
        IndexationDepend?.indexationItem.indxType == 0 &&
        IndexationDepend?.indexationItem.calculatePrice == 1
      ) {
        for (
          let i = 0;
          i <= IndexationDepend.indexationItem.indexationItemDetails.length - 1;
          i++
        ) {
          ItemNumber = this.myForm.get(
            IndexationDepend.indexationItem.indexationItemDetails[i]
              .indexationItemDetailID
          )?.value;

          dblsupplyPrice =
            this.strIndexationSiteItem[Idx].indexationItem.indexationItemDetails
              .find(
                (k) =>
                  k.indexationItemDetailID ==
                  this.myForm.get('R_' + (Idx + 1))?.value
              )
              ?.indexationItemDetailsPricesM.find(
                (m) =>
                  m.indexationItemDetailDID ==
                  IndexationDepend?.indexationItem.indexationItemDetails[i]
                    .indexationItemDetailID
              )?.supplyPrice || 0;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[Idx].indexationItem.indexationItemDetails
              .find(
                (k) =>
                  k.indexationItemDetailID ==
                  this.myForm.get('R_' + (Idx + 1))?.value
              )
              ?.indexationItemDetailsPricesM.find(
                (m) =>
                  m.indexationItemDetailDID ==
                  IndexationDepend?.indexationItem.indexationItemDetails[i]
                    .indexationItemDetailID
              )?.workmanShipPrice || 0;

          dblItemPrice =
            Number(dblItemPrice) +
            (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
              Number(ItemNumber);
        }

        if (sessionStorage.getItem('IsEngSupervision') == '1') {
          if (
            sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
            '8F989BFC-BD95-4289-7851-08D9DAAAC180'
          ) {
            dblsuperVisionPrice =
              (Number(dblItemPrice) *
                Number(sessionStorage.getItem('EngSupervision'))) /
              100;
          } else if (
            sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
            '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
          ) {
            dblsuperVisionPrice = Number(
              sessionStorage.getItem('EngSupervision')
            );
          }
        }

        dblItemPrice = Number(dblItemPrice) + Number(dblsuperVisionPrice);

        this.myForm.get('P_' + (Idx + 1))?.setValue(Math.round(dblItemPrice));
      }
    }
    this.CalculateIndexationTotal();
  }

  CalculateIndexationTotal() {
    this.dblSpaceDataTotal = 0;
    for (let i = 0; i <= this.strIndexationSiteItem.length - 1; i++) {
      this.dblSpaceDataTotal =
        Number(this.dblSpaceDataTotal) +
        Number(this.myForm.get('P_' + (i + 1))?.value);
    }
    this.fixForm
      .get('cTotalPrice')
      ?.setValue(Math.round(this.dblSpaceDataTotal));
  }

  ClearIndexationItem() {
    this.fixForm.get('cHeight')?.setValue(0);
    this.fixForm.get('cWidth')?.setValue(0);
    this.fixForm.get('cLength')?.setValue(0);

    for (let i = 0; i <= this.strIndexationSiteItem.length - 1; i++) {
      this.myForm.removeControl('P_' + (i + 1));

      if (
        this.strIndexationSiteItem[i].indexationItem.type == 1 &&
        this.strIndexationSiteItem[i].indexationItem.indxType != 1
      ) {
        this.myForm.removeControl('R_' + (i + 1));
      } else if (
        this.strIndexationSiteItem[i].indexationItem.type == 1 &&
        this.strIndexationSiteItem[i].indexationItem.indxType == 1
      ) {
        for (let j = 0; j <= 3; j++) {
          this.myForm.removeControl('R' + (j + 1) + '_' + (i + 1));
        }
      } else if (this.strIndexationSiteItem[i].indexationItem.type == 3) {
        for (
          let j = 0;
          j <=
          this.strIndexationSiteItem[i].indexationItem.indexationItemDetails
            .length -
            1;
          j++
        ) {
          this.myForm.removeControl(
            this.strIndexationSiteItem[i].indexationItem.indexationItemDetails[
              j
            ].indexationItemDetailID
          );
        }
      }
    }
  }

  GetIndexationItem() {
    if (this.fixForm.get('cSpaceData')?.value == 0) {
      this.OpenErrorMessage('إختيار خاطئ');
      this.fixForm.get('cSpaceData')?.setValue(this.strPrevSpaceID);
      return;
    }
    if (
      this.strPrevSpaceID != '' &&
      this.strPrevSpaceID != '0' &&
      this.fixForm.get('cSpaceData')?.value != '0'
    ) {
      // Validate and Save Data
      this.SaveData(this.strPrevSpaceID);
    }

    if (this.fixForm.get('cSpaceData')?.value != 0) {
      this.strPrevSpaceID = this.fixForm.get('cSpaceData')?.value;
    } else if (this.fixForm.get('cSpaceData')?.value == 0) {
      this.strPrevSpaceID = '0';
      this.ClearIndexationItem();
      this.strIndexationSiteItem.length = 0;
      return;
    }

    this.ClearIndexationItem();
    this.strIndexationSiteItem.length = 0;

    this.fixForm
      .get('cHeight')
      ?.setValue(
        this.strSpaceData.find(
          (x) => x.spaceDataID == this.fixForm.get('cSpaceData')?.value
        )?.height || 0
      );
    this.fixForm
      .get('cWidth')
      ?.setValue(
        this.strSpaceData.find(
          (x) => x.spaceDataID == this.fixForm.get('cSpaceData')?.value
        )?.width || 0
      );
    this.fixForm
      .get('cLength')
      ?.setValue(
        this.strSpaceData.find(
          (x) => x.spaceDataID == this.fixForm.get('cSpaceData')?.value
        )?.length || 0
      );

    // Load the Data
    this.Loading = true;
    this.indexationitem
      .getIndexationItemBySpaceDataID(this.fixForm.get('cSpaceData')?.value)
      .subscribe((data) => {
        this.strIndexationSiteItem = data;

        for (let i = 0; i <= this.strIndexationSiteItem.length - 1; i++) {
          this.myForm.addControl('P_' + (i + 1), this.mf.control('0'));

          if (
            this.strIndexationSiteItem[i].indexationItem.type == 1 &&
            this.strIndexationSiteItem[i].indexationItem.indxType != 1
          ) {
            this.myForm.addControl('R_' + (i + 1), this.mf.control(''));
          } else if (
            this.strIndexationSiteItem[i].indexationItem.type == 1 &&
            this.strIndexationSiteItem[i].indexationItem.indxType == 1
          ) {
            for (let j = 0; j <= 3; j++) {
              this.myForm.addControl(
                'R' + (j + 1) + '_' + (i + 1),
                this.mf.control('')
              );
            }
          } else if (this.strIndexationSiteItem[i].indexationItem.type == 3) {
            for (
              let j = 0;
              j <=
              this.strIndexationSiteItem[i].indexationItem.indexationItemDetails
                .length -
                1;
              j++
            ) {
              this.myForm.addControl(
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].indexationItemDetailID,
                this.mf.control('0')
              );
            }
          }
        }
        this.DisplaySpaceData();
      });
  }

  DisplaySpaceData() {
    this.IndxDataMasterService.GetIndexationDataMasterBySpaceID(
      this.fixForm.get('cSpaceData')?.value
    ).subscribe((SavedData) => {
      this.strSavedIndexationDataMaster = SavedData;

      if (
        this.strSavedIndexationDataMaster != null &&
        this.strSavedIndexationDataMaster.length > 0
      ) {
        for (
          let k = 0;
          k <=
          this.strSavedIndexationDataMaster[0].indexationDataDetails.length - 1;
          k++
        ) {
          for (let v = 0; v <= this.strIndexationSiteItem.length - 1; v++) {
            if (
              this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                .indexationItemID ==
              this.strIndexationSiteItem[v].indexationItem.indexationItemID
            ) {
              if (
                this.strIndexationSiteItem[v].indexationItem.indxType == 0 &&
                this.strIndexationSiteItem[v].indexationItem.type == 3
              ) {
                for (
                  let m = 0;
                  m <=
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .indexationDataDetailDs.length -
                    1;
                  m++
                ) {
                  if (
                    this.strIndexationSiteItem[
                      v
                    ].indexationItem.indexationItemDetails.find(
                      (c) =>
                        c.indexationItemDetailID ==
                        this.strSavedIndexationDataMaster[0]
                          .indexationDataDetails[k].indexationDataDetailDs[m]
                          .indexationItemDetailID
                    ) != null
                  ) {
                    this.myForm
                      .get(
                        this.strSavedIndexationDataMaster[0]
                          .indexationDataDetails[k].indexationDataDetailDs[m]
                          .indexationItemDetailID
                      )
                      ?.setValue(
                        this.strSavedIndexationDataMaster[0]
                          .indexationDataDetails[k].indexationDataDetailDs[m]
                          .itemCount
                      );
                  }
                }
              } else if (
                this.strIndexationSiteItem[v].indexationItem.indxType != 1 &&
                this.strIndexationSiteItem[v].indexationItem.type == 1
              ) {
                if (
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .indexationDataDetailDs[0] != null &&
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .indexationDataDetailDs.length > 0
                ) {
                  this.myForm
                    .get('R_' + (v + 1))
                    ?.setValue(
                      this.strSavedIndexationDataMaster[0]
                        .indexationDataDetails[k].indexationDataDetailDs[0]
                        .indexationItemDetailID
                    );
                }
              } else if (
                this.strIndexationSiteItem[v].indexationItem.indxType == 1 &&
                this.strIndexationSiteItem[v].indexationItem.type == 1
              ) {
                if (
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .indexationDataDetailDs != null &&
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .indexationDataDetailDs.length > 0
                ) {
                  for (let c = 0; c <= 3; c++) {
                    this.myForm
                      .get('R' + (c + 1) + '_' + (v + 1))
                      ?.setValue(
                        this.strSavedIndexationDataMaster[0]
                          .indexationDataDetails[k].indexationDataDetailDs[c]
                          .indexationItemDetailID
                      );
                  }
                }
              }

              this.myForm
                .get('P_' + (v + 1))
                ?.setValue(
                  this.strSavedIndexationDataMaster[0].indexationDataDetails[k]
                    .total
                );
            }
          }
        }
      }
    });
    this.Loading = false;
  }

  OpenErrorMessage(strMessage: string) {
    this._snackBar.open(strMessage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  SaveData(SpaceID: string) {
    this.strIndexationDataDetailD.length = 0;
    this.strIndexationDataDetail.length = 0;
    let dblsuperVisionPrice: number = 0;
    let dblItemPrice: number = 0;
    let dblsupplyPrice: number = 0;
    let dblworkmanShipPrice: number = 0;

    for (let i = 0; i <= this.strIndexationSiteItem.length - 1; i++) {
      dblItemPrice = 0;
      dblsupplyPrice = 0;
      dblworkmanShipPrice = 0;
      if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 4
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          let L =
            this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.length ||
            0;
          let W =
            this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.width || 0;

          dblItemPrice =
            (Number(
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice
            ) +
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice
              )) *
            (L * W);

          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            )
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
          } else if (
            sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
            '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
          ) {
            dblsuperVisionPrice = Number(
              sessionStorage.getItem('EngSupervision')
            );
          }
        }

        let newIndexationData = {
          indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
          itemCount: 0,
          supplyPrice:
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.supplyPrice || 0,
          workmanShipPrice:
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.workmanShipPrice || 0,
          superVisionPrice: dblsuperVisionPrice,
          total:
            Number(
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice
            ) +
            Number(
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice
            ) +
            Number(dblsuperVisionPrice),
          indexationDataDetailDPrices: [],
        };
        if (newIndexationData != null) {
          this.strIndexationDataDetailD.push(newIndexationData);
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 2
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                ((Number(
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails.find(
                    (x) =>
                      x.indexationItemDetailID ==
                      this.myForm.get('R_' + (i + 1))?.value
                  )?.supplyPrice
                ) +
                  Number(
                    this.strIndexationSiteItem[
                      i
                    ].indexationItem.indexationItemDetails.find(
                      (x) =>
                        x.indexationItemDetailID ==
                        this.myForm.get('R_' + (i + 1))?.value
                    )?.workmanShipPrice
                  )) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          let newIndexationData = {
            indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
            itemCount: 0,
            supplyPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice || 0,
            workmanShipPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice || 0,
            superVisionPrice: dblsuperVisionPrice,
            total:
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.supplyPrice
              ) +
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice
              ) +
              Number(dblsuperVisionPrice),
            indexationDataDetailDPrices: [],
          };
          if (newIndexationData != null) {
            this.strIndexationDataDetailD.push(newIndexationData);
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 1 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 4
      ) {
        let H = this.GetSpaceHeight(SpaceID) || 0;
        let W = this.GetSpaceWidth(SpaceID) || 0;
        let L = this.GetSpaceLength(SpaceID) || 0;
        for (let j = 0; j <= 3; j++) {
          if (this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value != '') {
            dblsupplyPrice =
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
              )?.supplyPrice || 0;
            dblworkmanShipPrice =
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
              )?.workmanShipPrice || 0;
          } else {
            dblsupplyPrice = 0;
            dblworkmanShipPrice = 0;
          }

          if (j == 0 || j == 1) {
            dblItemPrice =
              // Number(dblItemPrice) +
              Number(L * H) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          } else if (j == 2 || j == 3) {
            dblItemPrice =
              // Number(dblItemPrice) +
              Number(W * H) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          }

          //====================================================
          if (this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value != '') {
            if (sessionStorage.getItem('IsEngSupervision') == '1') {
              if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '8F989BFC-BD95-4289-7851-08D9DAAAC180'
              ) {
                dblsuperVisionPrice =
                  (Number(dblItemPrice) *
                    Number(sessionStorage.getItem('EngSupervision'))) /
                  100;
              } else if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
              ) {
                dblsuperVisionPrice = Number(
                  sessionStorage.getItem('EngSupervision')
                );
              }
            }

            let newIndexationData = {
              indexationItemDetailID: this.myForm.get(
                'R' + (j + 1) + '_' + (i + 1)
              )?.value,
              itemCount: 0,
              supplyPrice:
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
                )?.supplyPrice || 0,
              workmanShipPrice:
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
                )?.workmanShipPrice || 0,
              superVisionPrice: dblsuperVisionPrice,
              total:
                Number(
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails.find(
                    (x) =>
                      x.indexationItemDetailID ==
                      this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
                  )?.supplyPrice
                ) +
                Number(
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails.find(
                    (x) =>
                      x.indexationItemDetailID ==
                      this.myForm.get('R' + (j + 1) + '_' + (i + 1))?.value
                  )?.workmanShipPrice
                ) +
                Number(dblsuperVisionPrice),
              indexationDataDetailDPrices: [],
            };
            if (newIndexationData != null) {
              this.strIndexationDataDetailD.push(newIndexationData);
            }
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 3 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 6
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          let TotalDoorArea: number = 0;

          dblsupplyPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.supplyPrice || 0;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.workmanShipPrice || 0;

          this.GetSpaceWindowDoorData(SpaceID)?.forEach((elem) => {
            if (
              elem.flagID.toUpperCase() ==
              'E93DE226-73A3-4559-EB98-08D9E0649AF0'
            ) {
              TotalDoorArea =
                Number(TotalDoorArea) +
                Number(elem.height) * Number(elem.length);
            }
          });

          // dblItemPrice =
          //   (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
          //   Number(TotalDoorArea);
          dblItemPrice = Number(dblsupplyPrice) + Number(dblworkmanShipPrice);

          //===================================
          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          let newIndexationData = {
            indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
            itemCount: 0,
            supplyPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice || 0,
            workmanShipPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice || 0,
            superVisionPrice: dblsuperVisionPrice,
            total:
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.supplyPrice
              ) +
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice
              ) +
              Number(dblsuperVisionPrice),
            indexationDataDetailDPrices: [],
          };
          if (newIndexationData != null) {
            this.strIndexationDataDetailD.push(newIndexationData);
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 2 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 5
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          let TotalWindowArea: number = 0;

          dblsupplyPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.supplyPrice || 0;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.workmanShipPrice || 0;

          this.GetSpaceWindowDoorData(SpaceID)?.forEach((elem) => {
            if (
              elem.flagID.toUpperCase() ==
              'AB5152F9-7035-433D-EB97-08D9E0649AF0'
            ) {
              TotalWindowArea =
                Number(TotalWindowArea) +
                Number(elem.height) * Number(elem.length);
            }
          });

          dblItemPrice =
            (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
            Number(TotalWindowArea);

          //============================================================
          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          let newIndexationData = {
            indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
            itemCount: 0,
            supplyPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice || 0,
            workmanShipPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice || 0,
            superVisionPrice: dblsuperVisionPrice,
            total:
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.supplyPrice
              ) +
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice
              ) +
              Number(dblsuperVisionPrice),
            indexationDataDetailDPrices: [],
          };
          if (newIndexationData != null) {
            this.strIndexationDataDetailD.push(newIndexationData);
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 3
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          let L = this.GetSpaceLength(SpaceID) || 0;
          let W = this.GetSpaceWidth(SpaceID) || 0;

          dblsupplyPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.supplyPrice || 0;
          dblworkmanShipPrice =
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.workmanShipPrice || 0;

          if (
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.calculatePriceMethod == 1
          ) {
            dblItemPrice =
              Number(L) *
              Number(W) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          } else if (
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.calculatePriceMethod == 2
          ) {
            dblItemPrice =
              ((Number(L) * Number(W)) / 2) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          } else if (
            this.strIndexationSiteItem[
              i
            ].indexationItem.indexationItemDetails.find(
              (x) =>
                x.indexationItemDetailID ==
                this.myForm.get('R_' + (i + 1))?.value
            )?.calculatePriceMethod == 3
          ) {
            dblItemPrice =
              (Number(L) * 2 + Number(W) * 2) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));
          }

          //====================================================================
          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblItemPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          let newIndexationData = {
            indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
            itemCount: 0,
            supplyPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice || 0,
            workmanShipPrice:
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice || 0,
            superVisionPrice: dblsuperVisionPrice,
            total:
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.supplyPrice
              ) +
              Number(
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice
              ) +
              Number(dblsuperVisionPrice),
            indexationDataDetailDPrices: [],
          };
          if (newIndexationData != null) {
            this.strIndexationDataDetailD.push(newIndexationData);
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 7
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          let ItemNumber: number = 0;
          let IndexationDepend = this.strIndexationSiteItem.find(
            (v) =>
              v.indexationItemID ==
              this.strIndexationSiteItem[i].indexationItem.indxItmID
          );

          if (
            IndexationDepend?.indexationItem.indxType == 0 &&
            IndexationDepend?.indexationItem.calculatePrice == 1
          ) {
            for (
              let j = 0;
              j <=
              IndexationDepend.indexationItem.indexationItemDetails.length - 1;
              j++
            ) {
              ItemNumber =
                Number(ItemNumber) +
                Number(
                  this.myForm.get(
                    IndexationDepend.indexationItem.indexationItemDetails[j]
                      .indexationItemDetailID
                  )?.value
                );
            }

            dblsupplyPrice =
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.supplyPrice || 0;
            dblworkmanShipPrice =
              this.strIndexationSiteItem[
                i
              ].indexationItem.indexationItemDetails.find(
                (x) =>
                  x.indexationItemDetailID ==
                  this.myForm.get('R_' + (i + 1))?.value
              )?.workmanShipPrice || 0;

            dblItemPrice =
              Number(ItemNumber) *
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice));

            //=======================================================================
            if (sessionStorage.getItem('IsEngSupervision') == '1') {
              if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '8F989BFC-BD95-4289-7851-08D9DAAAC180'
              ) {
                dblsuperVisionPrice =
                  (Number(dblItemPrice) *
                    Number(sessionStorage.getItem('EngSupervision'))) /
                  100;
              } else if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
              ) {
                dblsuperVisionPrice = Number(
                  sessionStorage.getItem('EngSupervision')
                );
              }
            }

            let newIndexationData = {
              indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
              itemCount: ItemNumber,
              supplyPrice:
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.supplyPrice || 0,
              workmanShipPrice:
                this.strIndexationSiteItem[
                  i
                ].indexationItem.indexationItemDetails.find(
                  (x) =>
                    x.indexationItemDetailID ==
                    this.myForm.get('R_' + (i + 1))?.value
                )?.workmanShipPrice || 0,
              superVisionPrice: dblsuperVisionPrice,
              total:
                Number(
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails.find(
                    (x) =>
                      x.indexationItemDetailID ==
                      this.myForm.get('R_' + (i + 1))?.value
                  )?.supplyPrice
                ) +
                Number(
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails.find(
                    (x) =>
                      x.indexationItemDetailID ==
                      this.myForm.get('R_' + (i + 1))?.value
                  )?.workmanShipPrice
                ) +
                Number(dblsuperVisionPrice),
              indexationDataDetailDPrices: [],
            };
            if (newIndexationData != null) {
              this.strIndexationDataDetailD.push(newIndexationData);
            }
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 8
      ) {
        if (this.myForm.get('R_' + (i + 1))?.value != '') {
          this.strIndexationDataDetailDPrice = [];
          let ItemNumber: number = 0;
          let IndexationDepend = this.strIndexationSiteItem.find(
            (v) =>
              v.indexationItemID ==
              this.strIndexationSiteItem[i].indexationItem.indxItmID
          );

          if (
            IndexationDepend?.indexationItem.indxType == 0 &&
            IndexationDepend?.indexationItem.calculatePrice == 1
          ) {
            for (
              let j = 0;
              j <=
              IndexationDepend.indexationItem.indexationItemDetails.length - 1;
              j++
            ) {
              // Check on the Item Count
              if (
                this.myForm.get(
                  IndexationDepend.indexationItem.indexationItemDetails[j]
                    .indexationItemDetailID
                )?.value != '' &&
                this.myForm.get(
                  IndexationDepend.indexationItem.indexationItemDetails[j]
                    .indexationItemDetailID
                )?.value > 0
              ) {
                ItemNumber = this.myForm.get(
                  IndexationDepend.indexationItem.indexationItemDetails[j]
                    .indexationItemDetailID
                )?.value;

                dblsupplyPrice =
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails
                    .find(
                      (k) =>
                        k.indexationItemDetailID ==
                        this.myForm.get('R_' + (i + 1))?.value
                    )
                    ?.indexationItemDetailsPricesM.find(
                      (m) =>
                        m.indexationItemDetailDID ==
                        IndexationDepend?.indexationItem.indexationItemDetails[
                          j
                        ].indexationItemDetailID
                    )?.supplyPrice || 0;
                dblworkmanShipPrice =
                  this.strIndexationSiteItem[
                    i
                  ].indexationItem.indexationItemDetails
                    .find(
                      (k) =>
                        k.indexationItemDetailID ==
                        this.myForm.get('R_' + (i + 1))?.value
                    )
                    ?.indexationItemDetailsPricesM.find(
                      (m) =>
                        m.indexationItemDetailDID ==
                        IndexationDepend?.indexationItem.indexationItemDetails[
                          j
                        ].indexationItemDetailID
                    )?.workmanShipPrice || 0;

                dblItemPrice =
                  // Number(dblItemPrice) +
                  (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
                  Number(ItemNumber);

                //========================================================
                if (sessionStorage.getItem('IsEngSupervision') == '1') {
                  if (
                    sessionStorage
                      .getItem('EngSupervisionTypeID')
                      ?.toUpperCase() == '8F989BFC-BD95-4289-7851-08D9DAAAC180'
                  ) {
                    dblsuperVisionPrice =
                      (Number(dblItemPrice) *
                        Number(sessionStorage.getItem('EngSupervision'))) /
                      100;
                  } else if (
                    sessionStorage
                      .getItem('EngSupervisionTypeID')
                      ?.toUpperCase() == '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
                  ) {
                    dblsuperVisionPrice = Number(
                      sessionStorage.getItem('EngSupervision')
                    );
                  }
                }

                let newIndexationDatasPrice = {
                  indexationItemDetailID:
                    IndexationDepend.indexationItem.indexationItemDetails[j]
                      .indexationItemDetailID,
                  supplyPrice:
                    this.strIndexationSiteItem[
                      i
                    ].indexationItem.indexationItemDetails
                      .find(
                        (k) =>
                          k.indexationItemDetailID ==
                          this.myForm.get('R_' + (i + 1))?.value
                      )
                      ?.indexationItemDetailsPricesM.find(
                        (m) =>
                          m.indexationItemDetailDID ==
                          IndexationDepend?.indexationItem
                            .indexationItemDetails[j].indexationItemDetailID
                      )?.supplyPrice || 0,
                  workmanShipPrice:
                    this.strIndexationSiteItem[
                      i
                    ].indexationItem.indexationItemDetails
                      .find(
                        (k) =>
                          k.indexationItemDetailID ==
                          this.myForm.get('R_' + (i + 1))?.value
                      )
                      ?.indexationItemDetailsPricesM.find(
                        (m) =>
                          m.indexationItemDetailDID ==
                          IndexationDepend?.indexationItem
                            .indexationItemDetails[j].indexationItemDetailID
                      )?.workmanShipPrice || 0,
                  superVisionPrice: dblsuperVisionPrice,
                };
                this.strIndexationDataDetailDPrice.push(
                  newIndexationDatasPrice
                );
              }
            }

            let newIndexationData = {
              indexationItemDetailID: this.myForm.get('R_' + (i + 1))?.value,
              itemCount: 0,
              supplyPrice: 0,
              workmanShipPrice: 0,
              superVisionPrice: 0,
              total: 0,
              indexationDataDetailDPrices: this.strIndexationDataDetailDPrice,
            };
            if (newIndexationData != null) {
              this.strIndexationDataDetailD.push(newIndexationData);
            }
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 1 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 2
      ) {
        if (this.IsDisplayWall == '1') {
          let H: number =
            this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.height ||
            0;
          let L =
            this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.length ||
            0;
          let W =
            this.strSpaceData.find((x) => x.spaceDataID == SpaceID)?.width || 0;
          let TotalDoorArea: number = 0;

          this.GetSpaceWindowDoorData(SpaceID)?.forEach((elem) => {
            if (
              elem.flagID.toUpperCase() ==
              'E93DE226-73A3-4559-EB98-08D9E0649AF0'
            ) {
              TotalDoorArea =
                Number(TotalDoorArea) +
                Number(elem.height) * Number(elem.length);
            }
          });

          this.GetSpaceWindowDoorData(SpaceID)?.forEach((elem) => {
            if (
              elem.flagID.toUpperCase() ==
              'AB5152F9-7035-433D-EB97-08D9E0649AF0'
            ) {
              TotalDoorArea =
                Number(TotalDoorArea) +
                Number(elem.height) * Number(elem.length);
            }
          });

          let dblPrice =
            (this.strIndexationSiteItem[i].indexationItem
              .indexationItemDetails[0].supplyPrice +
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[0].workmanShipPrice) *
            (L * H * 2 + W * H * 2 - TotalDoorArea);

          //=========================================================
          if (sessionStorage.getItem('IsEngSupervision') == '1') {
            if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '8F989BFC-BD95-4289-7851-08D9DAAAC180'
            ) {
              dblsuperVisionPrice =
                (Number(dblPrice) *
                  Number(sessionStorage.getItem('EngSupervision'))) /
                100;
            } else if (
              sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
              '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
            ) {
              dblsuperVisionPrice = Number(
                sessionStorage.getItem('EngSupervision')
              );
            }
          }

          let newIndexationData = {
            indexationItemDetailID:
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[0].indexationItemDetailID,
            itemCount: 0,
            supplyPrice:
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[0].supplyPrice || 0,
            workmanShipPrice:
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[0].workmanShipPrice || 0,
            superVisionPrice: dblsuperVisionPrice,
            total:
              Number(
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[0].supplyPrice
              ) +
              Number(
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[0].workmanShipPrice
              ) +
              Number(dblsuperVisionPrice),
            indexationDataDetailDPrices: [],
          };
          if (newIndexationData != null) {
            this.strIndexationDataDetailD.push(newIndexationData);
          }
        }
      } else if (
        this.strIndexationSiteItem[i].indexationItem.indxType == 0 &&
        this.strIndexationSiteItem[i].indexationItem.calculatePrice == 1
      ) {
        for (
          let j = 0;
          j <=
          this.strIndexationSiteItem[i].indexationItem.indexationItemDetails
            .length -
            1;
          j++
        ) {
          if (
            this.myForm.get(
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[j].indexationItemDetailID
            )?.value != '' &&
            this.myForm.get(
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[j].indexationItemDetailID
            )?.value > 0 &&
            isNaN(
              this.myForm.get(
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].indexationItemDetailID
              )?.value
            ) == false
          ) {
            dblsupplyPrice =
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[j].supplyPrice;
            dblworkmanShipPrice =
              this.strIndexationSiteItem[i].indexationItem
                .indexationItemDetails[j].workmanShipPrice;
            dblItemPrice =
              (Number(dblsupplyPrice) + Number(dblworkmanShipPrice)) *
              Number(
                this.myForm.get(
                  this.strIndexationSiteItem[i].indexationItem
                    .indexationItemDetails[j].indexationItemDetailID
                )?.value
              );

            //================================================
            if (sessionStorage.getItem('IsEngSupervision') == '1') {
              if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '8F989BFC-BD95-4289-7851-08D9DAAAC180'
              ) {
                dblsuperVisionPrice =
                  (Number(dblItemPrice) *
                    Number(sessionStorage.getItem('EngSupervision'))) /
                  100;
              } else if (
                sessionStorage.getItem('EngSupervisionTypeID')?.toUpperCase() ==
                '9E46104A-F9C1-4B7D-7850-08D9DAAAC180'
              ) {
                dblsuperVisionPrice = Number(
                  sessionStorage.getItem('EngSupervision')
                );
              }
            }

            let newIndexationData = {
              indexationItemDetailID:
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].indexationItemDetailID,
              itemCount: this.myForm.get(
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].indexationItemDetailID
              )?.value,
              supplyPrice:
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].supplyPrice,
              workmanShipPrice:
                this.strIndexationSiteItem[i].indexationItem
                  .indexationItemDetails[j].workmanShipPrice,
              superVisionPrice: dblsuperVisionPrice,
              total:
                Number(
                  this.strIndexationSiteItem[i].indexationItem
                    .indexationItemDetails[j].supplyPrice
                ) +
                Number(
                  this.strIndexationSiteItem[i].indexationItem
                    .indexationItemDetails[j].workmanShipPrice
                ) +
                Number(dblsuperVisionPrice),
              indexationDataDetailDPrices: [],
            };
            if (newIndexationData != null) {
              this.strIndexationDataDetailD.push(newIndexationData);
            }
          }
        }
      }

      //==========================================================
      if (this.myForm.get('P_' + (i + 1))?.value != 0) {
        let newIndexationDataDetailDForEveryItem =
          this.strIndexationDataDetailD;

        let newIndxDataDetail = {
          indexationItemID:
            this.strIndexationSiteItem[i].indexationItem.indexationItemID,
          total: this.myForm.get('P_' + (i + 1))?.value,
          indexationDataDetailDs: newIndexationDataDetailDForEveryItem,
        };

        this.strIndexationDataDetail.push(newIndxDataDetail);
      }

      this.strIndexationDataDetailD = [];
    }

    let newIndxDataMaster = {
      siteDataID: sessionStorage.getItem('SiteDataID'),
      spaceID: SpaceID,
      total: this.fixForm.get('cTotalPrice')?.value,
      indexationDataDetails: this.strIndexationDataDetail,
    };

    // Save Data
    this.Loading = true;
    this.IndxDataMasterService.AddIndexationDataMaster(
      newIndxDataMaster
    ).subscribe((res) => {
      this.Loading = false;
    });
  }

  getThirdStepData() {
    this.SaveData(this.fixForm.get('cSpaceData')?.value);
    this.route.navigate(['/Indexation/StepFour']);
  }
}
