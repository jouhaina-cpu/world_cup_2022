import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArbitreEntity } from '../Models/arbitre';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }

  public getArbitreEntity(): Observable<ArbitreEntity[]> {
    return this.http.get<ArbitreEntity[]>(`${this.apiServerUrl}/arbitre/all`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public addArbitreEntity(arbitre: ArbitreEntity): Observable<ArbitreEntity> {
    return this.http.post<ArbitreEntity>(`${this.apiServerUrl}/arbitre/add`, arbitre,{ headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }
  public updateArbitreEntity(arbitre: ArbitreEntity,arbitreId: string): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/arbitre/${arbitreId}`, arbitre, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public deleteArbitreEntity(arbitreId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/arbitre/${arbitreId}`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }


}
