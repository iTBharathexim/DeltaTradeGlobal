import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPINPageComponent } from './mpin-page.component';

describe('MPINPageComponent', () => {
  let component: MPINPageComponent;
  let fixture: ComponentFixture<MPINPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPINPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MPINPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
