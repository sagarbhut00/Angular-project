import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeExComponent } from './pipe-ex.component';

describe('PipeExComponent', () => {
  let component: PipeExComponent;
  let fixture: ComponentFixture<PipeExComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeExComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
