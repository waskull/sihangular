import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CompanyService } from '../../services/company/company.service';
import { SheduleService } from '../../services/schedule/shedule.service';
import { UserService } from '../../services/user/user.service';

export enum statusEnum{
  INCOMPLETE = "INCOMPLETA",
  COMPLETED = "COMPLETADA",
}

@Component({
  selector: 'scheduleform',
  templateUrl: './scheduleform.component.html',
  styleUrls: ['./scheduleform.component.scss']
})
export class ScheduleformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  @Input() editingStatus:boolean = false;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  companies: any[] = [];
  selectedCompanies: any[] = [];
  comps: number[] = [];
  userList: any[] = [];
  constructor(private scheduleService: SheduleService, 
    private companyService: CompanyService,
    private userService: UserService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.companyService.getCompanies().subscribe(res => this.companies = res);
    this.userService.getUsers().subscribe(res => this.userList = res);
  }
  addCompany(company:any){
    let t = false;
    this.selectedCompanies.forEach(e => {
      if(e.id === company.id) t = true;
    });
    if(!t) this.selectedCompanies.push(company);
  }
  deleteCompany(company:any){
    this.selectedCompanies = this.selectedCompanies.filter(res => res.id !== company.id);
  }
  initForm():FormGroup{
    const d = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(0)]],
      companies: [[0], [Validators.required, Validators.min(1)]],
      salesman: [0, [Validators.required, Validators.min(1)]],
      status: ['INCOMPLETA', Validators.required]
    });
    if(this.data){
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData(){
    this.selectedCompanies.forEach(res => this.comps.push(res.id));
    let Data:any = {
      description:this.dataForm.value.description,
      salesman:parseInt(this.dataForm.value.salesman),
      companies: this.comps
    };
    if(this.data){
      const id: number = this.data?.id;
      Data.status = this.dataForm.value.status;
      this.scheduleService.edit(Data,id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el cronograma';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
        this.emitForm.emit(Data);
      });
    }
    else{
      delete Data?.id;
      this.scheduleService.create(Data).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Crear el cronograma';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        this.emitForm.emit(Data);
      });
    }
  }
}
