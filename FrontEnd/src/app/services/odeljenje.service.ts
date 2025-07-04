import { Injectable } from '@angular/core';
import { Odeljenje } from '../models/odeljenje';
import { OdeljenjeRead } from '../models/odeljenjeRead';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OdeljenjeService {
  apiUrl = "https://localhost:7000/api/odeljenja";
  
  constructor(private http: HttpClient) {}
  
  getAllOdeljenja(): Observable<OdeljenjeRead[]> {
    return this.http.get<OdeljenjeRead[]>(this.apiUrl + '/sva-odeljenja');
  }
  
  getOdeljenja(sortBy: string, page: number, pageSize: number): Observable<{data: OdeljenjeRead[], total:number}> {
    const params = new HttpParams()
    .set('sortBy', sortBy)
    .set('page', page)
    .set('pageSize', pageSize);
    return this.http.get<{ data: OdeljenjeRead[], total: number }>(this.apiUrl + "/odeljenja-tabela", { params });
  }
  
  
  getOdeljenjeById(id: number): Observable<Odeljenje | undefined> {
    return this.http.get<Odeljenje>(this.apiUrl + `/${id}`);
  }
  
  deleteOdeljenjeByRazredId(razredId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl +`/brisanje-odeljenja-po-razredu/${razredId}`);
  }
  
  addOdeljenje(odeljenje: Omit<Odeljenje, 'OdeljenjeId' | 'NazivRazreda'>): Observable<Odeljenje> {
    return this.http.post<Odeljenje>(this.apiUrl, odeljenje)
  }
  
  updateOdeljenje(id: number, odeljenje: Omit<Odeljenje, 'OdeljenjeId' | 'NazivRazreda'>): Observable<Odeljenje> {
    return this.http.put<Odeljenje>(this.apiUrl + `/${id}`, odeljenje)
  }
  
  deleteOdeljenje(id:number) : Observable<Odeljenje | undefined> {
    return this.http.delete<Odeljenje>(this.apiUrl + `/${id}`);
  }
  
}
