import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'cpf'
})
export class CpfPipe implements PipeTransform {
    transform(value: string, zenkaku: boolean = true): string {
        if (!value && value.length < 10) {
            return value;
        }
        if (value.length < 13) {
            return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(-2)}`
        } else {
            return `${value.substr(0, 2)}.${value.substr(2, 3)}.${value.substr(5, 3)}/${value.substr(8, 4)}-${value.substr(12)}`
        }
    }
}