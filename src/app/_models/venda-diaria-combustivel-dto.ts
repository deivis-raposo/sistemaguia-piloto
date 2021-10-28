export class VendaDiariaCombustivelDTO {
    constructor(
        public cdEmpresa: number,
        public dtInicioFiltro: Date,
        public dtFimFiltro: Date,

        public data: string,
        public gasolinaComum: number,
        public gasolinaAditivada: number,
        public etanolHidratado: number,
        public oleoDieselBS500: number,
        public oleoDiselBS10: number,
        public totalDia: Number,


    ) { }
}