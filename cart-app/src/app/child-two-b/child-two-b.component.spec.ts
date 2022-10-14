import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTwoBComponent } from './child-two-b.component';

describe('ChildTwoBComponent', () => {
  let component: ChildTwoBComponent;
  let fixture: ComponentFixture<ChildTwoBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildTwoBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildTwoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
