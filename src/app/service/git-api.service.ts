import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitAPIService {
  constructor(private http: HttpClient) {}

  gitListSearch(query: string): Observable<any> {
    query = query.trim();
    if (query) {
      const url = `https://api.github.com/search/repositories?q=${query}`;
      return this.http.get<any>(url).pipe();
    } else {
      return of(null);
    }
  }
}
