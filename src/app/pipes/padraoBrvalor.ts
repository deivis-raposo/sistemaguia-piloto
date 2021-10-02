import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'padraoBr'
})
export class PadraoBr implements PipeTransform {

    transform(value: number | string, locale?: string): string {
        return new Intl.NumberFormat(locale = 'pt-BR', {
            minimumFractionDigits: 2
        }).format(Number(value));
    }

}