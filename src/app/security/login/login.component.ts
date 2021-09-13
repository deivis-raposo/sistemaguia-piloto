import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/_models/current-user.model';
import { User } from 'src/app/_models/user.model';
import { UsuarioEmpresa } from 'src/app/_models/usuario-empresa.model';
import { SharedService } from 'src/app/_services/shared.service';
import { SnackBarService } from 'src/app/_services/snack-bar.service';
import { UsuarioEmpresaService } from 'src/app/_services/usuario-empresa.service';
import { UsuarioService } from 'src/app/_services/usuario.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public nomeempressas: any = '20';

  user = new User('', '', 0, '', '', 0, '', 0, new Date, 0, '', '', 0, 0, '', 0);
  shared!: SharedService;
  message!: string;
  idUsuarioEmpresa!: string;
  userAuthenticated!: CurrentUser;

  public displayedColumns: string[] = ['empresa', 'actions'];
  public dataSource: UsuarioEmpresa[] = [];

  public loginForm !: FormGroup;
  public isFormReady = false;
  @Input() public editableUser !: User;

  exibeEmpresas: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private usuarioEmpresaService: UsuarioEmpresaService,
    private snackbarService: SnackBarService,
    private snackBarService: SnackBarService,
    private router: Router) {

    this.shared = SharedService.getInstance();

  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      loginUsuario: [this.editableUser != null ? this.editableUser.loginUsuario : '', Validators.required],
      senha: [this.editableUser != null ? this.editableUser.senha : '', Validators.required],
      idUsuarioEmpresa: [this.editableUser != null ? this.editableUser.cdEmpresa : '', Validators.required]
    })
    this.isFormReady = true;
  }

  public login() {

    this.user.loginUsuario = this.loginForm.value.loginUsuario;
    this.user.senha = this.loginForm.value.senha;

    this.usuarioService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.user = userAuthentication.user;
      if (this.shared.user != null) {
        this.shared.user.profile = this.shared.user.profile;//.substring(5);
      }
      //this.shared.showTemplate.emit(true);
      this.userAuthenticated = userAuthentication;
      /*if(userAuthentication.user != null){
        let infoSessionUser =
          userAuthentication.user.idUsuario + "," +
          userAuthentication.user.loginUsuario + "," +
          userAuthentication.user.profile;
        let infoSessionCurrentUser = userAuthentication.token;
        sessionStorage.setItem("currentUser", infoSessionUser+"|"+infoSessionCurrentUser+"|"+this.idUsuarioEmpresa);
      }*/
      //this.router.navigate(['/']);
      this.buscarEmpresas();
      this.exibeEmpresas = true;
    }, err => {
      console.log('6');
      this.snackBarService.showSnackBar('Não foi possível autenticar!', 'OK');
    });

  }

  buscarEmpresas() {
    if (this.user.loginUsuario != "") {
      this.usuarioEmpresaService.getEmpresasByUser(this.shared.user.loginUsuario).subscribe((resp: UsuarioEmpresa[]) => {
        this.dataSource = resp;
        console.log(" NOME NOME::  " + this.dataSource[0].nomeEmpresa);
      }, (error: any) => {
        console.log(`Ocorreru um erro ao chamar a API ${error}`)
      })
    }
  }

  meuStorage = localStorage;


  public selectedEmpresa(input: UsuarioEmpresa) {

    this.nomeempressas = input.nomeEmpresa;
    this.meuStorage.setItem('nomeempresa', this.nomeempressas)
    console.log(localStorage.getItem('nomeempresa'))




    this.userAuthenticated.user.cdEmpresa = input.codEmpresa;
    if (this.userAuthenticated != null && this.userAuthenticated.user != null) {
      let infoSessionUser =
        this.userAuthenticated.user.idUsuario + "," +
        this.userAuthenticated.user.loginUsuario + "," +
        this.userAuthenticated.user.profile;
      let infoSessionCurrentUser = this.userAuthenticated.token;
      sessionStorage.setItem("currentUser", infoSessionUser + "|" + infoSessionCurrentUser + "|" + input.idUsuarioEmpresa);
    }
    this.shared.showTemplate.emit(true);
    this.router.navigate(['/']);
  }

  //this.shared.usuario.profile = this.shared.usuario.profile;//.substring(5);

  cancelLogin() {
    this.message = '';
    this.user = new User('', '', 0, '', '', 0, '', 0, new Date, 0, '', '', 0, 0, '', 0);
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }
}
