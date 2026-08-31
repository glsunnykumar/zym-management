import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  SearchToolbarConfig,
  UIActionEvent
} from '../../models';

@Component({
  selector: 'app-search-toolbar',
  imports: [
       CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './search-toolbar.component.html',
  styleUrl: './search-toolbar.component.scss'
})
export class SearchToolbarComponent {

   @Input()
  config!:SearchToolbarConfig;

  @Output()
  action=new EventEmitter<UIActionEvent>();

  search='';

  onSearch(){

    this.action.emit({

      type:'search',

      payload:this.search

    });

  }

  onAdd(){

    this.action.emit({

      type:'add'

    });

  }

  onRefresh(){

    this.action.emit({

      type:'refresh'

    });

  }

   onExport(){

    this.action.emit({

      type:'export'

    });

  }

}
