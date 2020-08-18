import { Component, OnInit } from '@angular/core';
import { Client, Employee } from '../services/invoice.webapi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'Moment'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [Client]

})
export class EmployeesComponent implements OnInit {

  constructor(private _client: Client, private modalService: NgbModal) { }

  employee: Employee = new Employee();
  employeeModal: Employee = new Employee();
  employees: Employee[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this._client.employeesAll().subscribe(data => {
      this.employees = data;
    }, error => {
      alert('Error Consultando Empleados')
    })
  }

  saveEmployee(){
    this.employee.birthday= moment(this.employee.birthday).toDate();
    this._client.employees(this.employee).subscribe(data => {
      this.getAllEmployees();
      alert("Empleado almacenado!");
    }, error => {
      alert('Error guardando')
    })
  }
  openEditEmployee(content:any, item:Employee) {
    this.employeeModal.id= item.id;
    this.employeeModal.firstLastName= item.firstLastName;
    this.employeeModal.secondName= item.secondName;
    this.employeeModal.firstName= item.firstName;
    this.employeeModal.secondLastName= item.secondLastName;
    this.employeeModal.birthday= item.birthday;
    this.employeeModal.telephone= item.telephone;
    this.employeeModal.address= item.address;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.getAllEmployees();
    });
  }

  saveEditEmployee() {
    this.employeeModal.birthday= moment(this.employeeModal.birthday).toDate();

    this._client.employees3(this.employeeModal.id,this.employeeModal).subscribe(data => {
      this.getAllEmployees();
      alert("Empleado Actualizado!");
    }, error => {
      alert('Error guardando')
    })
  }

  deleteEmployee(item: Employee) {
    this._client.employees4(item.id).subscribe(data => {
      this.getAllEmployees();
      alert("Empleado Eliminado!");
    }, error => {
      alert('Error guardando')
    })
  }

}
