import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Autorizador } from 'src/app/domain/autorizador.model';
import { Historico } from 'src/app/domain/historico.model';
import { AutorizadorService } from 'src/app/service/autorizador.service';
import { ContagemServicosCalc } from 'src/app/util/calc/contagem-servicos.calc';

const COLORS: string[] = [
  "#00BFFF",
  "#7FFFD4",
  "#00FF00",
  "#D2691E",
  "#EE82EE",
  "#FF0000",
  "#FFFF00"
];

const LABELS: string[] = [
  "Autorização",
  "Retorno Autorização",
  "Inutilização",
  "Consulta Protocolo",
  "Status Serviço",
  "Consulta Cadastro",
  "Recepção Evento"
];

@Component({
  selector: 'app-filtro-por-estado',
  templateUrl: './filtro-por-estado.component.html',
  styleUrls: ['./filtro-por-estado.component.sass']
})
export class FiltroPorEstadoComponent implements OnInit {
  data: any;
  autorizadores: Autorizador[];

  constructor(private service: AutorizadorService) {}

  ngOnInit(): void {
    this.getAutorizadores();
  }

  getAutorizadores() {
    this.service.getAllAutorizadores().subscribe({
      next: autorizadores => this.autorizadores = autorizadores,
      error: error => console.error('FiltroPorEstadoComponent.getAutorizadores', error)
    });
  }

  inputData(historico: Historico[]): void {
    const contagemServicosDTO = ContagemServicosCalc.getContagemServicosOkByList(historico);

    this.data = {
      datasets: [{
        data: ContagemServicosCalc.getPorcentagemDisponibilidadeServicos(contagemServicosDTO),
        backgroundColor: COLORS
      }],
      labels: LABELS
    }
  }

  search(autorizador: Autorizador): void {
    if (autorizador != null) {
      this.service.getByAutorizador(autorizador?.id).subscribe({
        next: historico => this.inputData(historico),
        error: error => console.error('FiltroPorEstadoComponent.search', error)
      });
    } else {
      this.data = null;
    }
  }

}
