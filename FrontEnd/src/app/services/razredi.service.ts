import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RazredCreate } from '../models/razredCreate';
import { RazredRead } from '../models/razredRead';

@Injectable({
  providedIn: 'root'
})
export class RazrediService {
  apiUrl = "https://localhost:7000/api/Razredi";


  constructor(private http: HttpClient) {}

  getAllRazredi():  Observable<RazredRead[]> {
    return this.http.get<RazredRead[]>(this.apiUrl + '/svi-razredi');
  }

  getRazredi(sortBy: string, page: number, pageSize: number): Observable<{data: RazredRead[], total:number}> {
    const params = new HttpParams()
    .set('sortBy', sortBy)
    .set('page', page)
    .set('pageSize', pageSize);
      return this.http.get<{ data: RazredRead[], total: number }>(this.apiUrl + "/tabela-razreda", { params });
  }

  getRazredById(id:number): Observable<RazredRead | undefined> {

      return this.http.get<RazredRead>(`${this.apiUrl}/${id}`);
  }

  addRazred(razred: Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja'>): Observable<RazredCreate> {
    return this.http.post<RazredCreate>(this.apiUrl, razred)
  }

  updateRazredPut(id: number, razred: Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja'>) : Observable<RazredCreate> {
    return this.http.put<RazredCreate>(`${this.apiUrl}/${id}`, razred);
  }

  updateRazredPatch(id: number, razred: Partial<Omit<RazredCreate, 'id' | 'ukupanBrojUcenika' | 'ukupanBrojOdeljenja'>>) {
    return this.http.patch<RazredCreate>(`${this.apiUrl}/${id}`, razred);
  }

  deleteRazred(id:number): Observable<RazredCreate | undefined> {
    return this.http.delete<RazredCreate>(this.apiUrl + `/${id}`)
  }

}
