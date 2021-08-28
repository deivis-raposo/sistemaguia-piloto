import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';


@Component({
  selector: 'app-relatorio-modelo-form',
  templateUrl: './relatorio-modelo-form.component.html',
  styleUrls: ['./relatorio-modelo-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class RelatorioModeloFormComponent implements OnInit {


  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private usuarioService: UsuarioService,
              private snackbarService: SnackBarService,
              private adapter: DateAdapter<any>) {
  }

  french() {
    this.adapter.setLocale('pt');
  }

  ngOnInit(): void {
    this.relatorioModeloForm = this.formBuilder.group({
      nmUsuario: ['', Validators.required],
      dtInicio: [''],
      dtFim: [''],
      tpRelatorio: [0]
    })
    this.isFormReady = true;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(true);
  }

  public gerarRelatorio(){
    console.log('DT Inicio: ' + this.relatorioModeloForm.value['dtInicio']);
    console.log('DT Fim: ' + this.relatorioModeloForm.value['dtFim']);
    console.log('TP RELATÓRIO: ' + this.relatorioModeloForm.get('tpRelatorio')?.value);

    this.closeModelEventEmitter.emit(true);

    this.router.navigate(['/venda-categoria']);
  }
}
