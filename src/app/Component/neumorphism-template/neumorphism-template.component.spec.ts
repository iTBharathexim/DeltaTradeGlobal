import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeumorphismTemplateComponent } from './neumorphism-template.component';

describe('NeumorphismTemplateComponent', () => {
  let component: NeumorphismTemplateComponent;
  let fixture: ComponentFixture<NeumorphismTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeumorphismTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeumorphismTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
