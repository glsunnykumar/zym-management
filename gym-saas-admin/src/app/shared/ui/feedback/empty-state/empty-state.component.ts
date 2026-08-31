import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  EmptyStateConfig,
  UIActionEvent
} from '../../models';

@Component({
  selector: 'gf-empty-state',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {

   @Input({ required: true })
  config!: EmptyStateConfig;

  @Output()
  action = new EventEmitter<UIActionEvent>();

  onAction() {

    this.action.emit({

      type: 'add'

    });

  }

}
