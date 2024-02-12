import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FXTriggerComponent } from './fxtrigger.component';

describe('FXTriggerComponent', () => {
  let component: FXTriggerComponent;
  let fixture: ComponentFixture<FXTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FXTriggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FXTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
