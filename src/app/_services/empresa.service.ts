import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Empresa } from '../_models/empresa.model';


@Injectable()
export class EmpresaService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Empresa[]>{
    return this.http.get<Empresa[]>(`${environment.baseUrl}api/empresa`);
  }
}
