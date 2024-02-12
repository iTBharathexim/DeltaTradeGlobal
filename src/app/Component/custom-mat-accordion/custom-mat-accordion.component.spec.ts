import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatAccordionComponent } from './custom-mat-accordion.component';

describe('CustomMatAccordionComponent', () => {
  let component: CustomMatAccordionComponent;
  let fixture: ComponentFixture<CustomMatAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMatAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
