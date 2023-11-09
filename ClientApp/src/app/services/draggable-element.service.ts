import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.baseApiUrl; // Sostituisci con l'URL del tuo backend API

  constructor(private http: HttpClient) { }

  saveCoordinates(coordinates: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save-coordinates`, coordinates);
  }
}
