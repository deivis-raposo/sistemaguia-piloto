export class VendaCategoriaDTO {
    constructor(

        public cdEmpresa: number,
        public param2: number,
        public dtInicioFiltro: Date,
        public dtFimFiltro: Date,
        public param5: number,

        public idGrupoProduto: number,
        public descGrupoProduto: string,
        public nmEmpresa: string,
        public cdProduto: number,
        public descProduto: string,
        public unMedidaProduto: string,
        public qtdProduto: number,
        public vlrBruto: number,
        public vlrVenda: number,
        public vlrAcrescimo: number,
        public vlrDesconto: number,
        public vlrLiquido: number

    ){}
}
