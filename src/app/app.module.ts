import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ApolicesComponent } from './apolices/apolices.component';
import { AreaClienteComponent } from './area-cliente/area-cliente.component';
import { AreaApoliceComponent } from './area-apolice/area-apolice.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxCurrencyModule } from "ngx-currency";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    ApolicesComponent,
    AreaClienteComponent,
    AreaApoliceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(),
    BlockUIModule.forRoot({
      delayStart: 500,
      delayStop: 500})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
