import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbiRefComponent } from './rbi-ref.component';

describe('RbiRefComponent', () => {
  let component: RbiRefComponent;
  let fixture: ComponentFixture<RbiRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbiRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbiRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
