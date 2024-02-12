import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModelComponent } from './custom-model.component';

describe('CustomModelComponent', () => {
  let component: CustomModelComponent;
  let fixture: ComponentFixture<CustomModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
