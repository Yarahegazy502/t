import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSponsersComponent } from './main-sponsers.component';

describe('MainSponsersComponent', () => {
  let component: MainSponsersComponent;
  let fixture: ComponentFixture<MainSponsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSponsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSponsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
