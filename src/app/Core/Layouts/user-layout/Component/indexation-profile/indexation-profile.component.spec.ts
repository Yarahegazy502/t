import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationProfileComponent } from './indexation-profile.component';

describe('IndexationProfileComponent', () => {
  let component: IndexationProfileComponent;
  let fixture: ComponentFixture<IndexationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexationProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
