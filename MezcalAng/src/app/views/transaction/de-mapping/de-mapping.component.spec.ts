import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemappingComponent } from './de-mapping.component';

describe('DemappingComponent', () => {
  let component: DemappingComponent;
  let fixture: ComponentFixture<DemappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
