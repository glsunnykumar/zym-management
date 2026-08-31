import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { PageHeaderComponent } from '../../../../shared/ui/layout/page-header/page-header.component';
import { PageLayoutComponent } from '../../../../shared/ui/layout/page-layout/page-layout.component';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-create',
  imports: [PageLayoutComponent, PageHeaderComponent, MemberFormComponent],
  templateUrl: './member-create.component.html',
  styleUrl: './member-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberCreateComponent {
  private readonly router = inject(Router);

  private readonly memberService = inject(MemberService);

  async onSave(member: any): Promise<void> {
    try {
      await this.memberService.createMember(member);

      console.log('MEMBER SAVED');

      this.router.navigate(['/members']);
    } catch (error) {
      console.error('Failed to create member', error);
    }
  }

  onCancel(): void {
    this.router.navigate(['/members']);
  }
}
