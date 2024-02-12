import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatStepComponent } from './custom-mat-step.component';

describe('CustomMatStepComponent', () => {
  let component: CustomMatStepComponent;
  let fixture: ComponentFixture<CustomMatStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
