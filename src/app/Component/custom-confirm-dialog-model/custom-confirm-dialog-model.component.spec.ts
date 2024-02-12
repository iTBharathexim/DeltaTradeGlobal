import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmDialogModelComponent } from './custom-confirm-dialog-model.component';

describe('CustomConfirmDialogModelComponent', () => {
  let component: CustomConfirmDialogModelComponent;
  let fixture: ComponentFixture<CustomConfirmDialogModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConfirmDialogModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomConfirmDialogModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
