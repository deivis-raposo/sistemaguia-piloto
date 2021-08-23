import { Component, OnInit } from '@angular/core';
/* tabela do input empresa */

export interface PeriodicEmpresa {
  radio: string;
  codigo: number;
  nomeempresa: string;
  cpf: string;

}

const ELEMENT_Empresa: PeriodicEmpresa[] = [
  { radio: '', codigo: 1, cpf: '', nomeempresa: '', },
  { radio: '', codigo: 2, cpf: '', nomeempresa: '', },
  { radio: '', codigo: 1, cpf: '', nomeempresa: '', },

];

/* tabela do input Credor */

export interface PeriodicCredor {
  radio1: string;
  codigo1: number;
  nomepessoa: string;
  cpf1: string;

}

const ELEMENT_Credor: PeriodicCredor[] = [
  { radio1: '', codigo1: 1, cpf1: '', nomepessoa: '', },
  { radio1: '', codigo1: 2, cpf1: '', nomepessoa: '', },
  { radio1: '', codigo1: 1, cpf1: '', nomepessoa: '', },

];


@Component({
  selector: 'app-credor',
  templateUrl: './credor.component.html',
  styleUrls: ['./credor.component.css']
})
export class CredorComponent implements OnInit {
  /* tabela do inputo empresa */
  displayedColumnsEmpresa: string[] = ['radio', 'codigo', 'cpf', 'nomeempresa'];
  dataSourceEmpresa = ELEMENT_Empresa;

  /* tabela do inputo empresa */
  displayedColumnsCredor: string[] = ['radio1', 'codigo1', 'cpf1', 'nomepessoa'];
  dataSourceCredor = ELEMENT_Credor;

  /* script para fazer certos inputs aparecerem e sumirem ao clicar da pagina*/

  Display = 'block';
  DisplayTable = 'none';
  DisplayTable2 = 'none';
  DisplayTable3 = 'none';




  constructor() { }

  ngOnInit(): void {
  }

  MudarDisplay(valor: string) {
    if (valor == '1') {
      if (this.Display == 'block') {
        this.Display = 'none';
        this.DisplayTable = 'block';
      } else {
        this.Display = 'block';
        this.DisplayTable = 'none';
      }
    } else if (valor == '2') {
      if (this.Display == 'block') {
        this.Display = 'none';
        this.DisplayTable2 = 'block';
      } else {
        this.Display = 'block';
        this.DisplayTable2 = 'none';
      }
    } else if (valor == '3') {
      if (this.Display == 'block') {
        this.Display = 'none';
        this.DisplayTable3 = 'block';
      } else {
        this.Display = 'block';
        this.DisplayTable3 = 'none';
      }

    }

  }






}






