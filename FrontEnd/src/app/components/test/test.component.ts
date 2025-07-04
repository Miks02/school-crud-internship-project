import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { RazrediServiceMock } from '../../services/razrediMock.service';
import { SifarnikServiceMock } from '../../services/sifarnikMock.service';
import { OnInit } from '@angular/core';
import { Sifarnik } from '../../models/sifarnik';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  sifarnikService = inject(SifarnikServiceMock);
  odeljenjeService = inject(OdeljenjeService);
  razredService = inject(RazrediServiceMock);
  

  // skolskaGodinaId: number;
  //  razredId: number;
  //  programId: number;
  // razred:Omit = {
  //   skolskaGodinaId: this.sifarnikService.getVrednostStavke(1),
  //   razredId: this.sifarnikService.getVrednostStavke(2),
  //   programId: this.sifarnikService.getVrednostStavke(3)
  // }

  ngOnInit(): void {
    console.log(this.sifarnikService.getStavkeBySifarnikId(1));
  }
  

}
