import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazRazredaComponent } from './prikaz-razreda.component';

describe('PrikazRazredaComponent', () => {
  let component: PrikazRazredaComponent;
  let fixture: ComponentFixture<PrikazRazredaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrikazRazredaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazRazredaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
