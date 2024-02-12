import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPINLoginPageComponent } from './mpin-login-page.component';

describe('MPINLoginPageComponent', () => {
  let component: MPINLoginPageComponent;
  let fixture: ComponentFixture<MPINLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPINLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MPINLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
