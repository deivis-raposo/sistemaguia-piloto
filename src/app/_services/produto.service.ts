import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Perfil } from '../_models/perfil.model';
import { Produto } from '../_models/produto.model';

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${environment.baseUrl}api/produto`);
  }
}
