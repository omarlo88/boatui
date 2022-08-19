import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'baot-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() versionApp!: string;
  @Input() yearApp!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
