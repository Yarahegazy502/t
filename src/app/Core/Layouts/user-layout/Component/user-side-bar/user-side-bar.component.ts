import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-side-bar',
  templateUrl: './user-side-bar.component.html',
  styleUrls: ['./user-side-bar.component.scss']
})
export class UserSideBarComponent implements OnInit {

  collapsed: boolean = false;
  screenWidth: any = 0;

  showSideMenu: boolean = true;
  rotated: boolean = false;
  show: boolean = false;

  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.openNav();
  }

  closeNav() {
    var openbtn: HTMLElement | null = document.getElementById('openbtn');
    if (openbtn != null) {
      openbtn.style.display = "block";
    }

    var closebtn: HTMLElement | null = document.getElementById('closebtn');
    if (closebtn != null) {
      closebtn.style.display = "none";
    }

    var mySidebar: HTMLElement | null = document.getElementById('mySidebar');
    if (mySidebar != null) {
      mySidebar.style.width = "48px";
    }

    var rows: HTMLElement | null = document.getElementById('rows');
    if (rows != null) {
      rows.style.marginLeft = "48px";
    }

    var h4title: HTMLElement | null = document.getElementById('h4-title');
    if (h4title != null) {
      h4title.style.marginLeft = "48px";
    }
  }

  openNav() {
    var Openbtn: HTMLElement | null = document.getElementById('openbtn');
    if (Openbtn != null) {
      Openbtn.style.display = "none";
    }

    var closebtn: HTMLElement | null = document.getElementById('closebtn');
    if (closebtn != null) {
      closebtn.style.display = 'block';
    }

    var mySidebar: HTMLElement | null = document.getElementById('mySidebar');
    if (mySidebar != null) {
      mySidebar.style.width = '250px';
    }

    var rows: HTMLElement | null = document.getElementById('rows');
    if (rows != null) {
      rows.style.marginLeft = '250px';
    }

    var h4title: HTMLElement | null = document.getElementById('h4-title');
    if (h4title != null) {
      h4title.style.marginLeft = '250px';
    }
  }




  handelClick(item: any) {

    //  item.state=true
    item.state = !item.state
    // let index=this.menuList[item];
    //     // index.state = !index.state;
    //     index.state=true
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.rotate();
    this.show = !this.show
  }

  toggleIcon(): void {
    this.collapsed = true
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.show = !this.show
  }

  rotate(): void {
    this.rotated = !this.rotated
  }




}
