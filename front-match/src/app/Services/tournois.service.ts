import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TournoisEntity } from '../Models/tournois';
import { MatchesToAdd } from '../Models/matchesToAdd';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TournoisService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }

  public getTournoiEntity(): Observable<TournoisEntity[]> {
    return this.http.get<TournoisEntity[]>(`${this.apiServerUrl}/tournoi/all`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public addTournoiEntity(tournoi: TournoisEntity): Observable<TournoisEntity> {
    return this.http.post<TournoisEntity>(`${this.apiServerUrl}/tournoi/add`, tournoi,{ headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }
  public updateTournoiEntity(tournoi: TournoisEntity,tournoiName: string): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/tournoi/${tournoiName}`, tournoi, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public deleteTournoiEntity(tournoiName: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tournoi/${tournoiName}`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }
  public addMatchToTournoiEntity(objToAdd:MatchesToAdd): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/tournoi/match`,objToAdd, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }
  public deleteMatchFromTournoiEntity(tournoiName: string,matchId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tournoi/match?tournoiName=${tournoiName}&matchId=${matchId}`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

}
