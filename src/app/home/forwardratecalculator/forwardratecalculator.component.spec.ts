import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardratecalculatorComponent } from './forwardratecalculator.component';

describe('ForwardratecalculatorComponent', () => {
  let component: ForwardratecalculatorComponent;
  let fixture: ComponentFixture<ForwardratecalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardratecalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardratecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
