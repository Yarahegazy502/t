import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Shared/Services/shared.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  isSideNavCollapsed: boolean = false;
  screenWidth: number = 0;
  toggleSideMenu: boolean = false;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.showSideMenu.subscribe((res: any) => {
      this.toggleSideMenu = res
    })
  }

  onToggleSideNav(data: any): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  getDashClass(): string {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }
}
