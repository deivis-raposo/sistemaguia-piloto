import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';

@Injectable()
export class ExtratoMovimentoCombustivelService {

  constructor(private http: HttpClient) { }


  public printReport(paramIn: ExtratoMovimentoCombustivelDTO, tpRelatorio: number, codEmpresa: number, nomeEmpresa: string): Observable<any> {
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${environment.baseUrl}api/relatorio-extratomovimentocombustivel/report/extratoMovimentoCombustivel/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${tpRelatorio}/${codEmpresa}/${nomeEmpresa}`, httpOptions);
  }
}
