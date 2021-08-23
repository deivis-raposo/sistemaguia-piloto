import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SISTEMAAGUIA_API } from './clientevip.api';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Usuario } from '../_models/usuario.model';
import { CurrentUser } from '../_models/current-user.model';
import { ResponseApi } from '../_models/response-api';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario): Observable<CurrentUser>{
    //return this.http.post<CurrentUser>(`http://localhost:8080/api/auth`, usuario);
    return this.http.post<CurrentUser>(`${environment.baseUrl}api/auth`, usuario);
  }

  create(usuario: Usuario): Observable<ResponseApi>{
      if(usuario.id != null && usuario.id != 0){
        //return this.http.put<ResponseApi>(`${SISTEMAAGUIA_API}/api/usuario`, usuario);
        return this.http.put<ResponseApi>(`${environment.baseUrl}api/usuario`, usuario);
      } else {
        //return this.http.post<ResponseApi>(`${SISTEMAAGUIA_API}/api/usuario`, usuario);
        return this.http.put<ResponseApi>(`${environment.baseUrl}api/usuario`, usuario);
      }
  }

  public saveUsuario(usuario: Usuario): Observable<string>{
    return this.http.post<string>(`${environment.baseUrl}api/usuario`, usuario);
  }

  public updateUsuario(usuario: Usuario): Observable<void>{
    return this.http.put<void>(`${environment.baseUrl}api/usuario`, usuario);
  }

  findAll(page: number, count: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/usuario/${page}/${count}`);
    return this.http.get<ResponseApi>(`http://18.230.61.76:8080/api_piloto/api/usuario/${page}/${count}`);
  }

  findById(id: number) : Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${SISTEMAAGUIA_API}/api/usuario/${id}`);
    return this.http.get<ResponseApi>(`http://18.230.61.76:8080/api_piloto/api/usuario/${id}`);
  }

  delete(id: number) : Observable<ResponseApi>{
    //return this.http.delete<ResponseApi>(`${SISTEMAAGUIA_API}/api/usuario/${id}`);
    return this.http.delete<ResponseApi>(`${environment.baseUrl}api/usuario/${id}`);
  }


  public getAllUsers(page: number, count: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.baseUrl}api/usuario`);
  }
}
