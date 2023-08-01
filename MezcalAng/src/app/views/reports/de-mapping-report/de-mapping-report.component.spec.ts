import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeMappingReportComponent } from './de-mapping-report.component';

describe('ProductDeMappingReportComponent', () => {
  let component: ProductDeMappingReportComponent;
  let fixture: ComponentFixture<ProductDeMappingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDeMappingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeMappingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
