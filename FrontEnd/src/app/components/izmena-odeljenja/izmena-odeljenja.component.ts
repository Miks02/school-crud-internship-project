import { Component, inject ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import {  FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RazrediService } from '../../services/razredi.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, take } from 'rxjs';
import { SifarnikService } from '../../services/sifarnik.service';
import { StavkaSifarnika } from '../../models/sifarnik';
import { ModalService } from '../../services/modal.service';
import { Odeljenje } from '../../models/odeljenje';
import { OdeljenjeService } from '../../services/odeljenje.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmena-odeljenja',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './izmena-odeljenja.component.html',
  styleUrls: ['./izmena-odeljenja.component.scss']
  
})
export class IzmenaOdeljenjaComponent implements OnInit {
  
  isEditMode: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  razredService = inject(RazrediService);
  odeljenjeService = inject(OdeljenjeService);
  sifarnikService = inject(SifarnikService);
  modalService = inject(ModalService);
  
  
  odeljenjeForma = new FormGroup({
    skolskaGodinaId: new FormControl<string | number>({value: '', disabled: true}, Validators.required),
    razredId: new FormControl<string | number>({value: '', disabled: true}, Validators.required),
    naziv: new FormControl<string>('', Validators.required),
    vrstaOdeljenjaId: new FormControl<string | number>('', Validators.required),
    programId: new FormControl<string | number>({value: '', disabled: true}, Validators.required),
    odeljenskiStaresina: new FormControl<string>(''),
    smena: new FormControl<string | number>('', Validators.required),
    jezikNastaveId: new FormControl<string | number | null>(null, Validators.required),
    kombinovano: new FormControl<boolean>(false),
    celodnevno: new FormControl<boolean>(false),
    izdvojeno: new FormControl<boolean>(false),
    nazivIzdvojeneSkole: new FormControl<string>(''),
    dvojezicno: new FormControl<boolean>(false),
    prviStraniJezikId: new FormControl<string | number>(''),
    brojUcenika: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    brojUcenica: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    ukupanBrojUcenika: new FormControl<number>({value: 0, disabled: true}, [Validators.required, Validators.min(1)])
  });
  
  
  
  SkolskeGodine: Array<StavkaSifarnika> = [];
  Razredi: Array<StavkaSifarnika> = [];
  Programi: Array<StavkaSifarnika> = [];
  VrsteOdeljenja: Array<StavkaSifarnika> = [];
  Smene: Array<StavkaSifarnika> = [];
  JeziciNastave: Array<StavkaSifarnika> = [];
  StraniJezici: Array<StavkaSifarnika> = [];
  
  razredId: any;
  editId: number = 0;
  
  
  ngOnInit(): void {
    this.handleConditionalFields();
    this.setupUkupanBrojUcenikaAutoCalculation();
    console.log("RazredID: " + this.razredId);
    
    this.odeljenjeForma.get('dvojezicno')?.valueChanges.subscribe(dvojezicno => {
      if (!dvojezicno) {
        this.odeljenjeForma.get('prviStraniJezikId')?.setValue(null);
      }
    });
    
    const sifarnici$ = forkJoin({
      skGodine: this.sifarnikService.getStavkeBySifarnikId(1),
      razredi: this.sifarnikService.getStavkeBySifarnikId(6),
      programi: this.sifarnikService.getStavkeBySifarnikId(5),
      vrsteOdeljenja: this.sifarnikService.getStavkeBySifarnikId(2),
      jeziciNastave: this.sifarnikService.getStavkeBySifarnikId(3),
      straniJezici: this.sifarnikService.getStavkeBySifarnikId(4),
    })
    
    this.route.queryParams
    .pipe(take(1))
    .subscribe(params => {
      this.razredId = Number(params['razredId']);
      this.editId = Number(params['editId']);
      console.log("ID: " + this.razredId);
      if(this.editId) {
        this.isEditMode = true;
       
        
        
        sifarnici$.subscribe(({ skGodine, razredi, programi, vrsteOdeljenja, jeziciNastave, straniJezici }) => {
          this.SkolskeGodine = skGodine;
          this.Razredi = razredi;
          this.Programi = programi;
          this.VrsteOdeljenja = vrsteOdeljenja;
          this.JeziciNastave = jeziciNastave;
          this.StraniJezici = straniJezici;
          
          this.odeljenjeService.getOdeljenjeById(this.editId).subscribe((odeljenje) => {
            if (!odeljenje) {
              console.error('Odeljenje nije pronađeno!');
              return;
            }
         
        
          
            this.odeljenjeForma.patchValue({
              skolskaGodinaId: odeljenje.SkolskaGodinaId,
              razredId: odeljenje.NazivRazreda,
              programId: odeljenje.ProgramId,
              naziv: odeljenje.NazivOdeljenja,
              vrstaOdeljenjaId: odeljenje.VrstaOdeljenjaId,
              odeljenskiStaresina: odeljenje.OdeljenskiStaresina,
              smena: odeljenje.Smena,
              jezikNastaveId: odeljenje.JezikNastaveId,
              kombinovano: odeljenje.KombinovanoOdeljenje,
              celodnevno: odeljenje.CelodnevnaNastava,
              izdvojeno: odeljenje.IzdvojenoOdeljenje,
              nazivIzdvojeneSkole: odeljenje.NazivIzdvojeneSkole,
              dvojezicno: odeljenje.DvojezicnoOdeljenje,
              prviStraniJezikId: odeljenje.PrviStraniJezikId,
              brojUcenika: odeljenje.BrojUcenika,
              brojUcenica: odeljenje.BrojUcenica,
              ukupanBrojUcenika: odeljenje.UkupanBrojUcenika
            });
            
          });
        });
        
      }
      else {
        if (this.razredId) {
         
          sifarnici$.subscribe(({ skGodine, razredi, programi, vrsteOdeljenja, jeziciNastave, straniJezici }) => {
            this.SkolskeGodine = skGodine;
            this.Razredi = razredi;
            this.Programi = programi;
            this.VrsteOdeljenja = vrsteOdeljenja;
            this.JeziciNastave = jeziciNastave;
            this.StraniJezici = straniJezici;
            console.log(this.VrsteOdeljenja);
            this.razredService.getRazredById(this.razredId).subscribe(razred => {
              const skGodinaId = this.SkolskeGodine.find(g => g.vrednost === razred?.SkolskaGodina)?.id;
              const razredId = this.Razredi.find(r => r.vrednost === razred?.NazivRazreda)?.vrednost;
              const programId = this.Programi.find(p => p.vrednost === razred?.Program)?.id;
              
              this.odeljenjeForma.patchValue({
                skolskaGodinaId: skGodinaId,
                razredId: razredId,
                programId: programId,
              });
            });
          });
        }
      }
      
      
    });
    
  } 
  
  handleConditionalFields(): void {
    this.odeljenjeForma.get('izdvojeno')!.valueChanges.subscribe((checked) => {
      const control = this.odeljenjeForma.get('nazivIzdvojeneSkole');
      if (checked) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
        control?.setValue('');
      }
      control?.updateValueAndValidity();
    });
    
    this.odeljenjeForma.get('dvojezicno')!.valueChanges.subscribe((checked) => {
      const control = this.odeljenjeForma.get('prviStraniJezikId');
      if (checked) {
        control?.setValidators([Validators.required]);
      } else {
        control?.clearValidators();
        control?.setValue(null);
      }
      control?.updateValueAndValidity();
    });
  }
  
  setupUkupanBrojUcenikaAutoCalculation(): void {
    const brojUcenikaControl = this.odeljenjeForma.get('brojUcenika');
    const brojUcenicaControl = this.odeljenjeForma.get('brojUcenica');
    const ukupnoControl = this.odeljenjeForma.get('ukupanBrojUcenika');
    
    if (!brojUcenikaControl || !brojUcenicaControl || !ukupnoControl) return;
    
    brojUcenikaControl.valueChanges.subscribe(() => {
      this.azurirajUkupanBrojUcenika();
    });
    
    brojUcenicaControl.valueChanges.subscribe(() => {
      this.azurirajUkupanBrojUcenika();
    });
  }
  
  azurirajUkupanBrojUcenika(): void {
    const brojUcenika = this.odeljenjeForma.get('brojUcenika')?.value || 0;
    const brojUcenica = this.odeljenjeForma.get('brojUcenica')?.value || 0;
    
    const ukupno = Number(brojUcenika) + Number(brojUcenica);
    
    this.odeljenjeForma.get('ukupanBrojUcenika')?.setValue(ukupno, { emitEvent: false });
  }
  
  onSubmit(): void {
    this.modalService.showModal({
      title: "Potvrda",
      message: "Potvrdite izmene",
      confirmText: "Potvrdi ",
      cancelText: "Odustani",
      onConfirm: () => {
        if(this.isEditMode)
          {
          if (this.odeljenjeForma.valid) {
            const podaci = this.odeljenjeForma.getRawValue();
                      

            
            const azuriranoOdeljenje: Omit<Odeljenje, 'OdeljenjeId' | 'NazivRazreda'> = {
              
              SkolskaGodinaId: Number(podaci.skolskaGodinaId),
              RazredId: this.razredId,
              ProgramId: Number(podaci.programId),
              NazivOdeljenja: String(podaci.naziv),
              VrstaOdeljenjaId: Number(podaci.vrstaOdeljenjaId),
              OdeljenskiStaresina: podaci.odeljenskiStaresina!,
              Smena: String(podaci.smena),
              JezikNastaveId: Number(podaci.jezikNastaveId),
              KombinovanoOdeljenje: Boolean(podaci.kombinovano),
              CelodnevnaNastava: Boolean(podaci.celodnevno),
              IzdvojenoOdeljenje: Boolean(podaci.izdvojeno),
              NazivIzdvojeneSkole: String(podaci.nazivIzdvojeneSkole),
              DvojezicnoOdeljenje: Boolean(podaci.dvojezicno),
              PrviStraniJezikId: podaci?.prviStraniJezikId as unknown as number,
              BrojUcenika: Number(podaci.brojUcenika),
              BrojUcenica: Number(podaci.brojUcenica),
              UkupanBrojUcenika: Number(podaci.ukupanBrojUcenika)
            };
            console.log("Razred id: " + azuriranoOdeljenje.RazredId as any);
            this.odeljenjeService.updateOdeljenje(this.editId, azuriranoOdeljenje).subscribe({
              next: () => {
                this.modalService.showModal({
                  title: 'Uspeh',
                  message: 'Odeljenje je uspešno ažurirano!',
                  confirmText: 'OK',
                  cancelText: '',
                  onConfirm: () => {
                    this.router.navigate(['/odeljenje-tabela']);
                    this.modalService.closeModal();
                  }
                });
              },
              error: (err) => {
                
                console.error('Greška prilikom ažuriranja', err);
                

              }
              
            });
          }
          
        }
        else
        {
          if(this.odeljenjeForma.valid && this.odeljenjeForma.dirty && this.odeljenjeForma.touched)
            {
            
            const podaci = this.odeljenjeForma.getRawValue();
            if (!podaci.dvojezicno) {
              podaci.prviStraniJezikId = null;
            }
            const novoOdeljenje: Omit<Odeljenje, 'OdeljenjeId' | 'NazivRazreda'> = {
              SkolskaGodinaId: Number(podaci.skolskaGodinaId),
              RazredId: this.razredId,
              ProgramId: podaci.programId as unknown as number,
              NazivOdeljenja: podaci.naziv as unknown as string,
              VrstaOdeljenjaId: podaci.vrstaOdeljenjaId as unknown as number,
              OdeljenskiStaresina: podaci.odeljenskiStaresina as unknown as string,
              Smena: podaci.smena as unknown as string,
              JezikNastaveId: Number(podaci.jezikNastaveId) ?? null,
              KombinovanoOdeljenje: podaci.kombinovano as unknown as boolean,
              CelodnevnaNastava: podaci.celodnevno as unknown as boolean,
              IzdvojenoOdeljenje: podaci.izdvojeno as unknown as boolean,
              NazivIzdvojeneSkole: podaci.nazivIzdvojeneSkole as unknown as string,
              DvojezicnoOdeljenje: podaci.dvojezicno as unknown as boolean,
              PrviStraniJezikId: podaci.prviStraniJezikId as unknown as number,
              BrojUcenika: podaci.brojUcenika as unknown as number,
              BrojUcenica: podaci.brojUcenica as unknown as number,
              UkupanBrojUcenika: podaci.ukupanBrojUcenika as unknown as number
            }
            
            this.odeljenjeService.addOdeljenje(novoOdeljenje).subscribe({
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
                  message: "Došlo je do greške prilikom dodavanja odeljenja.",
                  errorMessage: "Odeljenje već postoji ili su podaci nevalidni",
                  confirmText: "OK ",
                  
                  onConfirm:() => {
                    this.modalService.closeModal();
                  }
                })
                console.error("Doslo je do greske prilikom dodavanja odeljenja", err);
                
              }
            })
            
          }
        }
      },
      onCancel: () => {
        this.modalService.closeModal();
      }
    })
  }
  
  onCancel(componentRoute: string) {
    this.router.navigate([`${componentRoute}`]);
    
  }
  
}
