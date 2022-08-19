import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'baot-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Input() versionApp!: string;
  @Input() yearApp!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
