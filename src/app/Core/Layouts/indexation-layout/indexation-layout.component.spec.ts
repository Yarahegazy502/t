import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexationLayoutComponent } from './indexation-layout.component';

describe('IndexationLayoutComponent', () => {
  let component: IndexationLayoutComponent;
  let fixture: ComponentFixture<IndexationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexationLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
