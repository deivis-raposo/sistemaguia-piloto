import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil.model';
import { Menu } from '../_models/menu.model';
import { ResponseApi } from '../_models/response-api';
import { MenuPerfil } from '../_models/menu-perfil.model';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) {}

  public getMenuByPerfilAndEmpresa(idPerfil: number, codEmpresa: number): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${environment.baseUrl}api/menu/${idPerfil}/${codEmpresa}`);
  }

  public getAll(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${environment.baseUrl}api/menu`);
  }

  public saveMenuPerfil(menuPerfil: MenuPerfil): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}api/menu-perfil`, menuPerfil);
  }
}
