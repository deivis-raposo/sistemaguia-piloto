import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shared : SharedService;
  constructor(
    private router: Router){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
  }

}
