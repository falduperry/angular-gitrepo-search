import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GitAPIService } from './service/git-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  values;
  searchResults: any;
  isLoading = false;
  noResult = false;
  noInput = false;
  errorMessage;
  objectKeys = Object.keys;

  constructor(public gitAPIService: GitAPIService) {
    this.form = new FormGroup({
      search: new FormControl(null),
      filterList: new FormControl(null)
    });
    this.form.controls.search.valueChanges
      .pipe(
        debounceTime(400),
        switchMap(query => this.gitAPIService.gitListSearch(query))
      )
      .subscribe(
        res => {
          this.isLoading = false;
          this.searchResults = res;
          if (res && res.total_count === 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }
        },
        error => {
          this.isLoading = false;
          this.noResult = false;
          this.errorMessage = error.message;
        }
      );
  }
}
