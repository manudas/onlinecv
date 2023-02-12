import { Pipe, PipeTransform } from '@angular/core';


/*
* Changes underscores in a string for spaces
*/
@Pipe({
  name: 'noSpecialChars',
})
export class SpecialCharsPipe implements PipeTransform {

  constructor() { }

  transform(input: string): string {
    return input.replace(/[_-]/g, " ");
  }
}