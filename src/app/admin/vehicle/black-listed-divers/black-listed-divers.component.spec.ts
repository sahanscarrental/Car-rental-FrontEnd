import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListedDiversComponent } from './black-listed-divers.component';

describe('BlackListedDiversComponent', () => {
  let component: BlackListedDiversComponent;
  let fixture: ComponentFixture<BlackListedDiversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackListedDiversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListedDiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
