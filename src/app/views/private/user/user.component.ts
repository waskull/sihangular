import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  search:string = '';
  columnNames = ['nombre','apellido','correo','cedula','edad','roles','telefono']
  columns = ['firstname','lastname','email','cedula','age','roles','phone']
  op = {delete:true,edit:true}
  userList: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.userService.getUsers().subscribe(res => {
      this.userList = res;
    });
  }
  openModal(){
    console.log('openmodal');
  }

  newValue(data: any){
    this.loadData();
  }

  editUser(user:any){
    const tempList = this.userList.filter(res => user.id !== res.id);
    this.userList = [...tempList, user];
  }

  deleteUser(user:any){
    this.userService.delete(user.id).subscribe(res => {
      this.userList = this.userList.filter(res => user.id !== res.id);
    });
  }

}
