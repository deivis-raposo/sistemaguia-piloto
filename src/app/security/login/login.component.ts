import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/_models/current-user.model';
import { User } from 'src/app/_models/user.model';
import { SharedService } from 'src/app/_services/shared.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { UsuarioService } from 'src/app/_services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'') ;
  shared!: SharedService;
  message!: string;

  public loginForm !: FormGroup;
  public isFormReady = false;
  @Input() public editableUser !: User;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private snackbarService: SnackBarService,
              private snackBarService: SnackBarService,
              private router: Router) {

              this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginUsuario: [this.editableUser != null ? this.editableUser.loginUsuario : '', Validators.required],
      senha: [this.editableUser != null ? this.editableUser.senha : '', Validators.required]
    })
    this.isFormReady = true;
  }

  public login(){

    this.user.loginUsuario = this.loginForm.value.loginUsuario;
    this.user.senha = this.loginForm.value.senha;

    this.usuarioService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.user = userAuthentication.user;
      if(this.shared.user != null){
        this.shared.user.profile = this.shared.user.profile;//.substring(5);
      }
      this.shared.showTemplate.emit(true);
      if(userAuthentication.user != null){
        let infoSessionUser =
          userAuthentication.user.idUsuario + "," +
          userAuthentication.user.loginUsuario + "," +
          userAuthentication.user.profile;
        let infoSessionCurrentUser = userAuthentication.token;
        sessionStorage.setItem("currentUser", infoSessionUser+"|"+infoSessionCurrentUser);
      }
      this.router.navigate(['/']);
    }, err => {
      console.log('6');
      this.snackBarService.showSnackBar('Não foi possível autenticar!', 'OK');
    });

  }

  //this.shared.usuario.profile = this.shared.usuario.profile;//.substring(5);

  cancelLogin(){
    this.message = '';
    this.user = new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'') ;
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
