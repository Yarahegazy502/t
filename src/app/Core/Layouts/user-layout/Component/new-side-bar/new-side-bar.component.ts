import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { menuList } from '../menu-list';

@Component({
  selector: 'app-new-side-bar',
  templateUrl: './new-side-bar.component.html',
  styleUrls: ['./new-side-bar.component.scss']
})
export class NewSideBarComponent implements OnInit {
  collapsed: boolean = false;
  screenWidth: any = 0;

  showSideMenu:boolean=true;
  rotated: boolean = false;
  show: boolean = false;
  menuList: any = menuList;

  @Output() onToggleSideNav: EventEmitter<any> = new EventEmitter();
  constructor(private sharedService: SharedService,
    private router:Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.sharedService.showSideMenu.subscribe((res:any)=>{
      this.showSideMenu=res;
      console.log(res);
    })
  }

  handelClick(item: any) {
    this.menuList.forEach((ele: any) => {
      ele.state = ele.state;
      // ele.state=false
    });
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

  logout():void {
    this.router.navigate(['/auth']);
    localStorage.clear()
  }

}
