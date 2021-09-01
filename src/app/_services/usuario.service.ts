import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../_models/usuario.model';
import { CurrentUser } from '../_models/current-user.model';
import { ResponseApi } from '../_models/response-api';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario): Observable<CurrentUser>{
    return this.http.post<CurrentUser>(`${environment.baseUrl}api/auth`, usuario);
  }

  create(usuario: Usuario): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${environment.baseUrl}api/usuario`, usuario);
  }

  public saveUsuario(usuario: Usuario): Observable<string>{
    return this.http.post<string>(`${environment.baseUrl}api/usuario`, usuario);
  }

  public updateUsuario(usuario: Usuario): Observable<void>{
    return this.http.put<void>(`${environment.baseUrl}api/usuario`, usuario);
  }

  findAll(page: number, count: number) : Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${environment.baseUrl}api/usuario/${page}/${count}`);
  }

  findById(id: number) : Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${environment.baseUrl}api/usuario/${id}`);
  }

  delete(id: number) : Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${environment.baseUrl}api/usuario/${id}`);
  }

  public getAllUsers(page: number, count: number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.baseUrl}api/usuario`);
  }
}
