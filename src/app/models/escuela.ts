import { Facultad } from "./facultad";

export class Escuela {
    idescuela: number;
    nombre: string;
    idfacultad: number;
    constructor(idescuela:number=0, nombre:string="", idfacultad:number=0){
        this.idescuela=idescuela;
        this.nombre=nombre;
        this.idfacultad=idfacultad;
    }
}
