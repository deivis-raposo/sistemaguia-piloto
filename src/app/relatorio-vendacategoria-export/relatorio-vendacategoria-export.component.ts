import { Byte } from '@angular/compiler/src/util';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VendaCategoriaDTO } from '../_models/venda-categoria-dto';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';
import { VendaCategoriaService } from '../_services/venda-categoria.service';
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
    console.log("gerarRelatorio");
    this.displayProgressBar = true;
    this.nomeEmpre = localStorage.getItem('nomeempresa');

    this.vendaCategoriaDTO = new VendaCategoriaDTO(0, 0, new Date, new Date, 0, 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0);
    this.vendaCategoriaDTO.dtInicioFiltro = this.relatorioModeloForm.value['dtInicio'];
    this.vendaCategoriaDTO.dtFimFiltro = this.relatorioModeloForm.value['dtFim'];

    this.vendaCategoriaService.printReport(this.vendaCategoriaDTO,
      this.relatorioModeloForm.value['tpRelatorio'],
      this.shared.user.cdEmpresa, this.nomeEmpre).subscribe((data: any) => {
        this.displayProgressBar = false;
        let file = new Blob([data], { type: 'application/pdf' });
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




  /* faz o usuario preencher todos os inputs se nao mostra mensagem*/

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

  tiporelatorio: string = '';

  mudarRelatorio(tipo: string) {
    this.tiporelatorio = tipo;
  }

}



