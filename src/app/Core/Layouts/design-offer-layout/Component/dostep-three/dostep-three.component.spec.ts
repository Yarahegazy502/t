import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOStepThreeComponent } from './dostep-three.component';

describe('DOStepThreeComponent', () => {
  let component: DOStepThreeComponent;
  let fixture: ComponentFixture<DOStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOStepThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DOStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
