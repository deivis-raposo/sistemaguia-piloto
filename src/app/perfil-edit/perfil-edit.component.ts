import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Perfil } from '../_models/perfil.model';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {

  public editablePerfil !: Perfil;
  public actionName : string = 'Editar';

  constructor(
              private dialogRef: MatDialogRef<PerfilEditComponent>,
              @Inject(MAT_DIALOG_DATA) dialogData: any) {

    if(dialogData.editablePerfil != null) {
      this.editablePerfil = dialogData.editablePerfil;
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
