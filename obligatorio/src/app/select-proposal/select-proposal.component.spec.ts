import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProposalComponent } from './select-proposal.component';

describe('SelectProposalComponent', () => {
  let component: SelectProposalComponent;
  let fixture: ComponentFixture<SelectProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProposalComponent]
    });
    fixture = TestBed.createComponent(SelectProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
