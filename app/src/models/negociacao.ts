import { Comparavel } from "../interfaces/comparavel.js";
import { Imprivel } from "../utils/imprimivel.js";

export class Negociacao implements Imprivel, Comparavel<Negociacao>{

    //definir valores apenas no consctructor.
    constructor(
            private _data: Date,
            public readonly quantidade:number,
            public readonly valor:number)
    {
    }

    get volume() :number{

        return this.quantidade * this.valor;
    }

    get data(): Date{
        const data = new Date(this._data.getTime());
        return data;
    }

    public static criaDe(dataString: string, quantidadeString:string, valorString:string)
    {
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }

    public paraTexto(): string {
        
        return `
                Data: ${this.data},
                Quantidade ${this.quantidade},
                valor ${this.valor} `
    }

    public ehIgual(negociacao: Negociacao): boolean{

        return this.data.getDate() === negociacao.data.getDate() 
               && this.data.getDay() === negociacao.data.getDay() 
               && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}