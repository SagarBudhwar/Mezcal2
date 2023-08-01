import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDamageComponent } from './damage.component';

describe('ProductDamageComponent', () => {
  let component: ProductDamageComponent;
  let fixture: ComponentFixture<ProductDamageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDamageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
