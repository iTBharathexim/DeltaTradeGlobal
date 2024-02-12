import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FXMarginDetailsComponent } from './fxmargin-details.component';

describe('FXMarginDetailsComponent', () => {
  let component: FXMarginDetailsComponent;
  let fixture: ComponentFixture<FXMarginDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FXMarginDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FXMarginDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
