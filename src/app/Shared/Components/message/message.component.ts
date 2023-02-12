import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageData } from '../../Model/MessageData.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  strTitleMessage: string = '';
  strBodyMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageData,
    private dialogRef: MatDialogRef<MessageComponent>
  ) {
    if (data != null) {
      this.strTitleMessage = data.TitleMessage;
      this.strBodyMessage = data.BodyMessage;
    }
  }

  Agree() {
    this.dialogRef.close(1);
  }

  NotAgree() {
    this.dialogRef.close(0);
  }

  ngOnInit(): void {}
}
