import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { Observable, Subject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../models/filter';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  public products$ = new Subject<Employee[]>();
  private updatedProducts: Employee[] = [];
  private readonly baseUrl = environment.BACKEND_BASE_URL + 'employees';

  constructor(
    private _HttpClient: HttpClient,
  ) { }


  getEmployees(filter: any): Observable<Employee> {

    
    
    const updatedFilterObject = {
      ...filter,
      page: (Number(filter.page) ?? 0) + 1,
    };

    const queryString = Object.keys(updatedFilterObject)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(updatedFilterObject[key])}`)
      .join('&');

    return this._HttpClient.get<Employee>(`${this.baseUrl}?${queryString}`).pipe(take(1))
  }


}
