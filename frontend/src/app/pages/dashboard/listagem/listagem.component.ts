import { Component, OnInit } from '@angular/core';
import { Autorizador } from 'src/app/domain/autorizador.model';
import { Historico } from 'src/app/domain/historico.model';
import { StatusEnum } from 'src/app/domain/status.enum';
import { AutorizadorService } from 'src/app/service/autorizador.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.sass']
})
export class ListagemComponent implements OnInit {
  statusEnum = StatusEnum;
  dataTable: Historico[];

  constructor(private service: AutorizadorService) {}

  ngOnInit(): void {
    this.getLastedStatus();
  }

  getLastedStatus(): void {
    this.service.getLastedStatus().subscribe({
      next: list => this.dataTable = list.sort((a, b) => {
        return a.autorizador.nome < b.autorizador.nome ? -1 : 1;
      }),
      error: error => console.error('ListagemComponent.getLastedStatus', error)
    });
  }

}
