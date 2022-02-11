import { Imprivel } from "../utils/imprimivel.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Imprivel
{
    private negociacoes: Array<Negociacao> = [];
    //private negociacoes: Negociacao[] = [];

    public adiciona (negociacao: Negociacao)
    {
        this.negociacoes.push(negociacao);
    }

    public lista ():  ReadonlyArray<Negociacao>
    {
        return this.negociacoes; 
    }

    public paraTexto(): string {
        return JSON.stringify(this.negociacoes,null,2);
    }
}