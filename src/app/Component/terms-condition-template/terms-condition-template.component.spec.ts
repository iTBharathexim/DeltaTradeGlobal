import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionTemplateComponent } from './terms-condition-template.component';

describe('TermsConditionTemplateComponent', () => {
  let component: TermsConditionTemplateComponent;
  let fixture: ComponentFixture<TermsConditionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsConditionTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsConditionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
