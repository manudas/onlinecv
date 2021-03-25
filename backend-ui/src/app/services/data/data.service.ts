import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { Details } from '@services/data/queries';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
      responseType: 'json'
    })
  }

  url: string = 'graphql'

  constructor(private http: HttpClient) { }

  public readData(readQuery, vars: any = {}): Observable<any> {
    return this.query(readQuery, vars)
  }

  public setData(mutateQuery: string, vars: any = {}): Observable<any> {
    return this.mutation(mutateQuery, vars)
  }

  private execute = (type: 'query' | 'mutation', query: string, vars: any = {}): Observable<any> => {
    return (
      this.http.post(
          this.url,
          JSON.stringify({ [type]: query, variables: vars }),
          this.httpOptions
      ).pipe(map(
        (response) => response['data']
      ), catchError(e => throwError(e))))
  }

  private query = (query: string, vars: any = {}): Observable<any> => {
    return this.execute('query', query, vars)
  }

  private mutation = (mutation: string, vars: any = {}): Observable<any> => {
    return this.execute('mutation', mutation, vars)
  }
}
