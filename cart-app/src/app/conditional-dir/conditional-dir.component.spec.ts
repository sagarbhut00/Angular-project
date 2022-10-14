import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalDirComponent } from './conditional-dir.component';

describe('ConditionalDirComponent', () => {
  let component: ConditionalDirComponent;
  let fixture: ComponentFixture<ConditionalDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalDirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
