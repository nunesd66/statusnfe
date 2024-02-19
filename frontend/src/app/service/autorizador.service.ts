import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Historico } from "../domain/historico.model";
import { Autorizador } from "../domain/autorizador.model";

@Injectable()
export class AutorizadorService {
  private baseUrl: string = 'http://localhost:8080/status-servicos';

  constructor(private http: HttpClient) {}

  public getAllAutorizadores(): Observable<Autorizador[]> {
    return this.http.get<Autorizador[]>(`${this.baseUrl}`)
      .pipe(
        catchError((error: unknown) => {
          console.error('AutorizadorService.getAllAutorizadores', error);
          throw error;
        })
      );
  }

  public getMaxUnavailability(): Observable<Historico> {
    return this.http.get<Historico>(`${this.baseUrl}/historic/max-unavailability`)
      .pipe(
        catchError((error: unknown) => {
          console.error('AutorizadorService.getMaxUnavailability', error);
          throw error;
        })
      );
  }

  public getByAutorizador(idAutorizador: number): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.baseUrl}/historic/${idAutorizador}`)
      .pipe(
        catchError((error: unknown) => {
          console.error('AutorizadorService.getByAutorizador', error);
          throw error;
        })
      );
  }

  public getLastedStatus(): Observable<Historico[]> {
    return this.http.get<Historico[]>(`${this.baseUrl}/historic`)
      .pipe(
        catchError((error: unknown) => {
          console.error('AutorizadorService.getLastedStatus', error);
          throw error;
        })
      );
  }

  public findHistoricByDate(dataInicial: string, dataFinal: string): Observable<Historico[]> {
    console.log('>', dataInicial, dataFinal)

    return this.http.get<Historico[]>(`${this.baseUrl}/historic/filter-by-date/${dataInicial}/${dataFinal}`)
    .pipe(
      catchError((error: unknown) => {
        console.error('AutorizadorService.findHistoricByDate', error);
        throw error;
      })
    );
  }

}
