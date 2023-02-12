import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignOfferProfileComponent } from './design-offer-profile.component';

describe('DesignOfferProfileComponent', () => {
  let component: DesignOfferProfileComponent;
  let fixture: ComponentFixture<DesignOfferProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignOfferProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignOfferProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
