import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { InputempresaComponent } from '../inputs-pesquisa/inputempresa/inputempresa.component';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';
import { Produto } from '../_models/produto.model';
import { ExtratoMovimentoCombustivelService } from '../_services/extrato-movimento-combustivel.service';
import { ProdutoService } from '../_services/produto.service';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';

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

  public relatorioForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public produtos: Produto[] = [];
  public extratoMovimentoCombustivelDTO!: ExtratoMovimentoCombustivelDTO;
  selectedValueProduto!: number;
  public descProdutoSelecionado: string = '';

  public isFiltro: boolean = true;
  public isProduto: boolean = false;
  public isTanque: boolean = false;


  displayedColumns = ['data', 'estoqueInicial', 'entrada', 'venda', 'afericao', 'estoqueContabil', 'estoqueFisico', 'diferenca'];
  displayedColumnsTanque = ['data', 'nuTanque', 'estoqueInicial', 'entrada', 'venda', 'afericao', 'estoqueContabil', 'estoqueFisico', 'ajusteSobra', 'ajustePerda', 'diferenca'];

  shared : SharedService;
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

    this.buscarProduto();
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

    this.descProdutoSelecionado = (this.relatorioForm.value['produto'].codProduto) + ' - ' + (this.relatorioForm.value['produto'].descProduto);
    this.extratoMovimentoCombustivelDTO = new ExtratoMovimentoCombustivelDTO(new Date, new Date, '', new Date, 0, 0, 0, 0, 0, 0, 0,'',0,0,'') ;
    this.extratoMovimentoCombustivelDTO.dtInicioFiltro = this.relatorioForm.value['dtInicio'];
    this.extratoMovimentoCombustivelDTO.dtFimFiltro = this.relatorioForm.value['dtFim'];
    this.extratoCombustivelService.getExtratoMovimentoCombustivel(this.extratoMovimentoCombustivelDTO,
                                                  this.relatorioForm.value['tpRelatorio'],
                                                  this.shared.user.cdEmpresa,
                                                  this.relatorioForm.value['produto'].codProduto).subscribe((resp: ExtratoMovimentoCombustivelDTO[]) => {
      this.dataSource = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })

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

  getTotalvalorentrada() {
    return;
  }

  getTotalvalorvenda() {
    return;
  }


  getTotalvalorafericao() {
    return;
  }

  getTotalvalordiferenca() {
    return;
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




  tiporelatorio: string = '';

  mudarRelatorio(tipo: string) {
    this.tiporelatorio = tipo;
  }
}
