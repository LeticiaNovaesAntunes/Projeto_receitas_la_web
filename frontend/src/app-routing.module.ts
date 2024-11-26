import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { IndexComponent } from './app/index/index.component';
import { CadastroComponent } from './app/cadastro/cadastro.component';
import { paginaadminComponent } from './app/paginaadmin/paginaadmin.component'; 
import { FormReceitaComponent } from './app/formreceita/formreceita.component';
import { UserListComponent } from './app/user-list/user-list.component';
import { PaginaReceitaTematicaComponent } from './app/pagina-receita-tematica/pagina-receita-tematica.component';
import { PaginaReceitaSalgadoComponent } from './app/pagina-receita-salgado/pagina-receita-salgado.component';
import { PaginaDrinksComponent } from './app/pagina-drinks/pagina-drinks.component';
import { PaginaSobremesasComponent } from './app/pagina-sobremesas/pagina-sobremesas.component';
import { PaginaReceitaComponent } from './app/pagina-receita/pagina-receita.component';
import { ResultadoBuscaComponent } from './app/resultado-busca/resultado-busca.component';
import { AdminIndexComponent } from './app/admin-index/admin-index.component';


const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" }, // Rota padrão
  { path: "index", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "cadastro", component: CadastroComponent },
  { path: "paginaadmin", component: paginaadminComponent },
  { path: "formreceita", component: FormReceitaComponent },
  { path: "user-list", component: UserListComponent },
  { path: "pagina-receita-tematica", component: PaginaReceitaTematicaComponent},
  { path: "pagina-receita-salgado", component: PaginaReceitaSalgadoComponent},
  { path: "pagina-drinks", component: PaginaDrinksComponent},
  { path: "pagina-sobremesas", component: PaginaSobremesasComponent},
  { path: "pagina-receita", component: PaginaReceitaComponent},
  { path: "resultado-busca", component: ResultadoBuscaComponent},
  {path: "admin-index", component: AdminIndexComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
