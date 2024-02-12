import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatStepperHeaderComponent } from './custom-mat-stepper-header.component';

describe('CustomMatStepperHeaderComponent', () => {
  let component: CustomMatStepperHeaderComponent;
  let fixture: ComponentFixture<CustomMatStepperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatStepperHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatStepperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
