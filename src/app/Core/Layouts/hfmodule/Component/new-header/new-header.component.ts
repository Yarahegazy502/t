import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/Shared/Services/dashboard.service';
import { SharedService } from 'src/app/Shared/Services/shared.service';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss']
})
export class NewHeaderComponent implements OnInit {
  toggleSideMenu: boolean = false;
  isShow: boolean = false;

  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;

  IsLogin: boolean = false;
  UserName: string = '';
  isUserModule: boolean = false;
  // toggleSideMenu: boolean = false;
  // isShow:boolean=false;

  // @Input() collapsed: boolean = false;
  // @Input() screenWidth: any = 0;

  // constructor(private dashboardService: DashboardService,
  //             private sharedService: SharedService) { }

  constructor(private route: Router,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.isUserModule = this.route?.url?.includes('User');
    console.log(this.route?.url?.includes('User'))
    // if (window?.innerWidth < 700) {
    //   this.toggleSideMenu = true
    //   this.sharedService.showSideMenu.next(true)
    // }

    this.loadScript();

    if (sessionStorage.getItem('UserID') != null) {
      this.IsLogin = true;
      this.UserName = sessionStorage.getItem('UserName') || '';
    } else {
      this.IsLogin = false;
      this.UserName = '';
    }
  }

  loadScript() {
    // Include CSS files
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');

    link.id = 'pattern';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    // link.href = 'assets/css/all.min.css';
    link.href = 'assets/css/index.css';
    // link.href = 'assets/css/media.css';
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

  GotoProfile() {
    this.route.navigate(['/User/EditProfile']);
  }

  GotoLogin() {
    this.route.navigate(['/Auth/Login']);
  }

  GotoMain() {
    this.route.navigate(['/Main/Home']);
  }

  GotoIndexation() {
    this.route.navigate(['/Indexation/StepOne']);
  }

  GotoDesignOffer() {
    this.route.navigate(['/DesignOffer/DOStepOne']);
  }

  LogOut() {
    sessionStorage.removeItem('UserID');
    sessionStorage.removeItem('UserName');
    this.route.navigate(['/Auth/Logout']);
  }

  // getDashClass(): string {
  //   let styleClass = '';
  //   if (this.collapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
  //     styleClass = 'dash-trimmed';
  //   } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
  //     styleClass = 'dash-md-screen';
  //   }
  //   return styleClass;
  // }

  // toggleSide(): void {
  //   this.toggleSideMenu = !this.toggleSideMenu;
  //   this.sharedService.showSideMenu.next(this.toggleSideMenu)
  // }

  // show(){
  //   this.isShow=!this.isShow
  // }


  getDashClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }

  toggleSide(): void {
    this.toggleSideMenu = !this.toggleSideMenu;
  }

  show() {
    this.isShow = !this.isShow
  }

}
