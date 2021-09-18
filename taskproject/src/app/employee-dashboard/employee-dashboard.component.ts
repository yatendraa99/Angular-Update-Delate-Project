import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModel } from '../employee-dash board model';
import { ApiService } from '../share/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  
  
  formValue:any | FormGroup;
 employeeModelObj : EmployeeModel = new EmployeeModel();
 employeeData: any 

 

  constructor(private formbuilder:FormBuilder,
    public api:ApiService) { }

  ngOnInit(): void {
        this.formValue = this.formbuilder.group({
          firstName: [''],
          lastName: [''],
          email: [''],
          mobile:[''],
          salary:['']
        })  
        this.getAllEmployee();
      }

  postEmployeeDetails(){
      this.employeeModelObj.firstName = this.formValue.value.firstName;
      this.employeeModelObj.lastName = this.formValue.value.lastName;
      this.employeeModelObj.email = this.formValue.value.email;
      this.employeeModelObj.mobile = this.formValue.value.mobile;
      this.employeeModelObj.salary = this.formValue.value.salary;
    

      this.api.postEmploye(this.employeeModelObj)
      .subscribe((res: any)=>{
        console.log(res)
        alert("employe addede succesfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        (_err: any)=>{
        alert("something wrong")
      })
    }
        
    getAllEmployee(){
      this.api.getEmploye()
      .subscribe(res=>{
         this.employeeData = res;
      })
    }
      deleteEmploye(row:any){
        this.api.deleteEmploye(row.id)
        .subscribe(()=>{
          alert("employeId Delete")
          this.getAllEmployee();
        })
      }                            
     onEdit(row:any){
       this.employeeModelObj.id =row.id;
       this.formValue.controls['firstName'].setValue(row.firstName);
       this.formValue.controls['lastName'].setValue(row.lastName);
       this.formValue.controls['email'].setValue(row.email);
       this.formValue.controls['mobile'].setValue(row.mobile);
       this.formValue.controls['salary'].setValue(row.salary);

     }
     updateEmployeeDetails(){
      this.employeeModelObj.firstName = this.formValue.value.firstName;
      this.employeeModelObj.lastName = this.formValue.value.lastName;
      this.employeeModelObj.email = this.formValue.value.email;
      this.employeeModelObj.mobile = this.formValue.value.mobile;
      this.employeeModelObj.salary = this.formValue.value.salary;
      this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
         .subscribe(res=>{
            alert("updatevsuccessfuly")
            let ref = document.getElementById('cancel')
            ref?.click();
            this.formValue.reset();
            this.getAllEmployee();
         })
    }

}

    

  

