import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredorComponent } from './financeiro/contas/credor/credor.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaginaManutencaoComponent } from './pagina-manutencao/pagina-manutencao.component';
import { RelatorioVendacategoriaExportComponent } from './relatorio-vendacategoria-export/relatorio-vendacategoria-export.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RelatorioExtratoMovicombustivelExportComponent } from './extrato-movicombustivel-export/relatorio-extrato-movicombustivel-export.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [AuthGuard] },
  { path: 'pagina-manutencao', component: PaginaManutencaoComponent, canActivate: [AuthGuard] },
  { path: 'extrato', component: RelatorioExtratoMovicombustivelExportComponent, canActivate: [AuthGuard] },
  { path: 'venda-categoria', component: RelatorioVendacategoriaExportComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
