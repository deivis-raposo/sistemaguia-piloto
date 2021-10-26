export class VendaDiariaProdutosDTO {
    constructor(
        public cdEmpresa: number,
        public dtInicioFiltro: Date,
        public dtFimFiltro: Date,

        public data: string,
        public combustiveis: number,
        public lubrificantes: number,
        public aditivos: number,
        public diversos: number,
        public vlrTotal: number,
        public vlrAcumulado: number,
        public vlrMedia: number,



    ) { }
}