import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getDashClass(collapsed:boolean,screenWidth:any,toggleSideMenu:boolean): string {
    let styleClass = '';
    if (collapsed && screenWidth > 768 && !toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (collapsed && screenWidth <= 768 && screenWidth > 0 && !toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }

}
