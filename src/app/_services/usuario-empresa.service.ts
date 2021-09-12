import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioEmpresa } from '../_models/usuario-empresa.model';


@Injectable()
export class UsuarioEmpresaService {

  constructor(private http: HttpClient) {}

  public getEmpresasByUser(loginUsuario: string): Observable<UsuarioEmpresa[]>{
    return this.http.get<UsuarioEmpresa[]>(`${environment.baseUrl}api/usuarioEmpresa/${loginUsuario}`);
  }
}
