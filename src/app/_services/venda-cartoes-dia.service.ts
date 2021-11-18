import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VendaCartoesDiaDTO } from '../_models/venda-cartoes-dia-dto'

@Injectable()
export class VendaCartoesDiaService {

    constructor(private http: HttpClient) { }
    public printReport(paramIn: VendaCartoesDiaDTO, codEmpresa: number, nomeEmpresa: string): Observable<any> {
        const httpOptions = {
            'responseType': 'arraybuffer' as 'json'
        };
        return this.http.get<any>(`${environment.baseUrl}api/relatorio-vendascartoesdia/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${codEmpresa}/${nomeEmpresa}`, httpOptions);
    }
}