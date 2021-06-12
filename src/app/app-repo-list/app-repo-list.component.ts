import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './app-repo-list.component.html',
  styleUrls: ['./app-repo-list.component.scss']
})
export class appRepoList {
  @Input() searchList;
}
