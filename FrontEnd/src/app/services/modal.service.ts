import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<ModalData | null>()
  modalState$ = this.modalState.asObservable();

  showModal(data: ModalData) {
    this.modalState.next(data);
  }

  closeModal() {
    this.modalState.next(null);
  }

}

export interface ModalData {
  title: string;
  message: string;
  errorMessage?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;

}
