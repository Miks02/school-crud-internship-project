import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaOdeljenjaComponent } from './izmena-odeljenja.component';

describe('IzmenaOdeljenjaComponent', () => {
  let component: IzmenaOdeljenjaComponent;
  let fixture: ComponentFixture<IzmenaOdeljenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzmenaOdeljenjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzmenaOdeljenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
