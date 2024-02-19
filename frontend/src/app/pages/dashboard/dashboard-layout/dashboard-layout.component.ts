import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.sass']
})
export class DashboardLayoutComponent implements OnInit {
  title: string = "Dashboard - Status dos Serviços do Portal da Nota Fiscal Eletrônica";

  constructor() { }

  ngOnInit(): void {
  }

}
