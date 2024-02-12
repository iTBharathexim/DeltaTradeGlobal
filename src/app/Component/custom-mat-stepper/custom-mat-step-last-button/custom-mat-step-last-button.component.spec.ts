import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatStepLastButtonComponent } from './custom-mat-step-last-button.component';

describe('CustomMatStepLastButtonComponent', () => {
  let component: CustomMatStepLastButtonComponent;
  let fixture: ComponentFixture<CustomMatStepLastButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatStepLastButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatStepLastButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
