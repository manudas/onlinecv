import { Pipe, PipeTransform } from '@angular/core';
/*
 * Translate a string to the localised version
 * depending on language id passed as a parameter
*/
@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {
  transform(key: string, lang_id?: number): string {
    const not_implemented = 'not yet implemented';
    return not_implemented;
  }
}