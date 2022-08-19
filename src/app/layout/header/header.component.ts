import { Component, OnInit } from '@angular/core';
import { flagFranceBase64 } from '../shared/flagFr';

@Component({
  selector: 'baot-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarId: string;
  urlFr = flagFranceBase64;

  constructor() { }

  ngOnInit(): void {
  }

  switchLogin(): void {

  }
}
