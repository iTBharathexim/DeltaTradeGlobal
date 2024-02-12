import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatStepperComponent } from './custom-mat-stepper.component';

describe('CustomMatStepperComponent', () => {
  let component: CustomMatStepperComponent;
  let fixture: ComponentFixture<CustomMatStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
