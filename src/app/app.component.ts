import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './_models/menu.model';
import { MenuService } from './_services/menu.service';
import { SharedService } from './_services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showTemplate: boolean = false;
  public shared!: SharedService;

  model: Menu[] = [];

  constructor(private rota: Router, private menuService: MenuService){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )
  }

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }

  router(item: Menu){
    this.rota.navigate([item.uriMenu]);
  }

  carregarMenu(){
    this.menuService.getMenuByPerfilAndEmpresa(this.shared.user.idPerfil, this.shared.user.cdEmpresa).subscribe((resp: Menu[]) => {
      this.model = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }
}
