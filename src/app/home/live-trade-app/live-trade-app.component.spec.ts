import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTradeAppComponent } from './live-trade-app.component';

describe('LiveTradeAppComponent', () => {
  let component: LiveTradeAppComponent;
  let fixture: ComponentFixture<LiveTradeAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTradeAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTradeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
