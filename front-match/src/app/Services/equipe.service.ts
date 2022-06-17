import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EquipeEntity } from '../Models/equipe';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }

  public getEquipeEntity(): Observable<EquipeEntity[]> {
    return this.http.get<EquipeEntity[]>(`${this.apiServerUrl}/equipe/all`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public addEquipeEntity(equipe: EquipeEntity): Observable<EquipeEntity> {
    return this.http.post<EquipeEntity>(`${this.apiServerUrl}/equipe/add`, equipe,{ headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }
  public updateEquipeEntity(equipe: EquipeEntity,equipeId: string): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/equipe/${equipeId}`, equipe, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public deleteEquipeEntity(equipeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/equipe/${equipeId}`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }


}
