import { Byte } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { VendaCategoriaDTO } from '../_models/venda-categoria-dto';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';
import { VendaCategoriaService } from '../_services/vendacategoria.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

/*tabela relatorio venda por categoria
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
}*/

@Component({
  selector: 'app-relatorio-vendacategoria-export',
  templateUrl: './relatorio-vendacategoria-export.component.html',
  styleUrls: ['./relatorio-vendacategoria-export.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})



export class RelatorioVendacategoriaExportComponent implements OnInit {

  public nomeEmpre: any = '';

  produtos = [{ produto: 'Gasolina comum' }, { produto: 'Etanol Hidratado Comum' }]


  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public vendaCategoriaDTO!: VendaCategoriaDTO;

  public isFiltro: boolean = true;
  public isAnalitico: boolean = false;
  public isSintetico: boolean = false;
  public displayProgressBar: boolean = false;


  displayedColumns = ['codigo', 'quantidade', 'produto', 'un', 'pmv', 'valorbruto', 'desc', 'acres', 'valorliquido'];
  displayedColumnsSintetico = ['codigo', 'quantidade', 'valorbruto', 'desc', 'acres', 'valorliquido'];

  shared: SharedService;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private vendaCategoriaService: VendaCategoriaService,
    private snackbarService: SnackBarService,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog) {

    this.shared = SharedService.getInstance();
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
    this.displayProgressBar = false;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public gerarRelatorio() {
    console.log ( "gerarRelatorio");
    this.displayProgressBar = true;
    this.nomeEmpre = localStorage.getItem('nomeempresa');

    this.vendaCategoriaDTO = new VendaCategoriaDTO(0, 0, new Date, new Date, 0, 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0);
    this.vendaCategoriaDTO.dtInicioFiltro = this.relatorioModeloForm.value['dtInicio'];
    this.vendaCategoriaDTO.dtFimFiltro = this.relatorioModeloForm.value['dtFim'];

    this.vendaCategoriaService.printReport(this.vendaCategoriaDTO,
      this.relatorioModeloForm.value['tpRelatorio'],
      this.shared.user.cdEmpresa, this.nomeEmpre).subscribe((data: any) =>{
        this.displayProgressBar = false;
        let file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        //const file = new Blob([response], {type: 'application/pdf'});
        //FileSaver.saveAs(file, "test.pdf");
      }, (err: any) => {
        this.displayProgressBar = false;
        this.snackbarService.showSnackBar('Não foi possível gerar o relatório. Tente novamente!', 'OK');
      });

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



  datainicial: any = '';
  datafinal: any = '';


  dateRangeChange(dtInicial: HTMLInputElement, dtFIm: HTMLInputElement) {
    this.datainicial = dtInicial.value;
    this.datafinal = dtFIm.value;
  }

  getErrorMessage(): any {
    if (this.tiporelatorio === '' && this.datainicial !== '') {
      return 'Selecione o tipo de Relatório';
    } else if (this.datainicial === '' && this.tiporelatorio !== '') {
      return 'Selecione uma Data';
    } else { return '' }

  }



  /* transforma relatorio em pdf*/
  @ViewChild('content', { static: false }) el!: ElementRef;
  @ViewChild('content1', { static: false }) el1!: ElementRef;

  printpdf(valorprint: string) {
    localStorage.clear
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



  tiporelatorio: string = '';

  mudarRelatorio(tipo: string) {
    this.tiporelatorio = tipo;
  }


}



