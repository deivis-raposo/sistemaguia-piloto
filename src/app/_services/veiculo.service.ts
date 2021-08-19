import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SISTEMAAGUIA_API } from './clientevip.api';
import { Observable } from 'rxjs';
import { ResponseApi } from '../_models/response-api';
import { Veiculo } from '../_models/veiculo.model';


@Injectable()
export class VeiculoService {

  constructor(private http: HttpClient) {}

  createOrUpdate(veiculo: Veiculo) : Observable<ResponseApi>{
    if(veiculo.id != null){
      //return this.http.put<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-veiculo`, veiculo);
      return this.http.put<ResponseApi>(`/api_piloto/api/new-veiculo`, veiculo);
    } else {
      //return this.http.post<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-veiculo`, veiculo);
      return this.http.post<ResponseApi>(`/api_piloto/api/new-veiculo`, veiculo);
    }
  }

  findAll(page: number, count: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-veiculo/${page}/${count}`);
    return this.http.get<ResponseApi>(`/api_piloto/api/new-veiculo/${page}/${count}`);
  }

  findById(id: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-veiculo/${id}`);
    return this.http.get<ResponseApi>(`/api_piloto/api/new-veiculo/${id}`);
  }

  delete(id: number) : Observable<ResponseApi>{
    //return this.http.delete<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-veiculo/${id}`);
    return this.http.delete<ResponseApi>(`/api_piloto/api/new-veiculo/${id}`);
  }
}
