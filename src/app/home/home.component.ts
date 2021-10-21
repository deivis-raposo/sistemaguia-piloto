import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';
import { SharedService } from '../_services/shared.service';

export interface Menu {
  cod: number;
  desc: string;
}

const ELEMENT_MENU: Menu[] = [
  { cod: 1, desc: 'Item 1' },
  { cod: 2, desc: 'Item 2' },
  { cod: 3, desc: 'Item 3' },
  { cod: 4, desc: 'Item 4' },
  { cod: 5, desc: 'Item 5' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(){

  }

  ngOnInit(): void {

  }

}
