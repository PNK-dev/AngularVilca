import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private apiUrl = "http://localhost:8080/api/facultad";
  constructor(private http:HttpClient) { }
  getFacultad():Observable<Facultad[]>{
    return this.http.get<Facultad[]>(this.apiUrl);
  }
  getFacultadById(id: number): Observable<Facultad> {
    return this.http.get<Facultad>(`${this.apiUrl}/${id}`);
  }

  createFacultad(Facultad: Facultad): Observable<Facultad> {
    return this.http.post<Facultad>(this.apiUrl, Facultad);
  }

  deleteFacultad(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateFacultad(Facultad: Facultad, id: number): Observable<Facultad> {
    return this.http.put<Facultad>(`${this.apiUrl}/${id}`, Facultad);
  }
}
