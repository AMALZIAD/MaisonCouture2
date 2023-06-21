import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouturiersComponent } from './couturiers.component';

describe('CouturiersComponent', () => {
  let component: CouturiersComponent;
  let fixture: ComponentFixture<CouturiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouturiersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouturiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
