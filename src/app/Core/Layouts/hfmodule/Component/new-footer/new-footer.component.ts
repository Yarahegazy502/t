import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Shared/Services/shared.service';

@Component({
  selector: 'app-new-footer',
  templateUrl: './new-footer.component.html',
  styleUrls: ['./new-footer.component.scss']
})
export class NewFooterComponent implements OnInit {

  toggleSideMenu: boolean = false;
  moduleType: string = '';

  @Input() collapsed: boolean = false;
  @Input() screenWidth: any = 0;

  isUserModule: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.loadScript();
    this.isUserModule = this.route?.url?.includes('User');
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

  getDashClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768 && !this.toggleSideMenu) {
      styleClass = 'dash-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && !this.toggleSideMenu) {
      styleClass = 'dash-md-screen';
    }
    return styleClass;
  }

}
