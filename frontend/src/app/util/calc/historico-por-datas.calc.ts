import { Historico } from "src/app/domain/historico.model";
import { ContagemServicosCalc } from "./contagem-servicos.calc";

const COLORS: string[] = [
  '0,0,255',
  '0,191,255',
  '0,255,0',
  '0,100,0',
  '95,158,160',
  '139,69,19',
  '75,0,130',
  '255,0,255',
  '255,0,0',
  '255,140,0',
  '255,255,0',
  '0,255,255',
  '199,21,133',
  '250,128,114'
];

export class HistoricoPorData {
  public static getHistoricoEstruturado(list: Historico[]): any {
    const mapAutorizadorHistorico: Map<String, Historico[]> = new Map();
    const mapListServicos: Map<string, string[]> = new Map();

    let dataSet: any[] = new Array();

    list.forEach(historico => {
      if (mapAutorizadorHistorico.has(historico.autorizador.nome)) {
        mapAutorizadorHistorico.get(historico.autorizador.nome).push(historico);
      } else {
        mapAutorizadorHistorico.set(historico.autorizador.nome, new Array<Historico>(historico));
      }
    });

    mapAutorizadorHistorico.forEach(key => {
      const dto = ContagemServicosCalc.getContagemServicosOkByList(key);
      const porcentagemServicos = ContagemServicosCalc.getPorcentagemDisponibilidadeServicos(dto);
      mapListServicos.set(key[0].autorizador.nome, porcentagemServicos);
    });

    let i = 0;
    for (const key of mapListServicos.keys()) {
      dataSet.push({
        label: key.toString(),
        backgroundColor: 'rgba(' + COLORS[i] + ')',
        borderColor: 'rgba(' + COLORS[i] + ')',
        data: mapListServicos.get(key.toString())
      });

      i++;
    }

    return dataSet;
  }
}
