import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VendaCategoriaDTO } from '../_models/venda-categoria-dto';
import { ResponseApi } from '../_models/response-api';


@Injectable()
export class VendaCategoriaService {

  public dtInicio!: Date;
  public dtFim!: Date;
  constructor(private http: HttpClient) { }

  public getVendasCategoria(paramIn: VendaCategoriaDTO, tpRelatorio: number): Observable<VendaCategoriaDTO[]>{
    return this.http.get<VendaCategoriaDTO[]>(`${environment.baseUrl}api/relatorio-vendasporproduto/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${tpRelatorio}`);
  }

  public getAll(): Observable<VendaCategoriaDTO[]> {
    return this.http.get<VendaCategoriaDTO[]>(`${environment.baseUrl}api/relatorio-vendasporproduto`);
  }
}
