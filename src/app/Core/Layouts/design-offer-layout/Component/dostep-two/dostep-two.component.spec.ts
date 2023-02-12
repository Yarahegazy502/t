import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOStepTwoComponent } from './dostep-two.component';

describe('DOStepTwoComponent', () => {
  let component: DOStepTwoComponent;
  let fixture: ComponentFixture<DOStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOStepTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DOStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
