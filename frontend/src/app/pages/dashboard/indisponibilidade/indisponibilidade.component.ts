import { Component, OnInit } from '@angular/core';
import { AutorizadorService } from 'src/app/service/autorizador.service';
import { DisponibilidadeServicosCalc } from 'src/app/util/calc/disponibilidade-servicos.calc';

@Component({
  selector: 'app-indisponibilidade',
  templateUrl: './indisponibilidade.component.html',
  styleUrls: ['./indisponibilidade.component.sass']
})
export class IndisponibilidadeComponent implements OnInit {
  nomeAutorizador: string;
  taxaDisponibilidade: string;
  ultimaAtualizacao: Date;
  data: any;

  constructor(private service: AutorizadorService) { }

  ngOnInit(): void {
    this.getEntity();
  }

  getEntity(): void {
    this.service.getMaxUnavailability().subscribe({
      next: historico => {
        this.nomeAutorizador = historico.autorizador.nome;
        this.ultimaAtualizacao = historico.dataCadastro;
        this.inputData(historico);
      },
      error: error => console.error('IndisponibilidadeComponent.getEntity', error)
    });
  }

  inputData(entity: any): void {
    const servicos = DisponibilidadeServicosCalc.getServicesOkByEntity(entity);

    this.taxaDisponibilidade = (servicos.disponiveis / servicos.total * 100).toFixed(0);

    this.data = {
      labels: [
        'Serviços disponíveis',
        'Serviços Indisponíveis',
      ],
      datasets: [
        {
          data: [
            servicos.disponiveis,
            servicos.indisponiveis
          ],
          backgroundColor: [
              "#ADFF2F",
              "#FF6347"
          ],
          hoverBackgroundColor: [
              "#9ACD32",
              "#B22222"
          ]
        }]    
    };
  }

}
