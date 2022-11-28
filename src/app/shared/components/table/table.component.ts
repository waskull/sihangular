import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

interface operations{
  edit?:boolean,
  delete?: boolean
};
declare var window: any;
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  ff: any;
  search: string = '';
  @Input() colNames: string[] = [];
  @Input() columns: string[] = [];
  @Input() rowData: any[] = [];
  @Input() operations: operations = {edit:false,delete:false};
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Input() userModal: boolean = false;
  @Input() itemModal: boolean = false;
  @Input() inventoryModal: boolean = false;
  @Input() saleModal: boolean = false;
  @Input() purchaseModal: boolean = false;
  @Input() scheduleModal: boolean = false;
  @Input() companyModal: boolean = false;
  @Input() clientModal: boolean = false;
  @Input() billModal: boolean = false;
  @Input() report: boolean = false;
  isVendedor: boolean = false;
  p: number = 1;
  rowsNumber:number = 0;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const data = this.authService.user$.subscribe(e => {
      if(e?.roles.includes("vendedor")) {
        this.isVendedor = true;
      }
    });
    
  }
  delete(data:any){
    if(confirm('Deseas borrar este registro?')) this.onDelete.emit(data);
  }
  edit(data:any){
    this.onEdit.emit(data);
    this.ff.hide();
  }
  open(id:number) {
    this.ff = new window.bootstrap.Modal(
      document.getElementById(id.toString())
    );
    this.ff.show();
  }

}
