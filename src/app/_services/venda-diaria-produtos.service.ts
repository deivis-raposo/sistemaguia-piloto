import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VendaDiariaProdutosDTO } from '../_models/venda-diaria-produtos-dto';
@Injectable()
export class VendaDiariaProdutosService {

    constructor(private http: HttpClient) { }


    public getVendaDiariaProdutos(paramIn: VendaDiariaProdutosDTO, codEmpresa: number): Observable<VendaDiariaProdutosDTO[]> {
        return this.http.get<VendaDiariaProdutosDTO[]>(`${environment.baseUrl}api/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${codEmpresa}`);
    }

    public printReport(paramIn: VendaDiariaProdutosDTO, codEmpresa: number, nomeEmpresa: string): Observable<any> {
        const httpOptions = {
            'responseType': 'arraybuffer' as 'json'
        };
        return this.http.get<any>(`${environment.baseUrl}api/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${codEmpresa}/${nomeEmpresa}`, httpOptions);
    }



}