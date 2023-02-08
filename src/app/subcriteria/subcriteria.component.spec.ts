import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcriteriaComponent } from './subcriteria.component';

describe('SubcriteriaComponent', () => {
  let component: SubcriteriaComponent;
  let fixture: ComponentFixture<SubcriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
