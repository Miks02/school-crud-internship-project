import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RazredCreate } from '../../models/razredCreate';
import { RazrediServiceMock } from '../../services/razrediMock.service';
import { StavkaSifarnika } from '../../models/sifarnik';
import { SifarnikService } from '../../services/sifarnik.service';
import { RazrediService } from '../../services/razredi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-izmena-razreda',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './izmena-razreda.component.html',
  styleUrl: './izmena-razreda.component.scss'
})
export class IzmenaRazredaComponent implements OnInit{
  isEditMode:boolean = false;

  
  
  razredForma = new FormGroup({
    skolskaGodina: new FormControl<string | number>('', Validators.required),
    razred: new FormControl<string | number>('',  Validators.required),
    program: new FormControl<string | number>('', Validators.required),
    UkupanBrojUcenika: new FormControl<number>({value: 0, disabled: true}, [Validators.required, Validators.min(0)]),
    UkupanBrojOdeljenja: new FormControl<number>({value: 0, disabled: true}, [Validators.required, Validators.min(0)]),
  })
  
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  
  sifarnikService = inject(SifarnikService)
  razredServiceMock = inject(RazrediServiceMock)
  razredService = inject(RazrediService)
  modalService = inject(ModalService);
  
  SkolskeGodine: Array<StavkaSifarnika> = [];
  Razredi: Array<StavkaSifarnika> = [];
  Programi: Array<StavkaSifarnika> = [];
  
  id = 0;
  
  
  ngOnInit(): void {

    const sifarnici$ = forkJoin({
      skGodine: this.sifarnikService.getStavkeBySifarnikId(1),
      razredi: this.sifarnikService.getStavkeBySifarnikId(6),
      programi: this.sifarnikService.getStavkeBySifarnikId(5)
      
    })
    
    this.route.queryParams
    .pipe(take(1))
    .subscribe(params => {
      this.id = Number(params['id']);
    
      sifarnici$.subscribe(({skGodine, razredi, programi}) => {
        this.SkolskeGodine = skGodine;
        this.Programi = programi;
        this.Razredi = razredi;
        
        if(this.id) {
          this.isEditMode = true;
          
          this.razredService.getRazredById(this.id).subscribe(razred => {
            
            const skGodinaId = this.SkolskeGodine.find(g => g.vrednost === razred?.SkolskaGodina)?.id;
            const razredId = this.Razredi.find(r => r.vrednost === razred?.NazivRazreda)?.vrednost;
            const programId = this.Programi.find(p => p.vrednost === razred?.Program)?.id;
            
            
            
            this.razredForma.patchValue({
              skolskaGodina: skGodinaId,
              razred: razredId,
              program: programId,   
              UkupanBrojOdeljenja: razred?.UkupanBrojOdeljenja,
              UkupanBrojUcenika: razred?.UkupanBrojUcenika
            })
            
            
            
          })
          
        }
        else {
          this.isEditMode = false;
          
        }
      })
      
      
    })
    
  }
  onSubmit() {
    this.modalService.showModal({
      title: "Potvrda",
      message: "Potvrdite izmene",
      confirmText: "Potvrdi ",
      cancelText: "Odustani",
      onConfirm:() => {
        if(this.isEditMode) {
          if(this.razredForma.valid && this.razredForma.dirty && this.razredForma.touched) {
            const podaci = this.razredForma.getRawValue();
            const noviRazred: Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja'> = {
              SkolskaGodinaId: podaci.skolskaGodina as unknown as number,
              NazivRazreda: podaci.razred as unknown as string,
              ProgramId: podaci.program as unknown as number
              
            }

            this.razredService.updateRazredPut(this.id, noviRazred).subscribe({
              next: (response) => {
                this.modalService.closeModal();
                this.modalService.showModal({
                  title: "Poruka uspeha",
                  message: "Izmene su uspešno sačuvane!",
                  confirmText: "OK ",
                  
                  onConfirm:() => {
                    this.modalService.closeModal();
                    this.router.navigate(['razred-tabela']);
                    const formData = this.razredForma.getRawValue()
                    console.log(formData);
                    
                  }
                })
                this.razredForma.reset();
                console.log(response);
              },
              error: (err) => {
                
                this.modalService.closeModal();
                this.modalService.showModal({
                  title: "Greška",
                  message: "Došlo je do greške prilikom ažuriranja razreda",
                  errorMessage: "Razred već postoji ili su podaci nevalidni",
                  confirmText: "OK ",
                  
                  onConfirm:() => {
                    this.modalService.closeModal();
                  }
                })
                console.log(err)
              }
            })
            this.modalService.closeModal();
          }
          else {
            this.modalService.closeModal();
            this.modalService.showModal({
              title: "Obaveštenje",
              message: "Niste napravili nikakve izmene",
              confirmText: "OK",
              
              onConfirm:() => {
                this.modalService.closeModal();
              }
            })
          }
        }
        else {
          if(this.razredForma.valid) {
            
            const podaci = this.razredForma.value;
            const noviRazred: Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja' > = {
              NazivRazreda: podaci.razred as unknown as string,
              SkolskaGodinaId: podaci.skolskaGodina as unknown as number,
              ProgramId: podaci.program as unknown as number,    
              
            };
            
            
            this.razredService.addRazred(noviRazred).subscribe({
              next: (response) => {
                
                this.modalService.closeModal();
                this.modalService.showModal({
                  title: "Poruka uspeha",
                  message: "Izmene su uspešno sačuvane!",
                  confirmText: "OK ",
                  
                  onConfirm:() => {
                    this.modalService.closeModal();
                    
                  }
                })
                console.log(response);
              },
              error: (err) => {
                this.modalService.showModal({
                  title: "Greška",
                  message: "Došlo je do greške prilikom dodavanja razreda.",
                  errorMessage: "Razred već postoji ili su podaci nevalidni",
                  confirmText: "OK ",
                  
                  onConfirm:() => {
                    this.modalService.closeModal();
                  }
                })
                console.error("Doslo je do greske prilikom dodavanja razreda", err);
              }
            });
          }
          
        }
        
      },
      onCancel:() => {
        this.modalService.closeModal
      }
    })
    
    
  }
  
  onCancel() {
    this.router.navigate(['razred-tabela']);
    
  }
  
  
  
}

