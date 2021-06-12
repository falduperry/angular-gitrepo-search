import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitAPIService {
  constructor(private http: HttpClient) {}
  search: Observable<any>;
  cachedValue: string;

  gitListSearch: Function = (query: string): Observable<any> => {
    if (!this.search) {
      const url = `https://api.github.com/search/repositories?q=${query}`;
      this.search = this.http.get<any>(url).pipe();
      this.cachedValue = query;
    } else if (this.cachedValue !== query) {
      this.search = null;
      this.gitListSearch(query);
    }
    return this.search;
  };
}
