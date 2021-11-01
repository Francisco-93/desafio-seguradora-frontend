import { AreaClienteComponent } from './area-cliente/area-cliente.component';
import { AreaApoliceComponent } from './area-apolice/area-apolice.component';
import { ApolicesComponent } from './apolices/apolices.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'apolices', component: ApolicesComponent },
  { path: 'apolices/area-apolice', component: AreaApoliceComponent },
  { path: 'clientes/area-cliente', component: AreaClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
