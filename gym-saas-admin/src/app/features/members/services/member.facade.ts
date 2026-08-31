import { Injectable, signal } from '@angular/core';

import { Member } from '../models/member.model';

import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class MemberFacade {

  readonly members =
    signal<Member[]>([]);

  constructor(
    private memberService: MemberService
  ) {}

  loadMembers(): void {

   this.memberService
    .getMembers()
    .subscribe(members => {
      this.members.set(members);
      console.log(members);
    });
  }
}