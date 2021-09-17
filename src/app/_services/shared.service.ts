import { EventEmitter, Injectable } from '@angular/core';
import { CurrentUser } from '../_models/current-user.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance : SharedService;

  user!: User;
  token!: string;
  cdEmpresa!: number;

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

  getSessionStoreCurrentUser(): CurrentUser {
    if (sessionStorage.getItem("currentUser") == null) {
      return new CurrentUser('', new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'',0,'',''), '' );
    }

  let currentUserSessionStore = sessionStorage.getItem("currentUser");
  let currentUser = new CurrentUser('',new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'',0,'',''), '' );

  if(currentUserSessionStore != null){
    var userToken = currentUserSessionStore.split("|");
    currentUser.token = userToken[1];
    let user = new User('','',0,'','',0,'',0,new Date,0,'','',0,0,'',0,'','') ;
    user.idUsuario = userToken[0].split(",")[0];
    user.loginUsuario = userToken[0].split(",")[1];
    user.profile = userToken[0].split(",")[2];
    currentUser.user = user;
    currentUser.idUsuarioEmpresa = userToken[2];
  }
  return currentUser;
}
}
