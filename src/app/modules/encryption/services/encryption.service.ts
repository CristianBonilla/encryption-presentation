import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { EncryptionResponse } from '@module/encryption/models/encryption-response';
import { CreateInstance } from '@core/create-instance';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private readonly httpHeaderOptions: HttpHeaders;
  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = `${ environment.urlApi }/document`;
    this.httpHeaderOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getPublicKey(): Observable<EncryptionResponse> {
    const encryptionResponse = this.http.get<EncryptionResponse>(this.url, {
      responseType: 'json',
      headers: this.httpHeaderOptions
    }).pipe(
      map(e => this.encryptionResponseInstance(e)),
      catchError(e => this.handleError(e))
    );

    return encryptionResponse;
  }

  documentEncrypted(document: number): Observable<EncryptionResponse> {
    const encryptionResponse = this.http.get<EncryptionResponse>(`${ this.url }/${ document }`, {
      responseType: 'json',
      headers: this.httpHeaderOptions
    }).pipe(
      map(e => this.encryptionResponseInstance(e)),
      catchError(e => this.handleError(e))
    );

    return encryptionResponse;
  }

  sendDocument(data: { documentEncrypted: string; name: string; }): Observable<EncryptionResponse> {
    const encryptionResponse = this.http.post<EncryptionResponse>(this.url, data, {
      responseType: 'json',
      headers: this.httpHeaderOptions
    }).pipe(
      map(e => this.encryptionResponseInstance(e)),
      catchError(e => this.handleError(e))
    );

    return encryptionResponse;
  }

  private encryptionResponseInstance(encryptionResponse: EncryptionResponse): EncryptionResponse {
    return CreateInstance.get(EncryptionResponse, encryptionResponse);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error: ', error.error.message);

      this.showErrorNotification(`Ocurrió un error: ${ error.error.message }`, 'Error');
    } else {
      const status = error.status;
      const encryptionResponse = error.error as EncryptionResponse;
      console.error(`El estado backend devuelve: ${ status }`,
        `error: ${ encryptionResponse.description }`);

      this.showErrorNotification(encryptionResponse.description, `Error: ${ status }`);
    }

    return throwError('Algo malo sucedio; Por favor, inténtelo de nuevo más tarde.');
  }

  private showErrorNotification(message: string, title: string = ''): NotifyReturn {
    const notify = $.notify({
      title,
      message
    }, {
      type: 'danger',
      timer: 2000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });

    return notify;
  }
}
