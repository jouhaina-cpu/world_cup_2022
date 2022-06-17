import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Staff } from '../Models/staff';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenStorage:TokenStorageService) { }

  
  public getStaffs():Observable<Staff[]>{
    return this.http.get<[Staff]>(`${this.apiServerUrl}/staff/all`,{ headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public addStaff(staff: Staff): Observable<Staff>{
    return this.http.post<Staff>(`${this.apiServerUrl}/staff/add`,staff, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public updateStaff(staff: Staff,staffId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/staff/${staffId}`, staff, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

  public deleteStaff(staffId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/staff/${staffId}`, { headers: { Authorization: `Bearer ${this.tokenStorage.getToken()}` } });
  }

}
