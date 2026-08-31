import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageHeaderConfig, UIActionEvent } from '../../models';

@Component({
  selector: 'gf-page-header',
    imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
 
 
  readonly title = input.required<string>();

  readonly subtitle = input<string>('')
}

