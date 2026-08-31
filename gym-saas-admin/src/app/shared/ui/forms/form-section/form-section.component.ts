import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gf-form-section',
  imports: [],
  templateUrl: './form-section.component.html',
  styleUrl: './form-section.component.scss',
    changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class FormSectionComponent {

   readonly title =
    input.required<string>();

  readonly subtitle =
    input<string>();


}
