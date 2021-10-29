import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';

@Injectable()
export class VendaDiariaCombustivelService {

    constructor(private http: HttpClient) { }


    public printReport(paramIn: ExtratoMovimentoCombustivelDTO, codEmpresa: number, nomeEmpresa: string): Observable<any> {
        const httpOptions = {
            'responseType': 'arraybuffer' as 'json'
        };
        return this.http.get<any>(`${environment.baseUrl}api/relatorio-vendadiariacombustivel/report/vendadiariacombustivel/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${codEmpresa}/${nomeEmpresa}`, httpOptions);
    }



}



