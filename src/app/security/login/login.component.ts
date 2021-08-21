import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/_models/current-user.model';
import { Usuario } from 'src/app/_models/usuario.model';
import { SharedService } from 'src/app/_services/shared.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { UsuarioService } from 'src/app/_services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario(0,'','','','','','','') ;
  shared!: SharedService;
  message!: string;

  public loginForm !: FormGroup;
  public isFormReady = false;
  @Input() public editableUser !: Usuario;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackbarService: SnackBarService,
              private router: Router) {

              this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      cpfUsuario: [this.editableUser != null ? this.editableUser.cpfUsuario : '', Validators.required],
      senha: [this.editableUser != null ? this.editableUser.senha : '', Validators.required]
    })
    this.isFormReady = true;
  }

  public login(){

    this.usuario.cpfUsuario = this.loginForm.value.cpfUsuario;
    this.usuario.senha = this.loginForm.value.senha;

    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.usuario = userAuthentication.usuario;
      if(this.shared.usuario != null){
        this.shared.usuario.profile = this.shared.usuario.profile;//.substring(5);
      }
      this.shared.showTemplate.emit(true);
      if(userAuthentication.usuario != null){
        let infoSessionUser =
          userAuthentication.usuario.id + "," +
          userAuthentication.usuario.cpfUsuario + "," +
          userAuthentication.usuario.profile;
        let infoSessionCurrentUser = userAuthentication.token;
        sessionStorage.setItem("currentUser", infoSessionUser+"|"+infoSessionCurrentUser);
      }
      this.router.navigate(['/']);
    }, err => {
      console.log('6');
      this.shared.token = '';
      this.usuario.cpfUsuario = '';
      this.shared.usuario.cpfUsuario = '';
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });

  }

  /*
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }
  */
/*
  ngOnInit(): void {
  }
*/
/*
  login() {
    this.message = '';

    this.usuarioService.login(this.usuario).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.usuario = userAuthentication.usuario;
      if(this.shared.usuario != null){
        this.shared.usuario.profile = this.shared.usuario.profile;//.substring(5);
      }
      this.shared.showTemplate.emit(true);
      if(userAuthentication.usuario != null){
        let infoSessionUser =
          userAuthentication.usuario.id + "," +
          userAuthentication.usuario.cpfUsuario + "," +
          userAuthentication.usuario.profile;
        let infoSessionCurrentUser = userAuthentication.token;
        sessionStorage.setItem("currentUser", infoSessionUser+"|"+infoSessionCurrentUser);
      }
      this.router.navigate(['/']);
    }, err => {
      console.log('6');
      this.shared.token = '';
      this.usuario.cpfUsuario = '';
      this.shared.usuario.cpfUsuario = '';
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }
*/

  cancelLogin(){
    this.message = '';
    this.usuario = new Usuario(0, '', '', '', '', '', '','');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

}
