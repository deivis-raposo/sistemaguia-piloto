import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorio-modelo-edit',
  templateUrl: './relatorio-modelo-edit.component.html',
  styleUrls: ['./relatorio-modelo-edit.component.css']
})
export class RelatorioModeloEditComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RelatorioModeloEditComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any) {


  }

  ngOnInit(): void {
  }

  public closeModalWindow($event: any){
    if($event != null) this.dialogRef.close($event);
  }

}
