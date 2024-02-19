import { DisponibilidadeServicosDTO } from "src/app/domain/disponibilidade-servicos.dto";
import { StatusEnum } from "src/app/domain/status.enum";

export class DisponibilidadeServicosCalc {
  public static getServicesOkByEntity(entity: any): DisponibilidadeServicosDTO {
    let servicos = new DisponibilidadeServicosDTO();
    
    for(let propriedade in entity) {
      if (entity[propriedade] === StatusEnum.VERDE) {
        servicos.disponiveis++;
      } else 
      if (entity[propriedade] === StatusEnum.VERMELHO || entity[propriedade] === StatusEnum.AMARELA || entity[propriedade] === StatusEnum.EM_BRANCO) {
        servicos.indisponiveis++
      }
    }

    return servicos;
  }
}
