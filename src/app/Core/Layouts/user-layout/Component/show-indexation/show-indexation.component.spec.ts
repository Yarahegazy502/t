import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIndexationComponent } from './show-indexation.component';

describe('ShowIndexationComponent', () => {
  let component: ShowIndexationComponent;
  let fixture: ComponentFixture<ShowIndexationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIndexationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIndexationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
