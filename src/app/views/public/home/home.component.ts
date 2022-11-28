import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly authService: AuthService) { }

  userData:string = '';
  @ViewChild('header') public header!: ElementRef;
  @ViewChild('services') public services!: ElementRef;
  @ViewChild('details') public details!: ElementRef;
  @ViewChild('features') public features!: ElementRef;
  @ViewChild('contact') public contact!: ElementRef;
  isLogged:boolean = false;
  ngOnInit(): void {
    this.userData = this.authService.getNombre();
    console.log(this.userData);
    if(this.userData != '' || this.userData != null || this.userData != undefined || this.userData != ' ') {
      this.isLogged = true;
    }
    this.isLogged = false;
  }

  public moveToHeader():void {
    this.header.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToServices():void {
    this.services.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  public moveToDetails():void {
    this.details.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToFeatures():void {
    this.features.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToContact():void {
    this.contact.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }

}
