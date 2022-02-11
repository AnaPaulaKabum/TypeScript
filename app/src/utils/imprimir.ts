import { Imprivel } from "./imprimivel.js";

export function imprimir(...objetos: Array<Imprivel>){

    for (let objeto of objetos){
        console.log(objeto.paraTexto());
    }

}