
import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { MensagemView } from '../views/mensagem-view.js'
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesServices } from '../services/negociacao-service.js';

export class NegociacaoController {
    
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView',true);
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesServices = new NegociacoesServices();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    //@logarTempoDeExecucao()
    //@inspect()
    public adiciona(): void {  
     
        const negociacao = Negociacao.criaDe(this.inputData.value,
                                            this.inputQuantidade.value,
                                            this.inputValor.value);

        if( ! this.ehDiaUtil(negociacao.data))
        {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
            return ;
        }

        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    public importaDados(): void
    { 
        this.negociacoesServices.obterNegociacoesDoDia()
            .then (negoiacoesHoje => {
                for(let negociacao of negoiacoesHoje){
                    this.negociacoes.adiciona(negociacao);
                };
            this.negociacoesView.update(this.negociacoes);
        });
    }
    
    private ehDiaUtil(data:Date)
    {
        return  data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView():void
    {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negocicação adicionada com sucesso!");

    }

}