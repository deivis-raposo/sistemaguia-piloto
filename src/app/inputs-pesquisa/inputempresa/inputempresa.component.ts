import { Component, OnInit } from '@angular/core';

export interface PeriodicEmpresa {
  radio: string;
  codigo: string;
  nomeempresa: string;
  cpf: string;

}

const ELEMENT_Empresa: PeriodicEmpresa[] = [
  { radio: '', codigo: '', cpf: '', nomeempresa: '', },
  { radio: '', codigo: '', cpf: '', nomeempresa: '', },
  { radio: '', codigo: '', cpf: '', nomeempresa: '', },

];

@Component({
  selector: 'app-inputempresa',
  templateUrl: './inputempresa.component.html',
  styleUrls: ['./inputempresa.component.css']
})
export class InputempresaComponent implements OnInit {

  /* tabela do inputo empresa */
  displayedColumnsEmpresa: string[] = ['radio', 'codigo', 'cpf', 'nomeempresa'];
  dataSourceEmpresa = ELEMENT_Empresa;

  constructor() { }


  ngOnInit(): void {
  }

}
