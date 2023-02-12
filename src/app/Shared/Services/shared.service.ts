import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  showSideMenu=new BehaviorSubject<boolean>(false);
  urlData=new BehaviorSubject<boolean>(false);
  moduleType=new BehaviorSubject<string>('');

  
  constructor() { }

  ngOnInit(): void {

  }
}
