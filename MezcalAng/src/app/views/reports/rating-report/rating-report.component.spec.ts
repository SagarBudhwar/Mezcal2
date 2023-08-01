import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReportComponent } from './rating-report.component';

describe('RatingReportComponent', () => {
  let component: RatingReportComponent;
  let fixture: ComponentFixture<RatingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
