import { Component, Output, EventEmitter } from '@angular/core';
import { IActivity } from 'src/app/components/Admin/activities/IActivity';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent {

  @Output() voteSubmitted= new EventEmitter<number>();

  currentActivity: IActivity | null = null;

  submitVote(value: number) {
    this.voteSubmitted.emit(value);
  }

}
