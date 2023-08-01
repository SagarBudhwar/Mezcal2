import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationReportComponent } from './verification-report.component';

describe('VerificationReportComponent', () => {
  let component: VerificationReportComponent;
  let fixture: ComponentFixture<VerificationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
