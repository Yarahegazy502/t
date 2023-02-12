import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSideBarComponent } from './new-side-bar.component';

describe('NewSideBarComponent', () => {
  let component: NewSideBarComponent;
  let fixture: ComponentFixture<NewSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
