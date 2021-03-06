import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './_services/usuario.service';
import { ClienteService } from './_services/cliente.service';
import { VeiculoService } from './_services/veiculo.service';
import { DialogService } from './_services/dialog.service';
import { AuthGuard } from './security/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './security/auth.interceptor';
import { LoginComponent } from './security/login/login.component';
import { SharedService } from './_services/shared.service';
import { DialogComponent } from './dialog/dialog.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PaginaManutencaoComponent } from './pagina-manutencao/pagina-manutencao.component';
import { CredorComponent } from './financeiro/contas/credor/credor.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
//import { VendacategoriaComponent } from './vendacategoria/vendacategoria.component';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RelatorioVendacategoriaExportComponent } from './relatorio-venda-categoria-export/relatorio-venda-categoria-export.component';
import { VendaCategoriaService } from './_services/venda-categoria.service';
import { ExtratoMovimentoCombustivelService } from './_services/extrato-movimento-combustivel.service';
import { CpfPipe } from '../app/pipes/cpf.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { RelatorioExtratoMovicombustivelExportComponent } from './relatorio-extrato-movicombustivel-export/relatorio-extrato-movicombustivel-export.component'
import { UsuarioEmpresaService } from './_services/usuario-empresa.service';
import { PerfilService } from './_services/perfil.service';
import { MenuService } from './_services/menu.service';
import { ProdutoService } from './_services/produto.service';
import { PadraoBr } from './pipes/padraoBrvalor';
import { MoedaBr } from './pipes/MoedaBrR$.pipe';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilEditComponent } from './perfil-edit/perfil-edit.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { EmpresaService } from './_services/empresa.service';
import { RelatorioVendaDiariaProdutosExportComponent } from './relatorio-venda-diaria-produtos-export/relatorio-venda-diaria-produtos-export.component';
import { VendaDiariaProdutosService } from './_services/venda-diaria-produtos.service';
import { VendaDiariaCombustivelService } from './_services/venda-diaria-combustivel.service';
import { VendaCartoesDiaService } from './_services/venda-cartoes-dia.service';
import { RelatorioVendaDiariaCombustivelComponent } from './relatorio-venda-diaria-combustivel/relatorio-venda-diaria-combustivel.component';
import { RelatorioVendaCartoesDiaComponent } from './relatorio-venda-cartoes-dia/relatorio-venda-cartoes-dia.component';
import { RelatorioVendaProdutosFuncionarioComponent } from './relatorio-venda-produtos-funcionario/relatorio-venda-produtos-funcionario.component';
import { FlexLayoutModule } from '@angular/flex-layout';




registerLocaleData(localePT);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    UsuarioComponent,
    LoginComponent,
    DialogComponent,
    UsuarioEditComponent,
    UsuarioFormComponent,
    PaginaManutencaoComponent,
    CredorComponent,
    RelatoriosComponent,
    //VendacategoriaComponent,
    RelatorioVendacategoriaExportComponent,
    CpfPipe,
    RelatorioExtratoMovicombustivelExportComponent,
    PadraoBr,
    MoedaBr,
    PerfilComponent,
    PerfilEditComponent,
    PerfilFormComponent,
    RelatorioVendaDiariaProdutosExportComponent,
    RelatorioVendaDiariaCombustivelComponent,
    RelatorioVendaCartoesDiaComponent,
    RelatorioVendaProdutosFuncionarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    })

  ],
  providers: [
    UsuarioService,
    PerfilService,
    MenuService,
    EmpresaService,
    ProdutoService,
    UsuarioEmpresaService,
    VendaCategoriaService,
    ExtratoMovimentoCombustivelService,
    VendaDiariaProdutosService,
    VendaDiariaCombustivelService,
    VendaCartoesDiaService,
    SharedService,
    ClienteService,
    VeiculoService,
    DialogService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
