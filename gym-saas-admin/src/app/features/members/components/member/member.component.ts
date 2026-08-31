import { Component, signal } from '@angular/core';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { Member } from '../../models/member.model';
import { DataTableComponent } from "../../../../shared/components/data-table/data-table.component";
import { TableEvent } from '../../../../shared/models/table-event.model';
import { TableAction } from '../../../../shared/models/table-action.model';

@Component({
  selector: 'app-member',
  imports: [DataTableComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {

  readonly loading = signal(false);

  readonly members: readonly Member[] = [
 

];

readonly actions: readonly TableAction<Member>[] = [

  {
    id: 'view',
    label: 'View Member',
    icon: 'visibility'
  },

  {
    id: 'edit',
    label: 'Edit Member',
    icon: 'edit'
  },

  {
    id: 'delete',
    label: 'Delete Member',
    icon: 'delete',
    color: 'warn'
  }

];



onTableEvent(
  event: TableEvent<Member>
): void {

  switch (event.type) {

    case 'rowClick':

      console.log(
        'Open member:',
        event.row
      );

      break;


    case 'action':

      this.handleMemberAction(
        event.action,
        event.row
      );

      break;


    case 'sort':

      console.log(
        'Sort:',
        event.sort
      );

      break;


    case 'page':

      console.log(
        'Page:',
        event.page
      );

      break;


    case 'selection':

      console.log(
        'Selected:',
        event.rows
      );

      break;
  }
}


private handleMemberAction(
  action: string,
  member: Member
): void {

  switch (action) {

    case 'view':

      console.log(
        'View:',
        member
      );

      break;


    case 'edit':

      console.log(
        'Edit:',
        member
      );

      break;


    case 'delete':

      console.log(
        'Delete:',
        member
      );

      break;
  }
}



}
