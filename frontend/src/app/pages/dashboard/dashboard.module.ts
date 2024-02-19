import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndisponibilidadeComponent } from './indisponibilidade/indisponibilidade.component';
import { FiltroPorDataComponent } from './filtro-por-data/filtro-por-data.component';
import { FiltroPorEstadoComponent } from './filtro-por-estado/filtro-por-estado.component';
import { ListagemComponent } from './listagem/listagem.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ChartModule} from 'primeng/chart';
import { AutorizadorService } from 'src/app/service/autorizador.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { UtilModule } from 'src/app/util/util.module';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    IndisponibilidadeComponent,
    FiltroPorDataComponent,
    FiltroPorEstadoComponent,
    ListagemComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    PanelModule,
    ChartModule,
    DropdownModule,
    TableModule,
    UtilModule,
    CalendarModule
  ],
  providers: [AutorizadorService]
})
export class DashboardModule { }
