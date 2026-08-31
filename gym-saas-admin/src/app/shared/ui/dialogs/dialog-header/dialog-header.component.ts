import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DialogConfig } from '../../models';

@Component({
  selector: 'app-dialog-header',
  imports: [
     CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss'
})
export class DialogHeaderComponent {

   @Input({ required: true })
  config!: DialogConfig;

  @Output()
  close = new EventEmitter<void>();

}
