import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Usuario } from '../_models/usuario.model';
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

  @Input() public actionName = 'Editar';
  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editableUser !: Usuario;
  @ViewChild('usuarioFormDirective') public usuarioFormDirective !: FormGroupDirective;

  public isFormReady = false;
  public usuarioForm !: FormGroup;

  selectedValue!: string;

  profiles: Profile[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'GERENTE', viewValue: 'GERENTE'},
    {value: 'FRENTISTA', viewValue: 'FRENTISTA'}
  ];

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService,
    private snackbarService: SnackBarService) {


  }



  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      id: [this.editableUser != null ? this.editableUser.id : ''],
      senha: [this.editableUser != null ? this.editableUser.senha : ''],
      stAcesso: [this.editableUser != null ? this.editableUser.stAcesso : ''],
      nmUsuario: [this.editableUser != null ? this.editableUser.nmUsuario : '', Validators.required],
      emailUsuario: [this.editableUser != null ? this.editableUser.emailUsuario : '', Validators.required],
      cpfUsuario: [this.editableUser != null ? this.editableUser.cpfUsuario : '', Validators.required],
      nuTelefone: [this.editableUser != null ? this.editableUser.nuTelefone : '', Validators.required],
      profile: [this.editableUser != null ? this.editableUser.profile : '', Validators.required]
    })
    this.isFormReady = true;
  }

  public cancel(){
    this.closeModelEventEmitter.emit(false);
  }

  public save(){

    if(this.usuarioForm.valid){

      if(this.actionName == 'Editar') {
        var updatedUsuario = {
          //guid: this.editableUser.guid,
          name: this.usuarioForm.value['name']
        };
        this.usuarioService.updateUsuario(this.usuarioForm.value)
          .subscribe((resp: any) => {
              this.closeModelEventEmitter.emit(true);
          }, (err: any) => {
            this.snackbarService.showSnackBar('Não foi possível atualizar o usuário. Tente novamente!', 'OK');
          });
      } else {
        this.usuarioService.saveUsuario(this.usuarioForm.value)
        .subscribe((resp: any) => {
            this.closeModelEventEmitter.emit(true);
        }, (err: any) => {
          this.snackbarService.showSnackBar('Não foi possível criar um novo usuário. Tente novamente!', 'OK');
        });
      }
    }
  }
}
