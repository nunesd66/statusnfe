import { Autorizador } from "./autorizador.model";

export class Historico {
  id: string;
  autorizador: Autorizador;
  autorizacao: string;
  retornoAutorizacao: string;
  inutilizacao: string;
  consultaProtocolo: string;
  statusServico: string;
  tempoMedio: string;
  consultaCadastro: string;
  recepcaoEvento: string;
  dataCadastro: Date;
}
