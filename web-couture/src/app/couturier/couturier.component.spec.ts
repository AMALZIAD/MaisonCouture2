import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouturierComponent } from './couturier.component';

describe('CouturierComponent', () => {
  let component: CouturierComponent;
  let fixture: ComponentFixture<CouturierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouturierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouturierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
