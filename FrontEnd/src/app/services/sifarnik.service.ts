import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Sifarnik, StavkaSifarnika } from '../models/sifarnik';

@Injectable({
  providedIn: 'root'
})
export class SifarnikService {

  apiUrl: string = "https://localhost:7000/api/sifarnik/sifarnici";
  constructor(private http: HttpClient) { }

  getSifarnici(): Observable<Sifarnik[]> {
    return this.http.get<Sifarnik[]>(this.apiUrl);
  }

  getStavkeBySifarnikId(id: number): Observable<StavkaSifarnika[]> {
    return this.getSifarnici().pipe(
      map(sifarnici => sifarnici.find(s => s.id === id)?.stavke ?? [])
    )
  }


  getVrednostStavke(id: number): Observable<string> {
    return this.getSifarnici().pipe(
      map(sifarnici => {
        for (const s of sifarnici) {
          const stavka = s.stavke.find(x => x.id === id);
          if(stavka) return stavka.vrednost
        }
        return '';
      })
    )
  }


}
