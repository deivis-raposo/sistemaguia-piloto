import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './_services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showTemplate: boolean = false;
  public shared!: SharedService;

  model: any[] = [];

  constructor(private rota: Router){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    )

    this.model = [
      {label: 'Home', icon: 'home', uri: '/'},
      {label: 'Usuários', icon: 'group', uri: '/usuario'},
      {label: 'Relatório', icon: 'summarize', uri: '/relatorios'}
    ];
  }

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }

  router(item: any){
    this.rota.navigate([item.uri]);
  }

}
