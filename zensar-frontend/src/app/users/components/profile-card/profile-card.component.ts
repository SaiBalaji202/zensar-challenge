import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { UserProfile } from './../../models/profile.model';

@Component({
  selector: 'zensar-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent implements OnInit {
  @Input() user: UserProfile;

  constructor() {}

  ngOnInit(): void {}
}
