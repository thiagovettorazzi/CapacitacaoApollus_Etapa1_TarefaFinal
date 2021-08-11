import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './paginas/lista/lista.component';
import { ProfissionalComponent } from './paginas/profissional/profissional.component';

const routes: Routes = [
  { path: "", redirectTo: "lista", pathMatch: "full" },
  { path: "lista", component: ListaComponent },
  { path: "profissional", component: ProfissionalComponent },
  { path: "profissional/:id", component: ProfissionalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
