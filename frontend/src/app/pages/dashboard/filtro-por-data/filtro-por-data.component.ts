import { Component, OnInit } from '@angular/core';
import { Historico } from 'src/app/domain/historico.model';
import { AutorizadorService } from 'src/app/service/autorizador.service';
import { HistoricoPorData } from 'src/app/util/calc/historico-por-datas.calc';

@Component({
  selector: 'app-filtro-por-data',
  templateUrl: './filtro-por-data.component.html',
  styleUrls: ['./filtro-por-data.component.sass']
})
export class FiltroPorDataComponent implements OnInit {
  data: any;
  dataTable: Historico[];
  dataInicial: any;
  dataFinal: any;

  constructor(private service: AutorizadorService) {}

  ngOnInit(): void {
  }

  search(): void {
    if (this.dataInicial && this.dataFinal) {
      const inicial: string = new Date(this.dataInicial).toLocaleDateString().replace(/\//g, '-');
      const final: string = new Date(this.dataFinal).toLocaleDateString().replace(/\//g, '-');
      
      this.service.findHistoricByDate(inicial, final).subscribe({
        next: list => this.inputData(list),
        error: error => console.error('FiltroPorDataComponent.search', error)
      });
    }
  }

  clear(): void {
    this.data = null;
  }

  inputData(list: Historico[]): void {
    const dataSetEstruturado = HistoricoPorData.getHistoricoEstruturado(list);

    this.data = {
      labels: [
        'Autorização',
        'Retorno Autorização',
        'Inutilização',
        'Consulta Protocolo',
        'Status Serviço',
        'Consulta Cadastro',
        'Recepção Evento'
      ],
      datasets: dataSetEstruturado
    };
  }

}
