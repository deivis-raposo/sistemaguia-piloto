import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'MoedaBR'
})
export class MoedaBr implements PipeTransform {

    transform(value: number, currencyCode: string = 'BRL', symbolDisplay: boolean = true, digits?: string): string {
        if (!value) {
            return '';
        }

        let currencyPipe: CurrencyPipe = new CurrencyPipe('pt-BR');
        let newValue: any = currencyPipe.transform(value, currencyCode, symbolDisplay, digits);

        return newValue;
    }

}