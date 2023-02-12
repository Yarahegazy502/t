import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  constructor(private elementRef : ElementRef) { }

  ngOnInit(): void {
    this.loadScript();
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
    // link.href = 'assets/css/themify-icons.css';
    link.media = 'all';

    head.appendChild(link);

  // Include javascript files
  var s = document.createElement("script");

  s.type = "text/javascript";
  s.src = "assets/js/respond.min.js";
  s.src = "assets/js/jquery-ui.js";
  s.src = "assets/js/plugins.js";
  s.src = "assets/js/D-topiaCoreValues.js";
  s.src = "assets/js/html5shiv.min.js";

  this.elementRef.nativeElement.appendChild(s);
}

}
