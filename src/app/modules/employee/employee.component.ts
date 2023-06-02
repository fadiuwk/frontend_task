import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, filterationBranch } from './models/filter';
import { Subscription } from 'rxjs';
import { EmployeesService } from './services/employees.service';
import { Employee } from './models/employee';
import { style, transition, trigger, animate } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  animations: [
    trigger('employeeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateY(-50px)' }))
      ])
    ])
  ]
})
export class EmployeeComponent implements OnInit {

  private Subscription = new Subscription();
  employees: Employee[] = [];
  public filteration = { ...filterationBranch };
  searchTarget = '';
  total = 20;
  filterForm!: FormGroup;

 



  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _EmployeesService: EmployeesService,
    private _FormBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    let filter = this._ActivatedRoute.snapshot.queryParams;

    if (this.isEmptyObject(filter)) {      
      this.getEmployees(this.removeEmptyValues(this.filteration))
    } else {
      this.getEmployees(this.removeEmptyValues(filter))
    }

    this.initeForm()
  }

  initeForm(){
    this.filterForm = this._FormBuilder.group({
      name: this._FormBuilder.control('', [Validators.required]),
      employmentDate: this._FormBuilder.control('', [Validators.required]),
      department: this._FormBuilder.control('', [Validators.required]),
      salary: this._FormBuilder.control(null , [Validators.required]),
      experience: this._FormBuilder.control('', [Validators.required]),
    });
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  getEmployees(filterObject: Filter) {
    this._Router.navigate([], {
      queryParams: filterObject,
      relativeTo: this._ActivatedRoute,
    });
    this.Subscription.add(
      this._EmployeesService
        .getEmployees(filterObject)
        .subscribe(
          (res: any) => {
            this.employees = res;
          }
        )
    )
  }

  trackById(employee: any): number {
    return employee.id;
  }

  onPageChange(event: any) {
    this.filteration = event;
    this.getEmployees(this.filteration)
  }

  filterDisabled(){

  }

  clearFilters(){
    this.initeForm()
    this.getEmployees(this.removeEmptyValues(this.filteration))
  }
  applySideFilters(){
    this.getEmployees(this.removeEmptyValues(this.filterForm.value))
  }

  removeEmptyValues(obj: any): any {
    if (Array.isArray(obj)) {
      // Handle array elements recursively
      return obj.map(this.removeEmptyValues);
    }
  
    if (typeof obj === 'object' && obj !== null) {
      const newObj:any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = this.removeEmptyValues(obj[key]);
          if (value !== undefined && value !== null && value !== '') {
            newObj[key] = value;
          }
        }
      }
      return newObj;
    }
  
    return obj;
  }
  

}
