export class Usuario {
    constructor(
        public id: number,
        public nmUsuario: string,
        public emailUsuario: string,
        public senha: string,
        public cpfUsuario: string,
        public profile: string,
        public nuTelefone: string,
        public stAcesso: string
    ){}
}