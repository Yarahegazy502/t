import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignOfferLayoutComponent } from './design-offer-layout.component';

describe('DesignOfferLayoutComponent', () => {
  let component: DesignOfferLayoutComponent;
  let fixture: ComponentFixture<DesignOfferLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignOfferLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignOfferLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
