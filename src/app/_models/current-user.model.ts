import { User } from "./user.model";

export class CurrentUser{

    constructor(
        public token: string,
        public user: User,
        public idUsuarioEmpresa: string
    ){}
}
