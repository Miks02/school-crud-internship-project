import { Component, inject, OnInit } from '@angular/core';
import { OdeljenjeRead } from '../../models/odeljenjeRead';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { Odeljenje } from '../../models/odeljenje';


@Component({
  selector: 'app-prikaz-odeljenja',
  imports: [],
  templateUrl: './prikaz-odeljenja.component.html',
  styleUrl: './prikaz-odeljenja.component.scss'
})
export class PrikazOdeljenjaComponent implements OnInit {
  
  selectedSort: string = "Podrazumevano";
  
  
  constructor(private router: Router) {}
  
  odeljenjeService = inject(OdeljenjeService)
  modalService = inject(ModalService);
  
  odeljenjaList: Array<OdeljenjeRead> = []
  
  podaciPoStrani = 5;
  trenutnaStrana = 1;
  totalOdeljenja = 0;
  
  ngOnInit(): void {
    this.promeniStranu(1);
    
  }
  
  onEdit(editId: number, razredId: number) {
    console.log(razredId);
    this.router.navigate(['odeljenje-forma'], {
      queryParams: {
        editId,
        razredId
      }
    });
  }
  
  
  onDelete(id: number) {
    this.odeljenjeService.deleteOdeljenje(id).subscribe({
      next: () => {
        
        this.odeljenjeService.getOdeljenja(this.selectedSort, this.trenutnaStrana, this.podaciPoStrani).subscribe(res => {
          this.odeljenjaList = res.data;
          this.totalOdeljenja = res.total;
          
          const novaUkupnoStrana = Math.ceil(res.total / this.podaciPoStrani);
          if (this.trenutnaStrana > novaUkupnoStrana) {
            this.promeniStranu(this.trenutnaStrana - 1);
          }
        });
      },
      error: (err) => {
        this.modalService.showModal({
          title: "Greška",
          message: "Došlo je do greške prilikom brisanja odeljenja",
          confirmText: "OK",
          onConfirm: () => this.modalService.closeModal()
        });
        console.error("Greška pri brisanju odeljenja:", err);
      }
    });
  }
  onRedirect() {
    this.router.navigate(['/razred-tabela']);
  }
  
  onSelectSortChange(sortBy: any) {
    this.selectedSort = sortBy.value;
    this.odeljenjeService.getOdeljenja(this.selectedSort, this.trenutnaStrana , this.podaciPoStrani).subscribe({
      next: (odeljenje) => {
        this.odeljenjaList = odeljenje.data;
        
      }
      ,
      error: (err) => {
        console.log("Učitavanje neuspešno", err);
        
      }
    });
  }
  
  get ukupnoStrana(): number {
    return Math.ceil(this.totalOdeljenja / this.podaciPoStrani);
  }
  
  get stranice(): number[] {
    return Array.from({ length: this.ukupnoStrana}, (_, i) => i + 1);
  }
  
  get paginiraniPodaci() {
    return this.odeljenjaList;
  }
  
  promeniStranu(broj: number) {
    
    this.odeljenjeService.getOdeljenja(this.selectedSort, broj, this.podaciPoStrani).subscribe({
      next: odeljenje => {
        this.odeljenjaList = odeljenje.data;
        this.totalOdeljenja = odeljenje.total;
        this.trenutnaStrana = broj;
      }
    });
  }
  
  
}


