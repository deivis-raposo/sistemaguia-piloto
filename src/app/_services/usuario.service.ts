import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../_models/usuario.model';
import { CurrentUser } from '../_models/current-user.model';
import { ResponseApi } from '../_models/response-api';
import { User } from '../_models/user.model';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<CurrentUser>{
    return this.http.post<CurrentUser>(`${environment.baseUrl}api/auth`, user);
  }

  public saveUsuario(user: User): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${environment.baseUrl}api/usuario`, user);
  }

  public updateUsuario(usuario: Usuario): Observable<void>{
    return this.http.put<void>(`${environment.baseUrl}api/usuario`, usuario);
  }

  delete(id: string, cdEmpresa: number) : Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${environment.baseUrl}api/usuario/${id}/${cdEmpresa}`);
  }

  public getAllUsers(cdEmpresa: number): Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}api/usuario/${cdEmpresa}`);
  }
}
