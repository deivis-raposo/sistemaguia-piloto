import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Perfil } from '../_models/perfil.model';
import { User } from '../_models/user.model';
import { PerfilService } from '../_services/perfil.service';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';

interface Profile {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {

  public perfis: Perfil[] = [];

  @Input() public actionName = 'Editar';
  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editableUser !: User;
  @ViewChild('usuarioFormDirective') public usuarioFormDirective !: FormGroupDirective;

  user = new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'',0,'','') ;
  public isFormReady = false;
  public usuarioForm !: FormGroup;
  shared : SharedService;

  selectedValuePerfil!: number;

  constructor(
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackbarService: SnackBarService,
              private perfilService: PerfilService
              ) {
                this.shared = SharedService.getInstance();
  }



  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      idUsuario: [this.editableUser != null ? this.editableUser.idUsuario : ''],
      senha: [this.editableUser != null ? this.editableUser.senha : ''],
      nomeUsuario: [this.editableUser != null ? this.editableUser.nomeUsuario : '', Validators.required],
      email: [this.editableUser != null ? this.editableUser.email : '', Validators.required],
      loginUsuario: [this.editableUser != null ? this.editableUser.loginUsuario : '', Validators.required],
      nuTelefone: [this.editableUser != null ? this.editableUser.nuTelefone : '', Validators.required],
      profile: [this.editableUser != null ? this.editableUser.profile : '', Validators.required]
    })
    if(this.actionName === 'Editar'){
      this.selectedValuePerfil = this.editableUser.idPerfil;
    }
    this.isFormReady = true;
    this.findAllPerfil();
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public findAllPerfil(){
    this.perfilService.getAll().subscribe((resp: Perfil[]) => {
      this.perfis = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }

  public save() {

    if (this.usuarioForm.valid) {

      this.user.nomeUsuario   = this.usuarioForm.value.nomeUsuario;
      this.user.loginUsuario  = this.usuarioForm.value.loginUsuario;
      this.user.email         = this.usuarioForm.value.email;
      this.user.nuTelefone    = this.usuarioForm.value.nuTelefone;
      this.user.idFuncionario = this.shared.user.idUsuario;
      this.user.profile       = this.usuarioForm.value.profile;

      if (this.actionName == 'Editar') {
        var updatedUsuario = {
          //guid: this.editableUser.guid,
          name: this.usuarioForm.value['name']
        };
        this.user.idUsuario = this.usuarioForm.value.idUsuario;
        this.user.senha     = this.editableUser.senha;

        this.usuarioService.saveUsuario(this.user)
          .subscribe((resp: any) => {
            this.closeModelEventEmitter.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Não foi possível atualizar o usuário. Tente novamente!', 'OK');
          });
      } else {
        this.user.idUsuario = "";
        this.user.senha     = "";
        this.usuarioService.saveUsuario(this.user)
          .subscribe((resp: any) => {
            this.closeModelEventEmitter.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Não foi possível criar um novo usuário. Tente novamente!', 'OK');
          });
      }
    }
  }
}
