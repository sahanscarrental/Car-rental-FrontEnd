import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonListComponent } from './addon-list.component';

describe('AddonListComponent', () => {
  let component: AddonListComponent;
  let fixture: ComponentFixture<AddonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
