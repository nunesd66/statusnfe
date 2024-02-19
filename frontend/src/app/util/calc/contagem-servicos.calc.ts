import { ContagemServicosDTO } from "src/app/domain/contagem-servicos.dto";
import { Historico } from "src/app/domain/historico.model";
import { StatusEnum } from "src/app/domain/status.enum";

export class ContagemServicosCalc {
  static getContagemServicosOkByList(list: Historico[]): ContagemServicosDTO {
    let contagem = new ContagemServicosDTO();

    list.forEach(entity => {
      for(const key in entity) {
        switch(key) {
          case 'autorizacao':
            contagem.autorizacaoTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.autorizacaoOK++ : null;
            break;

          case 'retornoAutorizacao':
            contagem.retornoAutorizacaoTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.retornoAutorizacaoOK++ : null;
            break;

          case 'inutilizacao':
            contagem.inutilizacaoTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.inutilizacaoOK++ : null;
            break;

          case 'consultaProtocolo':
            contagem.consultaProtocoloTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.consultaProtocoloOK++ : null;
            break;

          case 'statusServico':
            contagem.statusServicoTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.statusServicoOK++ : null;
            break;

          case 'consultaCadastro':
            contagem.consultaCadastroTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.consultaCadastroOK++ : null;
            break;

          case 'recepcaoEvento':
            contagem.recepcaoEventoTOTAL++;
            entity[key] === StatusEnum.VERDE ? contagem.recepcaoEventoOK++ : null;
            break;
        }
      }
    });

    return contagem;
  }

  static getPorcentagemDisponibilidadeServicos(contagemServicosDTO: ContagemServicosDTO): string[] {
    return [
      (contagemServicosDTO.autorizacaoOK / contagemServicosDTO.autorizacaoTOTAL * 100).toFixed(0),
      (contagemServicosDTO.retornoAutorizacaoOK / contagemServicosDTO.retornoAutorizacaoTOTAL * 100).toFixed(0),
      (contagemServicosDTO.inutilizacaoOK / contagemServicosDTO.inutilizacaoTOTAL * 100).toFixed(0),
      (contagemServicosDTO.consultaProtocoloOK / contagemServicosDTO.consultaProtocoloTOTAL * 100).toFixed(0),
      (contagemServicosDTO.statusServicoOK / contagemServicosDTO.statusServicoTOTAL * 100).toFixed(0),
      (contagemServicosDTO.consultaCadastroOK / contagemServicosDTO.consultaCadastroTOTAL * 100).toFixed(0),
      (contagemServicosDTO.recepcaoEventoOK / contagemServicosDTO.recepcaoEventoTOTAL * 100).toFixed(0)
    ];
  }
}
