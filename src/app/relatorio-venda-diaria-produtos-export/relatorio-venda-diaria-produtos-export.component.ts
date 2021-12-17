import { Byte } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';
import { VendaDiariaProdutosService } from '../_services/venda-diaria-produtos.service';
import { VendaCategoriaService } from '../_services/venda-categoria.service';
@Component({
  selector: 'app-relatorio-venda-diaria-produtos-export',
  templateUrl: './relatorio-venda-diaria-produtos-export.component.html',
  styleUrls: ['./relatorio-venda-diaria-produtos-export.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class RelatorioVendaDiariaProdutosExportComponent implements OnInit {


  public nomeEmpre: any = '';
  produtos = [{ produto: 'Gasolina comum' }, { produto: 'Etanol Hidratado Comum' }]

  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];

  public displayProgressBar: boolean = false;




  shared: SharedService;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private vendaDiariaProdutosService: VendaDiariaProdutosService,
    private snackbarService: SnackBarService,
    private adapter: DateAdapter<any>,
  ) {

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
    })
    this.isFormReady = false;
    this.displayProgressBar = false;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public gerarRelatorio() {
    console.log("gerarRelatorio");
    this.displayProgressBar = true;
    this.nomeEmpre = localStorage.getItem('nomeempresa');



  }

  /* faz o usuario preencher todos os inputs se nao mostra mensagem*/

  datainicial: any = '';
  datafinal: any = '';


  dateRangeChange(dtInicial: HTMLInputElement, dtFIm: HTMLInputElement) {
    this.datainicial = dtInicial.value;
    this.datafinal = dtFIm.value;
  }


}



