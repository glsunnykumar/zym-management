import { Component, inject, OnInit, signal } from '@angular/core';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { MemberService } from '../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent }
from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog }
from '@angular/material/dialog';

@Component({
  selector: 'gf-member-edit',
  imports: [
      PageLayoutComponent,
    PageHeaderComponent,
    MemberFormComponent
  ],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {

   private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly memberService =
    inject(MemberService);

  readonly loading =
    signal(true);

  readonly member =
    signal<any | null>(null);

      private readonly dialog =
    inject(MatDialog);

  async ngOnInit(): Promise<void>  {

      const id =
      this.route.snapshot.paramMap.get('id');

       if (!id) {
      this.router.navigate(['/members']);
      return;
    }

     try {

      const member =
        await this.memberService
          .getMemberById(id);

      this.member.set(member);

    } catch (error) {

      console.error(error);

      this.router.navigate(['/members']);

    } finally {

      this.loading.set(false);

    }

  }

   async onSave(
    value: any
  ): Promise<void> {

    const member =
      this.member();

    if (!member) {
      return;
    }

    await this.memberService
      .updateMember(
        member.id,
        value
      );

    this.router.navigate([
      '/members'
    ]);
  }

    onCancel(): void {

    this.router.navigate([
      '/members'
    ]);

  }

   

}
