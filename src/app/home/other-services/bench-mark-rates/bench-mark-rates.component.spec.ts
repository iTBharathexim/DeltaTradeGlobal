import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenchMarkRatesComponent } from './bench-mark-rates.component';

describe('BenchMarkRatesComponent', () => {
  let component: BenchMarkRatesComponent;
  let fixture: ComponentFixture<BenchMarkRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenchMarkRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenchMarkRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
