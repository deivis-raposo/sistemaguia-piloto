import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Empresa } from '../_models/empresa.model';
import { MenuPerfil } from '../_models/menu-perfil.model';
import { Menu } from '../_models/menu.model';
import { Perfil } from '../_models/perfil.model';
import { EmpresaService } from '../_services/empresa.service';
import { MenuService } from '../_services/menu.service';
import { PerfilService } from '../_services/perfil.service';
import { SharedService } from '../_services/shared.service';
import { SnackBarService } from '../_services/snack-bar.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit {

  @Input() public actionName = 'Editar';
  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() public editablePerfil !: Perfil;
  @ViewChild('usuarioFormDirective') public usuarioFormDirective !: FormGroupDirective;

  perfil = new Perfil(0,'') ;
  public isFormReady = false;
  public displayProgressBar: boolean = false;
  public perfilForm !: FormGroup;
  shared : SharedService;
  selectedValueEmpresa!: Empresa;
  selectedValueMenu!: Menu[];

  public menus: Menu[] = [];
  public empresas: Empresa[] = [];
  public menuPerfil!: MenuPerfil;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private empresaService: EmpresaService,
    private snackbarService: SnackBarService,
    ) {
      this.shared = SharedService.getInstance();
      this.menuPerfil = new MenuPerfil(new Perfil(0,''), new Empresa(0, ''), this.menus);
    }

  ngOnInit(): void {

    this.perfilForm = this.formBuilder.group({
      empresa: ['', Validators.required],
      menu: ['', Validators.required]
    })

    this.perfil = this.editablePerfil;
    this.isFormReady = true;
    this.findAllMenu();
    this.findAllEmpresa();
    this.displayProgressBar = false;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(false);
  }

  public findAllMenu(){
    this.menuService.getAll().subscribe((resp: Menu[]) => {
      this.menus = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }

  public findAllEmpresa(){
    this.empresaService.getAll().subscribe((resp: Empresa[]) => {
      this.empresas = resp;
    }, (error: any) => {
      console.log(`Ocorreru um erro ao chamar a API ${error}`)
    })
  }

  public save(){

    this.menuPerfil.empresa = this.selectedValueEmpresa;
    this.menuPerfil.perfil  = this.editablePerfil;
    this.menuPerfil.menu    = this.selectedValueMenu;

    this.menuService.saveMenuPerfil(this.menuPerfil)
          .subscribe((resp: any) => {
            this.closeModelEventEmitter.emit(true);
            this.displayProgressBar = false;
          }, (err: any) => {
            this.displayProgressBar = false;
            this.snackbarService.showSnackBar('Não foi possível atribuir os menus ao perfil. Tente novamente!', 'OK');
          });
  }

}
