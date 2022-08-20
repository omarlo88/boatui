import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'baot-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {

  boats: any = [];
  loading = false;
  totalElements: number = 0;
  size: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

  loadLazy(event: any): void {

  }

  selectBoat(boat: any) {

  }
}
