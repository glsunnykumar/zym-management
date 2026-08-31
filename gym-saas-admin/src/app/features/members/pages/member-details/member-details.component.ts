import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { AppCardComponent } from '../../../../shared/components/app-card/app-card.component';
import { MatButtonModule } from '@angular/material/button';
import { Member } from '../../models/member.model';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog }
from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'gf-member-details',
  imports: [
    PageLayoutComponent,
    PageHeaderComponent,
    AppCardComponent,
    MatButtonModule,
  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly memberService = inject(MemberService);

  readonly member = signal<Member | null>(null);
  private readonly dialog =
  inject(MatDialog);


  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    const member = await this.memberService.getMemberById(id);

    this.member.set(member);
  }
  editMember(): void {
    const member = this.member();

    if (!member) {
      return;
    }

    this.router.navigate(['/members', member.id, 'edit']);
  }


  async deleteMember(): Promise<void> {

  const member =
    this.member();

  if (!member) {
    return;
  }

  const result =
    await this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '420px',

        data: {

          title:
            'Delete Member',

          message:
            `Are you sure you want to delete ${member.name}?`,

          confirmText:
            'Delete',

          cancelText:
            'Cancel'
        }
      }
    ).afterClosed()
     .toPromise();

  if (!result) {
    return;
  }

  await this.memberService
    .deleteMember(member.id);

  this.router.navigate([
    '/members'
  ]);

}


}
