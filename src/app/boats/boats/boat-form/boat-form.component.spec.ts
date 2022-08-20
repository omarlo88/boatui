import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatFormComponent } from './boat-form.component';

describe('BoatFormComponent', () => {
  let component: BoatFormComponent;
  let fixture: ComponentFixture<BoatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
