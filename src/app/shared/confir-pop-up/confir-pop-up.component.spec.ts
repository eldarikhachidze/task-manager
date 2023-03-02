import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirPopUpComponent } from './confir-pop-up.component';

describe('ConfirPopUpComponent', () => {
  let component: ConfirPopUpComponent;
  let fixture: ComponentFixture<ConfirPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
