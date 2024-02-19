import { Pipe, PipeTransform } from "@angular/core";
import { StatusEnum } from "src/app/domain/status.enum";

@Pipe({ name: 'statusIcon' })
export class StatusIconPipe implements PipeTransform {
  transform(value: string) {
    if (value === null || value === undefined) {
      return 'black';
    }

    switch(value) {
      case StatusEnum.VERDE:
        return 'green';
      case StatusEnum.AMARELA:
        return 'yellow';
      case StatusEnum.VERMELHO:
        return 'red';
      default:
        return 'grey';
    }
  }
}
