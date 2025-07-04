import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazOdeljenjaComponent } from './prikaz-odeljenja.component';

describe('PrikazOdeljenjaComponent', () => {
  let component: PrikazOdeljenjaComponent;
  let fixture: ComponentFixture<PrikazOdeljenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrikazOdeljenjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrikazOdeljenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
