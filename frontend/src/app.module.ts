import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importando o FormsModule

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './app/login/login.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { IndexComponent } from './app/index/index.component';
import { CardReceitaComponent } from './app/card-receita/card-receita.component';
import { linkCircularComponent } from './app/link-circular/link-circular.component';
import { CadastroComponent } from './app/cadastro/cadastro.component';
import { paginaadminComponent } from './app/paginaadmin/paginaadmin.component';
import { FormReceitaComponent } from './app/formreceita/formreceita.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './app/user-list/user-list.component';
import { PaginaReceitaTematicaComponent } from './app/pagina-receita-tematica/pagina-receita-tematica.component';
import { PaginaDrinksComponent } from './app/pagina-drinks/pagina-drinks.component';
import { PaginaSobremesasComponent } from './app/pagina-sobremesas/pagina-sobremesas.component';
import { PaginaReceitaSalgadoComponent } from './app/pagina-receita-salgado/pagina-receita-salgado.component';
import { PaginaReceitaComponent } from './app/pagina-receita/pagina-receita.component';
import { ResultadoBuscaComponent } from './app/resultado-busca/resultado-busca.component';
import { AdminIndexComponent } from './app/admin-index/admin-index.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminIndexComponent,
    NavbarComponent,
    LoginComponent,
    IndexComponent,
    linkCircularComponent,
    CardReceitaComponent,
    CadastroComponent,
    paginaadminComponent,
    FormReceitaComponent,
    UserListComponent,
    PaginaReceitaTematicaComponent,
    PaginaDrinksComponent,
    PaginaReceitaComponent,
    PaginaReceitaSalgadoComponent,
    PaginaSobremesasComponent, 
    ResultadoBuscaComponent
      ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,// Sistema de rotas
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent], // Declara o componente raiz
})
export class AppModule {}
