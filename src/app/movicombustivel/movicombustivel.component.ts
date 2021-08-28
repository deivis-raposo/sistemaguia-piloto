import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RelatorioModeloEditComponent } from '../relatorio-modelo-edit/relatorio-modelo-edit.component';
import { SnackBarService } from '../_services/snack-bar.service';
import { InputempresaComponent } from '../inputs-pesquisa/inputempresa/inputempresa.component';




@Component({
  selector: 'app-movicombustivel',
  templateUrl: './movicombustivel.component.html',
  styleUrls: ['./movicombustivel.component.css']
})
export class MovicombustivelComponent implements OnInit {


  constructor(private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  public InputEmpresa() {
    this.dialog.open(InputempresaComponent, {
      disableClose: true
    })
  }





}
