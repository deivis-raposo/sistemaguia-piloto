import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';

@Injectable()
export class ExtratoMovimentoCombustivelService {

  constructor(private http: HttpClient) { }

  public getExtratoMovimentoCombustivel(paramIn: ExtratoMovimentoCombustivelDTO,
                                        tpRelatorio: number,
                                        codEmpresa: number,
                                        codProduto: number): Observable<ExtratoMovimentoCombustivelDTO[]>{
    return this.http.get<ExtratoMovimentoCombustivelDTO[]>(`${environment.baseUrl}api/relatorio-extratomovimentocombustivel/${paramIn.dtInicioFiltro}/${paramIn.dtFimFiltro}/${tpRelatorio}/${codEmpresa}/${codProduto}`);
  }
}
