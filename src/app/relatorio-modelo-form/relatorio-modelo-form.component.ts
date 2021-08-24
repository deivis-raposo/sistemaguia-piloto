import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../_services/snack-bar.service';
import { UsuarioService } from '../_services/usuario.service';


@Component({
  selector: 'app-relatorio-modelo-form',
  templateUrl: './relatorio-modelo-form.component.html',
  styleUrls: ['./relatorio-modelo-form.component.css']
})
export class RelatorioModeloFormComponent implements OnInit {


  @Output() closeModelEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public relatorioModeloForm !: FormGroup;
  public isFormReady = false;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private snackbarService: SnackBarService) {


  }
  ngOnInit(): void {
    this.relatorioModeloForm = this.formBuilder.group({
      nmUsuario: ['', Validators.required]
    })
    this.isFormReady = true;
  }

  public cancel() {
    this.closeModelEventEmitter.emit(true);
  }

  public gerarRelatorio() {
    this.closeModelEventEmitter.emit(true);
  }

}
