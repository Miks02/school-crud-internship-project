import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { IzmenaOdeljenjaComponent } from './components/izmena-odeljenja/izmena-odeljenja.component';
import { PrikazOdeljenjaComponent } from './components/prikaz-odeljenja/prikaz-odeljenja.component';
import { IzmenaRazredaComponent } from './components/izmena-razreda/izmena-razreda.component';
import { PrikazRazredaComponent } from './components/prikaz-razreda/prikaz-razreda.component';
import { PocetnaStranaComponent } from './components/pocetna-strana/pocetna-strana.component';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import { ModalService, ModalData } from './services/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit {
  title = 'ITS Praksa';
  modalData: ModalData | null = null;

  constructor(private modalService: ModalService) {
    this.modalService.modalState$.subscribe(data => {
      this.modalData = data;
    })
  }

  confirm() {
    this.modalData?.onConfirm();
  }

  cancel() {
    this.modalData?.onCancel?.();
    this.modalService.closeModal();
  }

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
    this.isLoading = false;
  }, 3000);
  }
}
