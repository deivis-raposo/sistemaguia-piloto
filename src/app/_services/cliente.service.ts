import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { SISTEMAAGUIA_API } from './clientevip.api';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/cliente.model';
import { ResponseApi } from '../_models/response-api';


@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) {}

  createOrUpdate(cliente: Cliente) : Observable<ResponseApi>{
    if(cliente.id != null){
      //return this.http.put<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-client`, cliente);
      return this.http.put<ResponseApi>(`/api_piloto/api/new-client`, cliente);
    } else {
      //return this.http.post<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-client`, cliente);
      return this.http.post<ResponseApi>(`/api_piloto/api/new-client`, cliente);
    }
  }

  findAll(page: number, count: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-client/${page}/${count}`);
    return this.http.get<ResponseApi>(`/api_piloto/api/new-client/${page}/${count}`);
  }

  findById(id: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-client/${id}`);
    return this.http.get<ResponseApi>(`/api_piloto/api/new-client/${id}`);
  }

  delete(idCliente: number) : Observable<ResponseApi>{
    //return this.http.delete<ResponseApi>(`${SISTEMAAGUIA_API}/api/new-client/${idCliente}`);
    return this.http.delete<ResponseApi>(`/api_piloto/api/new-client/${idCliente}`);
  }
}
