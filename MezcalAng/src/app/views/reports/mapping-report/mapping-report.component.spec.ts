import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMappingReportComponent } from './mapping-report.component';

describe('ProductMappingReportComponent', () => {
  let component: ProductMappingReportComponent;
  let fixture: ComponentFixture<ProductMappingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMappingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMappingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
