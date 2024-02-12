import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatExpansionPanelComponent } from './custom-mat-expansion-panel.component';

describe('CustomMatExpansionPanelComponent', () => {
  let component: CustomMatExpansionPanelComponent;
  let fixture: ComponentFixture<CustomMatExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatExpansionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
