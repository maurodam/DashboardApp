import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Elements, ElementCoordinate } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DraggableElementService {

  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  saveCoordinates(coordinates: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/SaveCoordinate`, coordinates)
      .pipe(
        map(response => {
          console.log('Coordinate salvate:', coordinates);
          return response;
        }),
        catchError(error => {
          console.error('Errore durante il salvataggio delle coordinate:', error);
          throw error;
        })
      );
  }

  getCoordinatesById(elementId: number): Observable<ElementCoordinate> {
    return this.http.get<ElementCoordinate>(`${this.apiUrl}/api/GetCoordinate?elementId=${elementId}`)
      .pipe(
        map((response: ElementCoordinate) => {
          return response;
        }),
        catchError(error => {
          console.error('Errore durante il recupero delle coordinate:', error);
          throw error;
        })
      );
  }

  getElements(): Observable<Elements[]> {
    return this.http.get<Elements[]>(`${this.apiUrl}/api/GetElements`)
      .pipe(
        map((response: Elements[]) => {
          return response;
        }),
        catchError(error => {
          console.error('Errore durante il recupero degli elementi:', error);
          throw error;
        })
      );
  }
}
