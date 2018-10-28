import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + '/users')
    .pipe(catchError(this.handleError<IUser[]>('getUsersData', [])));
  }

  getUserData(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + '/users/' + id)
    .pipe(catchError(this.handleError<IUser[]>('getUserData', [])));
  }

  editUserData(userData: IUser): Observable<IUser> {
    const options = {headers : new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put<IUser>(this.baseUrl + '/users/' + userData.id, userData, options)
    .pipe(catchError(this.handleError<IUser[]>('editUserData', [])));
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
