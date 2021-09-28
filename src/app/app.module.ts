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
import { RelatorioModeloEditComponent } from './relatorio-modelo-edit/relatorio-modelo-edit.component';
import { RelatorioModeloFormComponent } from './relatorio-modelo-form/relatorio-modelo-form.component';
import { InputempresaComponent } from './inputs-pesquisa/inputempresa/inputempresa.component';
//import { VendacategoriaComponent } from './vendacategoria/vendacategoria.component';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RelatorioVendacategoriaExportComponent } from './relatorio-vendacategoria-export/relatorio-vendacategoria-export.component';
import { VendaCategoriaService } from './_services/vendacategoria.service';
import { ExtratoMovimentoCombustivelService } from './_services/extrato-movimento-combustivel.service';
import { CpfPipe } from '../app/pipes/cpf.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { ExtratoMovicombustivelExportComponent } from './extrato-movicombustivel-export/extrato-movicombustivel-export.component'
import { UsuarioEmpresaService } from './_services/usuario-empresa.service';
import { PerfilService } from './_services/perfil.service';
import { ProdutoService } from './_services/produto.service';



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
    RelatorioModeloEditComponent,
    RelatorioModeloFormComponent,
    InputempresaComponent,
    //VendacategoriaComponent,
    RelatorioVendacategoriaExportComponent,
    CpfPipe,
    ExtratoMovicombustivelExportComponent,


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
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    })

  ],
  providers: [
    UsuarioService,
    PerfilService,
    ProdutoService,
    UsuarioEmpresaService,
    VendaCategoriaService,
    ExtratoMovimentoCombustivelService,
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
