import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCouturierComponent } from './edit-couturier.component';

describe('EditCouturierComponent', () => {
  let component: EditCouturierComponent;
  let fixture: ComponentFixture<EditCouturierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCouturierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCouturierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
