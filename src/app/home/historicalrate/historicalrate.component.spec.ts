import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalrateComponent } from './historicalrate.component';

describe('HistoricalrateComponent', () => {
  let component: HistoricalrateComponent;
  let fixture: ComponentFixture<HistoricalrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
