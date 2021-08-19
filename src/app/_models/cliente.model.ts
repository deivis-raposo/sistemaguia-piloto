export class Cliente{
    constructor(
        public id: number,
        public nmCliente: string,
        public cpfCliente: string,
        public emailCliente: string,
        public foneCliente: string,
        public cidade: string,
        public uf: string
    ){}
}