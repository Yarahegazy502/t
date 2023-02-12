import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDesignOfferComponent } from './show-design-offer.component';

describe('ShowDesignOfferComponent', () => {
  let component: ShowDesignOfferComponent;
  let fixture: ComponentFixture<ShowDesignOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDesignOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDesignOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
