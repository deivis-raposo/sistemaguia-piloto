import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PerfilEditComponent } from '../perfil-edit/perfil-edit.component';
import { Perfil } from '../_models/perfil.model';
import { PerfilService } from '../_services/perfil.service';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { trigger, transition, animate, style, state, stagger, } from '@angular/animations'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'descricao', 'actions'];
  public dataSource: Perfil[] = [];
  shared: SharedService;
  public dataSourcerro: boolean = false;
  exibeEmpresas: boolean = false;
  isOpen = true;


  constructor(
    private dialog: MatDialog,
    private perfilService: PerfilService,
    private snackBarService: SnackBarService) {
    this.shared = SharedService.getInstance();


  }

  ngOnInit(): void {
    this.loadAllPerfis();

  }

  private loadAllPerfis() {

    this.perfilService.getAll().subscribe((resp: Perfil[]) => {
      this.dataSource = resp;
      this.exibeEmpresas = true;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`);
      this.dataSourcerro = true;
    })
  }

  public atribuirMenu(perfil: Perfil) {
    this.dialog.open(PerfilEditComponent, {
      disableClose: true, data: { editablePerfil: perfil }
    }).afterClosed().subscribe(resp => {
      if (resp) {
        this.loadAllPerfis();
        this.snackBarService.showSnackBar('Perfil atribuído com sucesso!', 'OK');
      }
    })
  }

  public deletePerfil(perfil: Perfil) {

  }

  public createNewPerfil() {

  }
}


