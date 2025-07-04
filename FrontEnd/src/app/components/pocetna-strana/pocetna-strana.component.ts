import { Component, inject } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { RazrediService } from '../../services/razredi.service';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pocetna-strana',
  imports: [],
  templateUrl: './pocetna-strana.component.html',
  styleUrl: './pocetna-strana.component.scss'
})
export class PocetnaStranaComponent implements OnInit{
  
  constructor( ) {}
  
  razredService = inject(RazrediService)
  odeljenjeService = inject(OdeljenjeService)
  
  razrediList: Array<any> = [];
  odeljenjaList: Array<any> = [];
  ukupanBrojUcenika: number = 0;
  
  citati: string[] = [
    "Obrazovanje je najmoćnije oružje koje možete upotrebiti da promenite svet. – Nelson Mandela",
    "Obrazovanje, to je ono što ostane nakon što zaboravite sve što ste naučili u školi. – Albert Ajnštajn",
    "Čovek koji ne čita dobre knjige nema nikakve prednosti nad čovekom koji ih uopšte ne zna čitati. – Mark Tven",
    "Najveća nada svake zemlje leži u primerenom školovanju mladih. – Erazmo Roterdamski",
    "Nade obrazovanih jače su od bogatstva neukih. – Demokrit",
    "Nema gorih ljudi od onih koji se protive prosvećenju i obrazovanju naroda. Takvi, da mogu, i sunce bi ugasili. - Dositej Obradović",
    "Znanje je moć. – Fransis Bejkon",
    'Obrazovanje se ne sastoji od toga koliko ste zapamtili ili koliko znate. Sastoji se od toga da razlikujete koliko znate, a koliko ne. – Anatol Frans'
  ];
  
  randomCitat: string = '';

  
  ngOnInit(): void {
    
    this.getRandomCitat();
  
    const podaci$ = forkJoin({
      razredi: this.razredService.getAllRazredi(),
      odeljenja: this.odeljenjeService.getAllOdeljenja()
    })
    
    
    podaci$.subscribe(({razredi, odeljenja}) => {
      this.razrediList = razredi,
      this.odeljenjaList = odeljenja,
      
      this.ukupanBrojUcenika = odeljenja
      .map(o => o.UkupanBrojUcenika || 0)
      .reduce((sum, broj) => sum + broj, 0);
    })
    console.log(this.razrediList.length);
  }

 

  getRandomCitat(): void {
  const index = Math.floor(Math.random() * this.citati.length);
  this.randomCitat = this.citati[index];
}
  
}
