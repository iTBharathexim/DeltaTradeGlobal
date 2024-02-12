import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerDynamicErrorComponent } from './inner-dynamic-error.component';

describe('InnerDynamicErrorComponent', () => {
  let component: InnerDynamicErrorComponent;
  let fixture: ComponentFixture<InnerDynamicErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerDynamicErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerDynamicErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
