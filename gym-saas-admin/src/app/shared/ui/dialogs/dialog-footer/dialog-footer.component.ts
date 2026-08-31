import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';

import { DialogConfig } from '../../models';

@Component({
  selector: 'app-dialog-footer',
  imports: [
     CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dialog-footer.component.html',
  styleUrl: './dialog-footer.component.scss'
})
export class DialogFooterComponent {
  @Input({required:true})
  config!:DialogConfig;

  @Output()
  primary=new EventEmitter<void>();

  @Output()
  secondary=new EventEmitter<void>();


}
