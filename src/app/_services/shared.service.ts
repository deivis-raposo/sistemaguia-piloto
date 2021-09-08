import { EventEmitter, Injectable } from '@angular/core';
import { CurrentUser } from '../_models/current-user.model';
import { User } from '../_models/user.model';
import { Usuario } from '../_models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance : SharedService;

  user!: User;
  token!: string;

  showTemplate = new EventEmitter<boolean>();

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }


  isLoggedIn(): boolean{
    if(this.user == null){
      return false;
    }
    return this.user.loginUsuario != '';
  }

/*
  isLoggedIn(): boolean {
    let currentUser: CurrentUser = this.getSessionStoreCurrentUser();
    if ((this.usuario == null || this.usuario.cpfUsuario == '') && currentUser != null) {
      this.usuario = currentUser.usuario;
      this.token = currentUser.token;
      this.showTemplate.emit(true);
      return true;
    }
    return this.usuario.cpfUsuario != '';
  }
*/

  getSessionStoreCurrentUser(): CurrentUser {
    if (sessionStorage.getItem("currentUser") == null) {
      return new CurrentUser('', new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'') );
      //return null;
    }

  let currentUserSessionStore = sessionStorage.getItem("currentUser");

  //let currentUser = new CurrentUser('',null);
  let currentUser = new CurrentUser('',new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'') );

  if(currentUserSessionStore != null){
    var userToken = currentUserSessionStore.split("|");

    currentUser.token = userToken[1];

    let user = new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'') ;
    user.idUsuario = userToken[0].split(",")[0];
    user.loginUsuario = userToken[0].split(",")[1];
    user.profile = userToken[0].split(",")[2];
    currentUser.user = user;
  }

  return currentUser;
}


}
