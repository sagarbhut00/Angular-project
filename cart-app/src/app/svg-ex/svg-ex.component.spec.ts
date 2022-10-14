import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgExComponent } from './svg-ex.component';

describe('SvgExComponent', () => {
  let component: SvgExComponent;
  let fixture: ComponentFixture<SvgExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgExComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
