export function domInjector(seletor:string)
{
    return function (target:any, propertyKey:string)    {

        //console.log("criando...")
        let elemento: HTMLElement | null = null;

        const getter = function(){

            if (!elemento){
                elemento = document.querySelector(seletor);
          //      console.log("buscando...")
            }
            return elemento;
        }

        Object.defineProperty(
                            target, 
                            propertyKey,{
            get: getter
        });
    }

}