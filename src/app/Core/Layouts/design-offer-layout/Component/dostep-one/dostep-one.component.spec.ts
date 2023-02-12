import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOStepOneComponent } from './dostep-one.component';

describe('DOStepOneComponent', () => {
  let component: DOStepOneComponent;
  let fixture: ComponentFixture<DOStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOStepOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DOStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
