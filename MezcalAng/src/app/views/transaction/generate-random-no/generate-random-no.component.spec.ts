import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRandomNoComponent } from './generate-random-no.component';

describe('GenerateRandomNoComponent', () => {
  let component: GenerateRandomNoComponent;
  let fixture: ComponentFixture<GenerateRandomNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateRandomNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateRandomNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
