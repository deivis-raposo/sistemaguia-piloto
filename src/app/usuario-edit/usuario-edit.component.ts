import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../_models/user.model';
import { Usuario } from '../_models/usuario.model';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  public editableUser !: User;
  public actionName : string = 'Editar';

  constructor(
              private dialogRef: MatDialogRef<UsuarioEditComponent>,
              @Inject(MAT_DIALOG_DATA) dialogData: any) {

    if(dialogData.editableUser != null) {
      this.editableUser = dialogData.editableUser;
    }

    if(dialogData.actionName != null) {
      this.actionName = dialogData.actionName;
    }
  }

  ngOnInit(): void {
  }

  public closeModalWindow($event: any){
    if($event != null) this.dialogRef.close($event);
  }

}
