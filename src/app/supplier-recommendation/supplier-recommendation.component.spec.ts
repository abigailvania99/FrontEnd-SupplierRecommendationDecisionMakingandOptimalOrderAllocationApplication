import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRecommendationComponent } from './supplier-recommendation.component';

describe('SupplierRecommendationComponent', () => {
  let component: SupplierRecommendationComponent;
  let fixture: ComponentFixture<SupplierRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
