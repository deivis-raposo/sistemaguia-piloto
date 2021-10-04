import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil.model';
import { Menu } from '../_models/menu.model';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) {}

  public getMenuByPerfilAndEmpresa(idPerfil: number, codEmpresa: number): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${environment.baseUrl}api/menu/${idPerfil}/${codEmpresa}`);
  }
}
