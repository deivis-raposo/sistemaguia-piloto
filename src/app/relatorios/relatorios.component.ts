import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../_services/snack-bar.service';
import { RelatorioVendacategoriaExportComponent } from '../relatorio-venda-categoria-export/relatorio-venda-categoria-export.component';
import { RelatorioExtratoMovicombustivelExportComponent } from '../relatorio-extrato-movicombustivel-export/relatorio-extrato-movicombustivel-export.component';
import { RelatorioVendaDiariaProdutosExportComponent } from '../relatorio-venda-diaria-produtos-export/relatorio-venda-diaria-produtos-export.component';
import { RelatorioVendaDiariaCombustivelComponent } from '../relatorio-venda-diaria-combustivel/relatorio-venda-diaria-combustivel.component';
import { RelatorioVendaCartoesDiaComponent } from '../relatorio-venda-cartoes-dia/relatorio-venda-cartoes-dia.component';
import { trigger, transition, animate, style, state, stagger } from '@angular/animations'

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: '1'

      })),
      state('closed', style({
        opacity: '0'
      })),
      transition('open => closed', [

        animate('1.2s')
      ]),
      transition('closed => open', [
        animate('0.8s')
      ])

    ]),
    trigger('openCloses', [
      // ...

      state('open', style({
        opacity: '0'

      })),
      state('closed', style({
        opacity: '1'
      })),
      transition('open => closed', [
        animate('1.2s')


      ]),
      transition('closed => open', [
        animate('0.8s')

      ])

    ]),
  ],

})
export class RelatoriosComponent implements OnInit {


  constructor(private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }



  public relatorioVendaCategoria() {
    this.dialog.open(RelatorioVendacategoriaExportComponent, {
      disableClose: true
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }

  public relatorioExtratoMovimentoCombustivel() {
    this.dialog.open(RelatorioExtratoMovicombustivelExportComponent, {
      disableClose: true,
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }

  public relatorioVendaDiariaProdutos() {
    this.dialog.open(RelatorioVendaDiariaProdutosExportComponent, {
      disableClose: true,
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }

  public relatorioVendaDiariaCombustivel() {
    this.dialog.open(RelatorioVendaDiariaCombustivelComponent, {
      disableClose: true,
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }

  public relatorioVendaCartoesDia() {
    this.dialog.open(RelatorioVendaCartoesDiaComponent, {
      disableClose: true,
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }


  /*Muda o display de acordo com qual relatórios foi selecionado*/
  isOpen = true;

  public tipoRelatorio: string = 'block';
  public relatorioProdutos: string = 'none';
  public relatorioFinanceiro: string = 'none';

  public mudarRelatorio(tprelatorio: string) {



    this.isOpen = !this.isOpen;

    switch (tprelatorio) {
      case 'produtos': {
        this.tipoRelatorio = 'none';
        this.relatorioProdutos = 'block';
        break;
      }
      case 'financeiro': {
        this.tipoRelatorio = 'none';
        this.relatorioFinanceiro = 'block';
        break;
      }


      case 'fechar': {
        this.relatorioProdutos = 'none';
        this.relatorioFinanceiro = 'none';
        this.tipoRelatorio = 'block';
        break;
      }
      default:
        break;
    }


  }

  members: { title: string, subtitle: string, content: string, url: string }[] = [
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
    { title: 'Title', subtitle: 'Subtitle', content: 'Content here', url: 'https://material.angular.io/assets/img/examples/shiba2.jpg' },
  ];
}


