import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StatCardConfig } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [MatIconModule ,
    CommonModule
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {

  @Input()

config!:StatCardConfig;

}
