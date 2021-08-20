import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';
import { Usuario } from '../_models/usuario.model';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public displayedColumns: string[] = ['cpf', 'name', 'actions'];
  public dataSource: Usuario[] = [];
  private page: number = 5;
  private count: number = 10;

  constructor(private dialog: MatDialog, private usuarioService: UsuarioService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadAllUser();
  }

  private loadAllUser(){
    this.usuarioService.getAllUsers(this.page, this.count).subscribe((resp: Usuario[]) => {
      this.dataSource = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }

  public editUsuario(inputUser: Usuario){
    this.dialog.open(UsuarioEditComponent, { disableClose: true, data : { editableUser: inputUser}
    }).afterClosed().subscribe(resp => {
      if(resp) {
        this.loadAllUser();
        this.snackBarService.showSnackBar('Usuário editado com sucesso!', 'OK');
      }
    })

  }

  public deleteUsuario(usuario: Usuario){

  }

  public createNewUser(){

  }

}
