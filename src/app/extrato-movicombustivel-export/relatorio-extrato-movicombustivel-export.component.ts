import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';
import { Produto } from '../_models/produto.model';
import { ExtratoMovimentoCombustivelService } from '../_services/extrato-movimento-combustivel.service';
import { ProdutoService } from '../_services/produto.service';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';

const doc = new jsPDF()

@Component({
  selector: 'app-relatorio-extrato-movicombustivel-export',
  templateUrl: './relatorio-extrato-movicombustivel-export.component.html',
  styleUrls: ['./relatorio-extrato-movicombustivel-export.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class RelatorioExtratoMovicombustivelExportComponent implements OnInit {

  public nomeEmpre: any = '';
  public nomeProduto: any;

  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public produtos: Produto[] = [];
  public extratoMovimentoCombustivelDTO!: ExtratoMovimentoCombustivelDTO;
  selectedValueProduto: number = 1;
  public descProdutoSelecionado: string = '';

  public isFiltro: boolean = true;
  public isProduto: boolean = false;
  public isTanque: boolean = false;
  public displayProgressBar: boolean = false;


  displayedColumns = ['data', 'estoqueInicial', 'entrada', 'venda', 'afericao', 'estoqueContabil',
    'estoqueFisico', 'diferenca'];
  displayedColumnsTanque = ['data', 'nuTanque', 'estoqueInicial', 'entrada', 'venda', 'afericao',
    'estoqueContabil', 'estoqueFisico', 'diferenca'];

  shared: SharedService;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService,
    private extratoCombustivelService: ExtratoMovimentoCombustivelService,
    private snackbarService: SnackBarService,
    private adapter: DateAdapter<any>,
    private dialog: MatDialog) {

    this.shared = SharedService.getInstance();
  }

  french() {
    this.adapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.relatorioForm = this.formBuilder.group({
      nmUsuario: ['', Validators.required],
      dtInicio: [],
      dtFim: [],
      tpRelatorio: [0],
      produto: ['', Validators.required]
    })
    this.isFormReady = true;
    this.isFiltro = true;
    this.isProduto = false;
    this.isTanque = false;
    this.displayProgressBar = false;
  }

  public buscarProduto() {
    this.produtoService.getAll().subscribe((resp: Produto[]) => {
      this.produtos = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public gerarRelatorio() {
    console.log ( "gerarRelatorio");
    this.displayProgressBar = true;
    this.nomeEmpre = localStorage.getItem('nomeempresa');

    this.extratoMovimentoCombustivelDTO = new ExtratoMovimentoCombustivelDTO(new Date, new Date, '', '' ,0, 0, 0, 0, 0, 0, 0, '', 0, 0,'');
    this.extratoMovimentoCombustivelDTO.dtInicioFiltro = this.relatorioForm.value['dtInicio'];
    this.extratoMovimentoCombustivelDTO.dtFimFiltro = this.relatorioForm.value['dtFim'];

    this.extratoCombustivelService.printReport(this.extratoMovimentoCombustivelDTO,
      this.relatorioForm.value['tpRelatorio'],
      this.shared.user.cdEmpresa, this.nomeEmpre).subscribe((data: any) =>{
        this.displayProgressBar = false;
        let file = new Blob([data], {type: 'application/pdf'});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }, (err: any) => {
        this.displayProgressBar = false;
        this.snackbarService.showSnackBar('Não foi possível gerar o relatório. Tente novamente!', 'OK');
      });

    if (this.relatorioForm.value['tpRelatorio'] == 1) {
      this.isFiltro = false;
      this.isProduto = true;
      this.isTanque = false;
    } else {
      this.isFiltro = false;
      this.isProduto = false;
      this.isTanque = true;
    }
  }

  public cancelar() {
    this.closeModelEventEmitter.emit(false);
  }

  mudarRelatorio(relatorio: string) {
    this.tipoRelatorio = relatorio;
  }
  tipoRelatorio: string = '';


  getErrorMessage(): any {
    if (this.dataInicial === '' && this.selectedValueProduto !== 1 && this.tipoRelatorio !== '') {
      return 'Selecione uma data';
    } else if (this.dataInicial !== '' && this.selectedValueProduto !== 1 && this.tipoRelatorio == '') {
      return 'Selecione o tipo do Relatório';
    } else { return '' }
  }

  dataInicial: any = '';
  dataFinal: any = '';

  dateRangeChange(dtInicial: HTMLInputElement, dtFIm: HTMLInputElement) {
    this.dataInicial = dtInicial.value;
    this.dataFinal = dtFIm.value;
  }


}
