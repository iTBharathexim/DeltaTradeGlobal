import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatPanelDescriptionComponent } from './custom-mat-panel-description.component';

describe('CustomMatPanelDescriptionComponent', () => {
  let component: CustomMatPanelDescriptionComponent;
  let fixture: ComponentFixture<CustomMatPanelDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatPanelDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatPanelDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
