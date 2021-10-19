import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VendaCategoriaDTO } from '../_models/venda-categoria-dto';

@Injectable()
export class VendaCategoriaService {

  constructor(private http: HttpClient) { }

  public getVendasCategoria(paramIn: VendaCategoriaDTO, tpRelatorio: number, codEmpresa: number): Observable<VendaCategoriaDTO[]>{
    return this.http.get<VendaCategoriaDTO[]>(`${environment.baseUrl}api/relatorio-vendasporproduto/report/vendaProdutoCategoria/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${tpRelatorio}/${codEmpresa}`);
  }

  public getAll(): Observable<VendaCategoriaDTO[]> {
    return this.http.get<VendaCategoriaDTO[]>(`${environment.baseUrl}api/relatorio-vendasporproduto`);
  }


  public printReport(paramIn: VendaCategoriaDTO, tpRelatorio: number, codEmpresa: number, nomeEmpresa: string): Observable<any>{
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${environment.baseUrl}api/relatorio-vendasporproduto/report/vendaProdutoCategoria/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${tpRelatorio}/${codEmpresa}/${nomeEmpresa}`, httpOptions);
  }
}
