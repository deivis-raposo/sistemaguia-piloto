import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Usuario } from '../_models/usuario.model';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {

  @Input() public actionName = 'Editar';
  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editableUser !: Usuario;
  @ViewChild('usuarioFormDirective') public usuarioFormDirective !: FormGroupDirective;

  public isFormReady = false;
  public usuarioForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private snackbarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nmUsuario: [this.editableUser != null ? this.editableUser.nmUsuario : '', Validators.required]
    })
    this.isFormReady = true;
  }

  public cancel(){
    this.closeModelEventEmitter.emit(false);
  }

  public save(){
    console.log('TODO: Implementar a função save.')
    this.closeModelEventEmitter.emit(true);
  }
}
