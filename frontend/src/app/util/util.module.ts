import { NgModule } from "@angular/core";
import { StatusIconPipe } from "./pipe/status-color.pipe";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [StatusIconPipe],
  imports: [CommonModule],
  exports: [StatusIconPipe]
})
export class UtilModule {}
