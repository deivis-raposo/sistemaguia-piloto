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
/*export interface Transaction {
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
  selector: 'app-relatorio-modelo-form',
  templateUrl: './relatorio-modelo-form.component.html',
  styleUrls: ['./relatorio-modelo-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RelatorioModeloFormComponent implements OnInit {

  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;
  Data = Date.now();
  public dataSource: any[] = [];
  public vendaCategoriaDTO!: VendaCategoriaDTO;

  public isFiltro: boolean = true;
  public isAnalitico: boolean = false;
  public isSintetico: boolean = false;

  /*tabela relatorio venda por categoria*/
  displayedColumns = ['codigo', 'descricao', 'un', 'quantidade', 'pmv', 'valorbruto', 'desc', 'acres', 'valorliquido'];
  /*transactions: Transaction[] = [
    { descricao: 'Gasolina', quantidade: 4, codigo: '1001', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
    { descricao: 'Óleo', quantidade: 5, codigo: '1004', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
    { descricao: 'Etanol', quantidade: 2, codigo: '1007', un: 'LT', pmv: 5, valorbruto: 4000, desc: 0, acres: 0, valorliquido: 3000 },
  ];*/

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

  public gerarRelatorio(){

    //Analítico
    if(this.relatorioModeloForm.value['tpRelatorio'] == 1) {
      this.vendaCategoriaDTO = new VendaCategoriaDTO(11,0,new Date,new Date,0,0,'','',0,'','',0,0,0,0,0,0);
      this.vendaCategoriaDTO.dtInicioFiltro = this.relatorioModeloForm.value['dtInicio'];
      this.vendaCategoriaDTO.dtFimFiltro    = this.relatorioModeloForm.value['dtFim'];
      this.vendaCategoriaService.getVendasCategoria(this.vendaCategoriaDTO).subscribe((resp: VendaCategoriaDTO[]) => {
        this.dataSource = resp;
      }, (error: any) => {
        console.log(`Ocorreru um erro ao chamar a API ${error}`)
      })

      this.isFiltro = false;
      this.isAnalitico = true;
      this.isSintetico = false;
    } else if(this.relatorioModeloForm.value['tpRelatorio'] == 2) {
      //sintético
      this.isFiltro = false;
      this.isAnalitico = false;
      this.isSintetico = true;
    }
  }

  public home(){
    this.closeModelEventEmitter.emit(false);
    this.router.navigate(['/']);
  }

  getTotalquantidade() {
    //return this.transactions.map(t => t.quantidade).reduce((acc, value) => acc + value, 0);
    return 0;
  }

  getTotalvalorbruto() {
    //return this.transactions.map(t => t.valorbruto).reduce((acc, value) => acc + value, 0);
    return 0;
  }

  getTotalvalorliquido() {
    //return this.transactions.map(t => t.valorliquido).reduce((acc, value) => acc + value, 0);
    return 0;
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
