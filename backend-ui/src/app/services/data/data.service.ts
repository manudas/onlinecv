import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { Details } from '@services/data/queries';

import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DataService {

  private httpOptions = {
    headers: {
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
      responseType: 'json'
    }
  }

  url: string = 'graphql'

  constructor(private http: HttpClient) { }

  public readData(readQuery: string, vars: any = {}, headers: any = {}): Observable<any> {
    return this.query(readQuery, vars, headers)
  }

  public setData(mutateQuery: string, vars: any = {}, headers: any = {}): Observable<any> {
    return this.mutation(mutateQuery, vars, headers)
  }

  private execute = (type: 'query' | 'mutation', query: string, vars: any = {}, headers: any = {}): Observable<any> => {
    if (type === 'query' || type === 'mutation') {
      return (
        this.http.post(
            this.url,
            // before it was [type] : query, but the mutation shouldn't be
            // mutation: mutation but query: mutation, so first word is always
            // query independently of the query type
            JSON.stringify({ query, variables: vars }),
            { headers: new HttpHeaders({ ...this.httpOptions.headers, ...headers }) }
        ).pipe(map(
          (response) => response['data']
        ), catchError(e => throwError(e))))
    } else {
      throw new Error(`Unsupported GraphQL query type: ${type}`)
    }
  }

  private query = (query: string, vars: any = {}, headers: any = {}): Observable<any> => {
    return this.execute('query', query, vars, headers)
  }

  private mutation = (mutation: string, vars: any = {}, headers: any = {}): Observable<any> => {
    return this.execute('mutation', mutation, vars, headers)
  }
}
