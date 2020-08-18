import { Component, OnInit } from '@angular/core';
import { Client, InvoiceDto, Employee, Product, InvoiceDetailDto } from '../services/invoice.webapi.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'Moment'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [Client]
})
export class InvoiceComponent implements OnInit {

  invoice: InvoiceDto = new InvoiceDto();
  employees: Employee[] = [];
  products: Product[] = [];
  details: InvoiceDetailDto[] = [];
  detail: InvoiceDetailDto = new InvoiceDetailDto();
  detailModal: InvoiceDetailDto = new InvoiceDetailDto();
  constructor(private _client: Client, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllProducts();
  }

  getAllEmployees() {
    this._client.employeesAll().subscribe(data => {
      this.employees = data;
    }, error => {
      alert('Error Consultando Empleados')
    })
  }
  getAllProducts() {
    this._client.productsAll().subscribe(data => {
      this.products = data;
    }, error => {
      alert('Error Consultando productos')
    })
  }

  addDetailInvoice() {
    let searchResult = this.details.filter(c => c.productId === this.detail.productId);
    if (searchResult.length > 0) {
      alert('El producto ya existe');
      return;
    }
    let temporalProduct= this.detail.clone();
    temporalProduct.productId=parseInt(temporalProduct.productId.toString());
    this.details.push(temporalProduct);
  }


  productChange(event) {

    this.detail.productName = this.products.find(e => e.id === parseInt(event.target.value))?.name;
    console.log(event.target.value);
  }

  productChangeModal(event) {

    this.detail.productName = this.products.find(e => e.id === parseInt(event.target.value))?.name;
    console.log(event.target.value);
  }

  deleteDetail(item: InvoiceDetailDto) {
    this.details = this.details.filter(c => c.productId !== item.productId);
  }

  openEditDetailInvoice(content:any, item:InvoiceDetailDto) {
  this.detailModal= item.clone();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateDetails(detailModal:InvoiceDetailDto){
    let result= this.details.find(c=>c.productId===detailModal.productId);
    result.price=detailModal.price;
    result.quantity=detailModal.quantity;
  }

  saveInvoice(){
    this.invoice.date= moment(this.invoice.date).toDate();
    this.invoice.employeeId= parseInt(this.invoice.employeeId.toString());

    this.invoice.invoiceDetail= this.details;
    this._client.createFullInvoice(this.invoice).subscribe(data=>{
      alert("Se almaceno correctamente!")
    },
    error=>{
      console.log(error);
      alert("Ocurrio un error");
    }
    )
  }
}
