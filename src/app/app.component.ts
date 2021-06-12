import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GitAPIService } from './app-repo-list/service/git-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  values;
  searchResults: any;
  isLoading = false;
  noResult = false;
  noInput = false;

  constructor(public gitAPIService: GitAPIService) {}

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl(null)
    });
  }

  searchFromList(query) {
    console.log(query.value);
    this.values = query.value.trim();
    this.isLoading = true;
    this.gitAPISearch(this.values);
  }

  gitAPISearch(searchQuery) {
    this.gitAPIService.gitListSearch(searchQuery).subscribe(
      res => {
        this.isLoading = false;
        this.searchResults = res;
        if (res.total_count === 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      },
      error => {
        this.isLoading = false;
        alert(`Error: ${error.statusText}`);
      }
    );
  }

  initialData(event: any) {
    this.values = this.form.controls.search.value;
    this.noResult = false;
    this.searchResults = [];
    if (this.values == '') {
      this.noInput = true;
    } else {
      this.noInput = false;
      this.gitAPISearch(this.values);
    }
  }
}
