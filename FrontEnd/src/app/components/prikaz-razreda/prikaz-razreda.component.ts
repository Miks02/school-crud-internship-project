import { Component,inject, OnInit,  } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SifarnikServiceMock } from '../../services/sifarnikMock.service';
import { RazrediService } from '../../services/razredi.service';
import { RazredRead } from '../../models/razredRead';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { OdeljenjeService } from '../../services/odeljenje.service';


@Component({
  selector: 'app-prikaz-razreda',
  imports: [
    CommonModule,
  ],
  templateUrl: './prikaz-razreda.component.html',
  styleUrl: './prikaz-razreda.component.scss',
  
})
export class PrikazRazredaComponent implements OnInit {
  
  selectedSort: string = "Podrazumevano";
  
  sifarnikService = inject(SifarnikServiceMock)
  razredService = inject(RazrediService)
  odeljenjeService = inject(OdeljenjeService);
  modalService = inject(ModalService);
  
  constructor(private router: Router) {}
  
  razredi: Array<RazredRead> = [];
  
  podaciPoStrani = 5;
  trenutnaStrana = 1;
  totalRazreda = 0;
  
  
  
  
  ngOnInit(): void {
    
    this.promeniStranu(1);
    
  }
  onEdit(id: number): void {
    this.router.navigate(['/razred-forma'], { queryParams: { id } });    
  }
  
  onDelete(id: number): void {
    this.odeljenjeService.deleteOdeljenjeByRazredId(id).subscribe({
      next: () => {
        this.deleteRazred(id);
      },
      error: (err) => {
        if(err.status == 404) {
          this.deleteRazred(id);
          return;
        }
        this.modalService.showModal({
          title: "Greška",
          message: "Došlo je do greške prilikom brisanja razreda",
          errorMessage: "Problem",
          confirmText: "OK ",
          
          onConfirm:() => {
            this.modalService.closeModal();
          }
        })
        console.log("Greška pri brisanju razreda:", err);
      }
    })
    
  }

  deleteRazred(id: number): void {
  this.razredService.deleteRazred(id).subscribe({
    next: () => {
      
      this.razredService.getRazredi(this.selectedSort, this.trenutnaStrana, this.podaciPoStrani).subscribe(res => {
        this.razredi = res.data;
        this.totalRazreda = res.total;

        const novaUkupnoStrana = Math.ceil(res.total / this.podaciPoStrani);
        if (this.trenutnaStrana > novaUkupnoStrana) {
          this.promeniStranu(this.trenutnaStrana - 1);
        }
      });
    },
    error: (err) => {
      this.modalService.showModal({
        title: "Greška",
        message: "Došlo je do greške prilikom brisanja razreda",
        confirmText: "OK",
        onConfirm: () => this.modalService.closeModal()
      });
      console.error("Greška pri brisanju razreda:", err);
    }
  });
}
  
  onSelectSortChange(sortBy: any) {
    this.selectedSort = sortBy.value;
    this.razredService.getRazredi(this.selectedSort, this.trenutnaStrana , this.podaciPoStrani).subscribe({
      next: (razred) => {
        this.razredi = razred.data;
        
      }
      ,
      error: (err) => {
        console.log("Učitavanje neuspešno", err);
        
      }
    });
  }
  
  
  onRedirect() {
    this.router.navigate(['/razred-forma']);
  }
  
  onAddOdeljenje(razredId: number) {
    
    this.router.navigate(['odeljenje-forma'], { queryParams: { razredId } });    
  }
  
  
  get ukupnoStrana(): number {
    return Math.ceil(this.totalRazreda / this.podaciPoStrani);
  }
  
  get stranice(): number[] {
    return Array.from({ length: this.ukupnoStrana}, (_, i) => i + 1);
  }
  
  get paginiraniPodaci() {
    return this.razredi;
  }
  
  promeniStranu(broj: number) {
  
    this.razredService.getRazredi(this.selectedSort, broj, this.podaciPoStrani).subscribe({
      next: res => {
        this.razredi = res.data;
        this.totalRazreda = res.total;
        this.trenutnaStrana = broj;
      }
    });
  }
  
}
