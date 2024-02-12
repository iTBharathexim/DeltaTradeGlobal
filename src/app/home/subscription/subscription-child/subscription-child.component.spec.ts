import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionChildComponent } from './subscription-child.component';

describe('SubscriptionChildComponent', () => {
  let component: SubscriptionChildComponent;
  let fixture: ComponentFixture<SubscriptionChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
