import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonAddComponent } from './addon-add.component';

describe('AddonAddComponent', () => {
  let component: AddonAddComponent;
  let fixture: ComponentFixture<AddonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
