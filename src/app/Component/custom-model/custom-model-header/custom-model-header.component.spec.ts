import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModelHeaderComponent } from './custom-model-header.component';

describe('CustomModelHeaderComponent', () => {
  let component: CustomModelHeaderComponent;
  let fixture: ComponentFixture<CustomModelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomModelHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomModelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
