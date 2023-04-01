import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesrdvsComponent } from './mesrdvs.component';

describe('MesrdvsComponent', () => {
  let component: MesrdvsComponent;
  let fixture: ComponentFixture<MesrdvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesrdvsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesrdvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
