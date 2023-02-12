import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpaceOrBandComponent } from './delete-space-or-band.component';

describe('DeleteSpaceOrBandComponent', () => {
  let component: DeleteSpaceOrBandComponent;
  let fixture: ComponentFixture<DeleteSpaceOrBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpaceOrBandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpaceOrBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
