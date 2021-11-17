import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../_services/snack-bar.service';
import { RelatorioVendacategoriaExportComponent } from '../relatorio-venda-categoria-export/relatorio-venda-categoria-export.component';
import { RelatorioExtratoMovicombustivelExportComponent } from '../relatorio-extrato-movicombustivel-export/relatorio-extrato-movicombustivel-export.component';
import { RelatorioVendaDiariaProdutosExportComponent } from '../relatorio-venda-diaria-produtos-export/relatorio-venda-diaria-produtos-export.component';
import { RelatorioVendaDiariaCombustivelComponent } from '../relatorio-venda-diaria-combustivel/relatorio-venda-diaria-combustivel.component';
@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  panelOpenState = false;


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




  /*
  public filtroReport() {
    this.dialog.open(RelatorioModeloEditComponent, {
      disableClose: true
    }).afterClosed().subscribe(resp => {
      if (resp) {
        //this.loadAllUser();
        this.snackBarService.showSnackBar('Relatório gerado com sucesso!', 'OK');
      }
    })
  }


  */
}
