import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  public sideNavBar!: MatSidenav;
  public shared!: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {

  }

  public openSideNav(){
    this.sideNavBar.toggle();
  }

  public logout(){
    window.location.href = '/login';
    window.location.reload();
  }

}
