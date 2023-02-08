import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAhpComponent } from './input-ahp.component';

describe('InputAhpComponent', () => {
  let component: InputAhpComponent;
  let fixture: ComponentFixture<InputAhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAhpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
