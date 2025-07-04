import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaStranaComponent } from './pocetna-strana.component';

describe('PocetnaStranaComponent', () => {
  let component: PocetnaStranaComponent;
  let fixture: ComponentFixture<PocetnaStranaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocetnaStranaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocetnaStranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
