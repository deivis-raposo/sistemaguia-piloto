import { Empresa } from "./empresa.model";
import { Menu } from "./menu.model";
import { Perfil } from "./perfil.model";

export class MenuPerfil{
  constructor(
    public perfil: Perfil,
    public empresa: Empresa,
    public menu: Menu[]
  ){}
}
