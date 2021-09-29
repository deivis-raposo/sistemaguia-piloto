export class ExtratoMovimentoCombustivelDTO {
    constructor(
        public dtInicioFiltro: Date,
        public dtFimFiltro: Date,

        public descProduto: string,
        public data: string,
        public estoqueInicial: number,
        public entrada: number,
        public venda: number,
        public afericao: number,
        public estoqueContabil: number,
        public estoqueFisico: number,
        public diferenca: number,
        public nuTanque: string,
        public ajusteSobra: number,
        public ajustePerda: number,
        public diaSemana: string
    ){}
}
