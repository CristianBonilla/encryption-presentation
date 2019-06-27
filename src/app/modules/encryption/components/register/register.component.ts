import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EncryptionService } from '@module/encryption/services/encryption.service';
import { SharingDataService } from '@module/encryption/services/sharing-data.service';
import { EncryptionResponse } from '@module/encryption/models/encryption-response';
import { Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface ValidField {
  isValid: boolean;
  message: string;
}

@Component({
  selector: 'de-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  name = '';
  document: number | null = null;
  documentText = '';
  documentEncrypted: string = null;
  validDocument: ValidField = null;
  validName: ValidField = null;
  publicKey$: Observable<EncryptionResponse>;
  subscriptions: Subscription[] = [];

  constructor(
    private registerService: EncryptionService,
    private sharingDataService: SharingDataService<EncryptionResponse>) {
    this.sharingDataService.updateObservable(
      this.registerService.getPublicKey());
    this.publicKey$ = this.sharingDataService.dataSource$;
  }

  ngOnInit() { }

  validateDocument() {
    const length = this.documentText.length;
    this.document = null;
    if (length < 3) {
      this.validDocument = {
        isValid: false,
        message: 'El documento de entrada debe ser mayor o igual a 3 dígitos'
      };
    } else {
      const expr = new RegExp(`^([0-9]{1,${ length }})$`);
      if (!expr.test(this.documentText)) {
        this.validDocument = {
          isValid: false,
          message: 'El documento de entrada no es valido para procesar'
        };
      } else {
        this.document = parseInt(this.documentText, 10);
        this.documentText = this.documentText.replace(/[0-9]/g, (sub, index, text) =>
          index < text.length - 2 ? '*' : sub);
        this.validDocument = {
          isValid: true,
          message: null
        };
        const subscription = this.registerService.documentEncrypted(this.document)
          .subscribe(e => {
            this.documentEncrypted = e.description.documentEncrypted;
          });
        this.subscriptions.push(subscription);
      }
    }
  }

  validateName() {
    this.name = this.name.trim();
    const name = this.name.length;
    if (name < 3) {
      this.validName = {
        isValid: false,
        message: 'El nombre de entrada debe ser mayor o igual a 3 dígitos'
      };
    } else {
      const expr = /^[a-zA-Z]+\s*[a-zA-Z]+$/;
      if (!expr.test(this.name)) {
        this.validName = {
          isValid: false,
          message: 'El nombre no debe contener números y tampoco carácteres especiales'
        };
      } else {
        this.validName = {
          isValid: true,
          message: null
        };
      }
    }
  }

  send(element: HTMLElement, form: NgForm) {
    if (!this.document || isNaN(this.document)) {
      this.validateDocument();
    }
    this.validateName();
    this.registerService.sendDocument({
      documentEncrypted: this.documentEncrypted,
      name: this.name
    }).subscribe();
    if (this.validDocument.isValid && this.validName.isValid) {
      const subscription = this.registerService.sendDocument({
        documentEncrypted: this.documentEncrypted,
        name: this.name
      }).subscribe(e => {
        this.showSuccessNotification(e.description.message);
      });
      this.subscriptions.push(subscription);
    }
    console.log(form.valid);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private showSuccessNotification(message: string, title: string = ''): NotifyReturn {
    const notify = $.notify({
      title,
      message
    }, {
      type: 'success',
      timer: 2000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });

    return notify;
  }
}
