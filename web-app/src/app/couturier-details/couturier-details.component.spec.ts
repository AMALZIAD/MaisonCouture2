import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouturierDetailsComponent } from './couturier-details.component';

describe('CouturierDetailsComponent', () => {
  let component: CouturierDetailsComponent;
  let fixture: ComponentFixture<CouturierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouturierDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouturierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
