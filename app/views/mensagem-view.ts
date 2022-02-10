export class MensagemView{

    private elmenent: HTMLElement;

    constructor(seletor:string){
        this.elmenent = document.querySelector(seletor);
    }


    template(model:string):string{
        return `
            <p class="alert alert-info"> ${model}</p>

        `;
    }


    update(model:string): void{

        const template = this.template(model);
        this.elmenent.innerHTML = template;

    }

}