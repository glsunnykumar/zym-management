import { Component, computed, inject, signal } from '@angular/core';
import { MemberFacade } from '../../services/member.facade';
import { Router } from '@angular/router';
import { Member } from '../../models/member.model';
import { TableColumn } from '../../../../shared/models/table-column.model';
import { TableAction } from '../../../../shared/models/table-action.model';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { MatIcon } from '@angular/material/icon';
import { SearchToolbarComponent } from '../../../../shared/components/search-toolbar/search-toolbar.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MemberService } from '../../services/member.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from '../../../plans/models/plan.model';
import { PlanService } from '../../../plans/services/plan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gf-members-list',
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    MatIcon,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    SearchToolbarComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    DataTableComponent,
  ],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent {
  private readonly facade = inject(MemberFacade);

  private readonly router = inject(Router);

  private readonly memberService = inject(MemberService);

  private readonly dialog = inject(MatDialog);

  readonly members = toSignal(this.memberService.getMembers(), {
    initialValue: [],
  });

  readonly plans = signal<Plan[]>([]);

  private readonly planService = inject(PlanService);

  readonly search = signal('');

  readonly statusFilter = signal('');

  readonly planFilter = signal('');

  readonly columns: readonly TableColumn<Member>[] = [
    {
      key: 'name',
      label: 'Member',
      sortable: true,
      priority: 'primary',
    },

    {
      key: 'phone',
      label: 'Phone',
      priority: 'secondary',
    },

    {
      key: 'planName',
      label: 'Plan',
      sortable: true,
    },

    {
      key: 'status',
      label: 'Status',
      type: 'status',
      sortable: true,
    },

    {
      key: 'joiningDate',
      label: 'Joined',
      priority: 'optional',
    },
  ];

  readonly actions: readonly TableAction<Member>[] = [
    {
      id: 'view',
      icon: 'visibility',
      label: 'View',
    },

    {
      id: 'edit',
      icon: 'edit',
      label: 'Edit',
    },

    {
      id: 'delete',
      icon: 'delete',
      label: 'Delete',
    },
  ];

  readonly filteredMembers = computed(() => {
    let data = [...this.membersVm()];

    const search = this.search().trim().toLowerCase();

    if (search) {
      data = data.filter(
        (member) =>
          (member.name ?? '').toLowerCase().includes(search) ||
          (member.phone ?? '').toString().includes(search) ||
          (member.planName ?? '').toLowerCase().includes(search),
      );
    }
    if (this.statusFilter()) {
    data = data.filter(
      member => member.status === this.statusFilter()
    );
  }

  if (this.planFilter()) {
    data = data.filter(
      member => member.planName === this.planFilter()
    );
  }

    return data;  
  });

  readonly membersVm = computed(() => {
    return this.members().map((member) => {
      const plan = this.plans().find((p) => p.id === member.planId);

      return {
        ...member,

        planName: plan?.name ?? 'No Plan',
      };
    });
  });

  ngOnInit(): void {
    this.facade.loadMembers();
    this.planService.getPlans().subscribe((plans) => {
      console.log('Plans', plans);
      this.plans.set(plans);
    });
  }

  onAddMember(): void {
    const route = '/members/create';

    console.log('Navigating to:', route);

    this.router.navigate([route]);
  }

  onTableEvent(event: any): void {
    console.log('Table event:', event);

    switch (event.type) {
      case 'action':
        switch (event.action) {
          case 'view':
            this.viewMember(event.row);
            break;

          case 'edit':
            this.editMember(event.row);
            break;

          case 'delete':
            this.deleteMember(event.row);
            break;
        }

        break;
    }
  }

  editMember(member: Member): void {
    this.router.navigate(['/members', member.id, 'edit']);
  }

  viewMember(member: Member): void {
    this.router.navigate(['/members', member.id]);
  }

  async deleteMember(member: Member): Promise<void> {
    const confirmed = await this.dialog
      .open(ConfirmDialogComponent, {
        width: '420px',

        data: {
          title: 'Delete Member',

          message: `Are you sure you want to delete ${member.name}?`,

          confirmText: 'Delete',
          cancelText: 'Cancel',
        },
      })
      .afterClosed()
      .toPromise();

    if (!confirmed) {
      return;
    }

    await this.memberService.deleteMember(member.id);
  }
}
