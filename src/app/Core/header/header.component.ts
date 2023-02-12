import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  IsLogin: boolean = false;
  UserName: string = '';

  // toggleSideMenu: boolean = false;
  // isShow:boolean=false;

  // @Input() collapsed: boolean = false;
  // @Input() screenWidth: any = 0;

  constructor(private route: Router,
              private elementRef : ElementRef
              // private dashboardService: DashboardService,
              // private sharedService: SharedService
              ) {}

  ngOnInit(): void {
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

   loadScript(){
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

  GotoProfile() {
    this.route.navigate(['/User/Profile']);
  }

  LogOut() {
    sessionStorage.removeItem('UserID');
    sessionStorage.removeItem('UserName');
    this.route.navigate(['/Auth/Logout']);
  }
}
