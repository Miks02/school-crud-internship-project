import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaRazredaComponent } from './izmena-razreda.component';

describe('IzmenaRazredaComponent', () => {
  let component: IzmenaRazredaComponent;
  let fixture: ComponentFixture<IzmenaRazredaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzmenaRazredaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmenaRazredaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
