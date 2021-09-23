import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil.model';

@Injectable()
export class PerfilService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(`${environment.baseUrl}api/perfil`);
  }
}
