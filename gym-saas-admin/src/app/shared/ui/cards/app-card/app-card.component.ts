import {
  Component,
  ContentChild,
  Input,
  TemplateRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CardConfig } from '../../models';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card',
  imports: [
     CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss'
})
export class AppCardComponent {

   @Input()
  config: CardConfig = {
    padding: 'md',
    elevated: true,
    showDivider: true
  };

  @ContentChild('cardActions')
  actionsTemplate?: TemplateRef<unknown>;

  @ContentChild('cardFooter')
  footerTemplate?: TemplateRef<unknown>;

}
