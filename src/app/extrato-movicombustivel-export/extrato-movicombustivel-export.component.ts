import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { InputempresaComponent } from '../inputs-pesquisa/inputempresa/inputempresa.component';
import { VendaCategoriaDTO } from '../_models/venda-categoria-dto';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';
import { VendaCategoriaService } from '../_services/vendacategoria.service';

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

}
@Component({
  selector: 'app-extrato-movicombustivel-export',
  templateUrl: './extrato-movicombustivel-export.component.html',
  styleUrls: ['./extrato-movicombustivel-export.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]

})
export class ExtratoMovicombustivelExportComponent implements OnInit {



  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public vendaCategoriaDTO!: VendaCategoriaDTO;

  public isFiltro: boolean = true;
  public isAnalitico: boolean = false;
  public isSintetico: boolean = false;


  displayedColumns = ['codigo', 'descricao', 'produto', 'un', 'quantidade', 'pmv', 'valorbruto', 'desc', 'acres'];
  displayedColumnsSintetico = ['codigo', 'descricao', 'quantidade', 'valorbruto', 'desc', 'acres'];


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private vendaCategoriaService: VendaCategoriaService,
    private snackbarService: SnackBarService,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog) {
  }

  french() {
    this.adapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.relatorioModeloForm = this.formBuilder.group({
      nmUsuario: ['', Validators.required],
      dtInicio: [],
      dtFim: [],
      tpRelatorio: [0]
    })
    this.isFormReady = true;
    this.isFiltro = true;
    this.isAnalitico = false;
    this.isSintetico = false;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public gerarRelatorio() {


    this.vendaCategoriaDTO = new VendaCategoriaDTO(11, 0, new Date, new Date, 0, 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0);
    this.vendaCategoriaDTO.dtInicioFiltro = this.relatorioModeloForm.value['dtInicio'];
    this.vendaCategoriaDTO.dtFimFiltro = this.relatorioModeloForm.value['dtFim'];
    this.vendaCategoriaService.getVendasCategoria(this.vendaCategoriaDTO, this.relatorioModeloForm.value['tpRelatorio'], 0).subscribe((resp: VendaCategoriaDTO[]) => {
      this.dataSource = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })

    if (this.relatorioModeloForm.value['tpRelatorio'] == 1) {
      this.isFiltro = false;
      this.isAnalitico = true;
      this.isSintetico = false;
    } else {
      this.isFiltro = false;
      this.isAnalitico = false;
      this.isSintetico = true;
    }
  }

  public cancelar() {
    this.closeModelEventEmitter.emit(false);


  }

  getTotalquantidade() {
    return this.dataSource.map(t => t.qtdProduto).reduce((acc, value) => acc + value, 0);
  }

  getTotalvalorbruto() {
    return this.dataSource.map(t => t.vlrBruto).reduce((acc, value) => acc + value, 0);
  }

  getTotalPMV() {
    return this.dataSource.map(t => t.vlrVenda).reduce((acc, value) => acc + value, 0);
  }

  getTotalvalorliquido() {
    return this.dataSource.map(t => t.vlrLiquido).reduce((acc, value) => acc + value, 0);
  }


  getTotalvalorAcrescimo() {
    return this.dataSource.map(t => t.vlrAcrescimo).reduce((acc, value) => acc + value, 0);
  }

  getTotalvalorDesconto() {
    return this.dataSource.map(t => t.vlrDesconto).reduce((acc, value) => acc + value, 0);
  }



  /* mostra a data  pesquisa relatorio*/



  datainicial: any;
  datafinal: any;

  dateRangeChange(dtInicial: HTMLInputElement, dtFIm: HTMLInputElement) {
    this.datainicial = dtInicial.value;
    this.datafinal = dtFIm.value;
  }


  /* transforma relatorio em pdf*/
  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('content1', { static: false }) el1!: ElementRef;

  printpdf(valorprint: string) {
    if (valorprint == '1') {
      let pdf = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [970, 1000],
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
        format: [999, 700],
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


  tiporelatorio: string = '';

  mudarRelatorio(tipo: string) {
    this.tiporelatorio = tipo;
  }
}
