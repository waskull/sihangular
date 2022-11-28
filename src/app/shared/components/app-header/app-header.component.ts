import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() componentName: string = '';
  @Input() template!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
