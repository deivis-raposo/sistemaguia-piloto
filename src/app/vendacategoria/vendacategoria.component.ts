import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../_services/snack-bar.service';
import { InputempresaComponent } from '../inputs-pesquisa/inputempresa/inputempresa.component'



@Component({
  selector: 'app-vendacategoria',
  templateUrl: './vendacategoria.component.html',
  styleUrls: ['./vendacategoria.component.css']
})
export class VendacategoriaComponent implements OnInit {



  constructor(private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  public InputEmpresa() {
    this.dialog.open(InputempresaComponent, {
      disableClose: true
    })
  }







}