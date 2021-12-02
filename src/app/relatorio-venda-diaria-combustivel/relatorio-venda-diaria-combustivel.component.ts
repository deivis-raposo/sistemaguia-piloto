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
import { VendaDiariaCombustivelService } from '../_services/venda-diaria-combustivel.service';
import { ExtratoMovimentoCombustivelDTO } from '../_models/extrato-movimento-combustivel-dto';



@Component({
  selector: 'app-relatorio-venda-diaria-combustivel',
  templateUrl: './relatorio-venda-diaria-combustivel.component.html',
  styleUrls: ['./relatorio-venda-diaria-combustivel.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class RelatorioVendaDiariaCombustivelComponent implements OnInit {

  public nomeEmpre: any = '';
  public displayForm: Boolean = true;
  public gerandoRelatorio = '';

  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public vendaDiariaCombustivelDTO!: ExtratoMovimentoCombustivelDTO;
  public displayProgressBar: boolean = false;




  shared: SharedService;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private vendaCategoriaService: VendaDiariaCombustivelService,
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
      dtFim: []
    })
    this.isFormReady = true;
    this.displayProgressBar = false;
  }

  public gerarRelatorio() {
    this.displayForm = false;
    this.nomeEmpre = localStorage.getItem('nomeempresa');
    this.gerandoRelatorio = "Gerando Relatório";
    this.displayProgressBar = true;

    this.vendaDiariaCombustivelDTO = new ExtratoMovimentoCombustivelDTO(new Date, new Date)
    this.vendaDiariaCombustivelDTO.dtInicioFiltro = this.relatorioModeloForm.value['dtInicio'];
    this.vendaDiariaCombustivelDTO.dtFimFiltro = this.relatorioModeloForm.value['dtFim'];
    this.vendaCategoriaService.printReport(this.vendaDiariaCombustivelDTO,
      this.shared.user.cdEmpresa, this.nomeEmpre).subscribe((data: any) => {
        this.displayProgressBar = false;
        this.gerandoRelatorio = "Relatório Gerado";
        let file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }, (err: any) => {
        this.displayProgressBar = false;
        this.gerandoRelatorio = "";
        this.snackbarService.showSnackBar('Não foi possível gerar o relatório. Tente novamente!', 'OK');
      });
  }

  public cancelar() {
    this.closeModelEventEmitter.emit(false);
  }

}



