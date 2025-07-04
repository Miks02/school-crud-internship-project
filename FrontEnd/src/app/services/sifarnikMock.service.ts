import { Injectable } from '@angular/core';
import { Sifarnik, StavkaSifarnika } from '../models/sifarnik';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SifarnikServiceMock {

  // Hardkodirane vrednosti za sifarnike
  private sifarnici: Array<Sifarnik> = [
    {
      id: 1, naziv: 'Školska godina', stavke: [
        {id: 1, vrednost: '2023/2024'},
        {id: 2, vrednost: '2024/2025'},
        {id: 3, vrednost: '2025/2026'}
      ]
    },
    {
      id: 2, naziv: 'Vrsta odeljenja', stavke: [
        {id: 4, vrednost: "Opšte"},
        {id: 5, vrednost: 'Specijalno'},
        {id: 6, vrednost: "Kombinovano"},
        {id: 7, vrednost: "Muzičko"},
        {id: 7, vrednost: "Tehničko"}
      ]
    },
    {
      id: 3, naziv: "Jezik nastave", stavke: [
        {id: 9, vrednost: "Srpski"},
        {id: 10, vrednost: "Madjarski"},
        {id: 11, vrednost: "Albanski"},
        {id: 12, vrednost: "Slovački"}
      ]
    },
    {
      id: 4, naziv: "Prvi strani jezik", stavke: [
        {id: 13, vrednost: "Engleski"},
        {id: 14, vrednost: "Francuski"},
        {id: 15, vrednost: "Nemački"},
        {id: 16, vrednost: "Ruski"}
      ]
    },
    {
      id: 5, naziv: "Program", stavke: [
        {id: 17, vrednost: "Opšti program"},
        {id:18, vrednost: "IT Smer"},
        {id: 19, vrednost: "Sportski program"},
        {id: 20, vrednost: "Gimnazijski program"}
      ]
    },
    {
      id: 6, naziv: "Razred", stavke: [
        {id: 21, vrednost: 'I razred'},
        {id: 22, vrednost: 'II razred'},
        {id: 23, vrednost: 'III razred'},
        {id: 24, vrednost: "IV razred"},
        {id: 25, vrednost: "V razred"},
        {id: 26, vrednost: "VI razred"},
        {id: 27, vrednost: "VII razred"},
        {id: 28, vrednost: "VIII razred"}
      ]
    } 
  ];

  getSifarnici(): Array<Sifarnik> {
    return this.sifarnici
  }

  // Pronalazenje naziva stavke po id-u uz pomoc find funkcije (ako ne nadje stavku vraca prazan niz)
  getStavkeBySifarnikId(id:number): Observable<StavkaSifarnika[]> {
    const sifarnik = this.sifarnici.find(s => s.id === id);
    // return sifarnik ? sifarnik.stavke : [];
    if(sifarnik)
      return of(sifarnik.stavke)
    else return of([]);
  }

  // Skoro identicna funkcija ovoj iznad stim da ova pronalazi vrednost stavke (broj razreda, jezik, vrsta odeljenja itd)
  getVrednostStavke(id: number): Observable<string> {
    for(const sifarnik of this.sifarnici) {
      const stavka = sifarnik.stavke.find(s => s.id === id)
      if(stavka) return of(stavka.vrednost);
    }
    return of('');
  }

}
