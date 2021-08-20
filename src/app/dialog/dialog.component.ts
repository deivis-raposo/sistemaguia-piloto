import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {

    if(data.msg != null) {
      this.dialogMsg = data.msg;
    }

    if(data.leftButton != null) {
      this.leftButtonLabel = data.leftButton;
    }

    if(data.rightButton != null) {
      this.rightButtonLabel = data.rightButton;
    }

  }

  ngOnInit(): void {
  }

  public dialogMsg = 'Você deseja confirmar essa ação?';
  public leftButtonLabel = 'Botão esquerdo';
  public rightButtonLabel = 'Botão direito';

  public cancelAction(): void{
    this.dialogRef.close(false);
  }

  public confirmAction(): void{
      this.dialogRef.close(true);
  }

}
