
export class User{
  constructor(
    public idUsuario: string,
    public nomeUsuario: string,
    public idGrupoUsuario: number,
    public idFuncionario: string,
    public senha: string,
    public codUsuario: number,
    public loginUsuario: string,
    public tipoUsuario: number,
    public dataCadastro: Date,
    public situacao: number,
    public alteraSenha: string,
    public email: string,
    public conexao: number,
    public idPerfil: number,
    public profile: string
  ){}
}
