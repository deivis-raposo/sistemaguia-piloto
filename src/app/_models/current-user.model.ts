import { Usuario } from "./usuario.model";

export class CurrentUser{

    constructor(
        public token: string,
        public usuario: Usuario
    ){}

}