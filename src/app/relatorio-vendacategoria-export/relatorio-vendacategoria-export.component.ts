import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../_services/snack-bar.service';
import { InputempresaComponent } from '../inputs-pesquisa/inputempresa/inputempresa.component'
import { FormBuilder, FormGroup } from '@angular/forms';

/*tabela relatorio venda por categoria*/
export interface Transaction {
  codigo: string;
  quantidade: number;
  descricao: string;
  un: string;
  pmv: number;
  valorbruto: number;
  desc: number;
  acres: number;
  valorliquido: number;
}

@Component({
  selector: 'app-relatorio-vendacategoria-export',
  templateUrl: './relatorio-vendacategoria-export.component.html',
  styleUrls: ['./relatorio-vendacategoria-export.component.css']
})


export class RelatorioVendacategoriaExportComponent implements OnInit {

  public vendacategoriaForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();

  public dataSource: any[] = [];

  /*tabela relatorio venda por categoria*/

  displayedColumns = ['codigo', 'descricao', 'un', 'quantidade', 'pmv', 'valorbruto', 'desc', 'acres', 'valorliquido'];
  transactions: Transaction[] = [
    { descricao: 'Gasolina', quantidade: 4, codigo: '1001', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
    { descricao: 'Óleo', quantidade: 5, codigo: '1004', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
    { descricao: 'Etanol', quantidade: 2, codigo: '1007', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
  ];

  ngOnInit(): void {
    this.vendacategoriaForm = this.formBuilder.group({
      dtInicio: ['']
    })
    this.isFormReady = true;
    this.dataSource = this.transactions;
  }

  constructor(private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder) { }


  getTotalquantidade() {
    return this.transactions.map(t => t.quantidade).reduce((acc, value) => acc + value, 0);
  }

  getTotalvalorbruto() {
    return this.transactions.map(t => t.valorbruto).reduce((acc, value) => acc + value, 0);
  }

  getTotalvalorliquido() {
    return this.transactions.map(t => t.valorliquido).reduce((acc, value) => acc + value, 0);
  }

  /* script para fazer certos inputs aparecerem e sumirem ao clicar na pagina*/


  display = 'block';
  displaytable = 'none';

  mudarDisplay(valor: string) {

    if (valor == '1') {
      if (this.display == 'block') {
        this.display = 'none';
        this.displaytable = 'block';
      } else {
        this.display = 'block';
        this.displaytable = 'none';
      }
    }
  }

  /* transforma relatorio em pdf*/
  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('content', { static: false }) el1!: ElementRef;

  printpdf(valorprint: string) {
    if (valorprint == '1') {
      let pdf = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [970, 1400],
        compress: true,
        precision: 1
      });
      pdf.html(this.el.nativeElement, {
        callback: (pdf) => {
          pdf.save("Venda_Produtos_Analitico.pdf");
        }
      })
    } else if (valorprint == '2') {
      let pdf = new jsPDF({
        orientation: "l",
        unit: "pt",
        format: [1030, 1105],
        compress: true,
        precision: 2
      });
      pdf.html(this.el1.nativeElement, {
        callback: (pdf) => {
          pdf.save("Venda_Produtos_Sintético.pdf");
        }
      })

    }
  }

  public InputEmpresa() {
    this.dialog.open(InputempresaComponent, {
      disableClose: true
    })
  }
}
