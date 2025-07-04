import { Injectable } from '@angular/core';
import { Odeljenje } from '../models/odeljenje';
import { OdeljenjeService } from './odeljenje.service';
import { RazredCreate } from '../models/razredCreate';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazrediServiceMock {
  private razredi: Array<RazredCreate> = [];
  private currentId = 1;

  constructor(private odeljenjeService: OdeljenjeService) { }

  getRazredi(): Observable<RazredCreate[]> {return of(this.razredi)}

  addRazred(razred: Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja' >) {
    const id:number = this.currentId++
    // const odeljenja: Array<Odeljenje> = this.odeljenjeService.getOdeljenjaByRazredId(id);

    // Reduce() rolazi kroz niz objekata 'odeljenja' i izracunava zbir ukupnog broja učenika iz trenutnog i sledećeg odeljenja
    // Nešto kao odeljenja[0].ukupanBrojUcenika + odeljenja[1].ukupanBrojUcenika i tako se indeks povecava za 1 dok ne stigne do kraja niza
    // const ukupanBrojUcenika: number = odeljenja.reduce((sum, o) => sum + o.ukupanBrojUcenika, 0);
    // const ukupanBrojOdeljenja: number = odeljenja.length;

    const ukupanBrojUcenika: number = 0;
    const ukupanBrojOdeljenja:number = 0;

    this.razredi.push( {
      id,
      ...razred,
      ukupanBrojUcenika,
      ukupanBrojOdeljenja
    })

  }

  



}
