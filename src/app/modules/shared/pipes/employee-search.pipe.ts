import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../employee/models/employee';
@Pipe({
  name: 'employeeSearch',
  pure: false,
})
export class EmployeeSearchPipe implements PipeTransform {
  transform(employees: Employee[], target: string) {
    const filterdEmployees = employees?.filter((employee) => {
      const regExp = new RegExp(target, 'ig');
      const { name, department, experience , employmentDate , salary } = employee;
      const criteria =
        regExp.test(name) ||
        regExp.test(department) ||
        regExp.test(employmentDate) ||
        regExp.test(salary as unknown as string) ||
        regExp.test(experience);
      return criteria;
    });
    return filterdEmployees;
  }
}
