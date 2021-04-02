import { Pipe, PipeTransform } from '@angular/core';

import {
  Subject,
} from 'rxjs';
import { TranslationService } from './translation.service';


/*
 * Translate a string to the localised version
 * depending on language id passed as a parameter
*/
@Pipe({
  name: 'translate',
  pure: false  // it'll be executed no matters the parameters passed to transform have changed or not
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) { }

  transform(key: string, component?: any): Subject<string> {
    if  (key) { // let's avoid undefined translations
      const caller: string = component?.constructor?.name // otherwise, undefined
      const subject = this.translationService.getTranslationSubject(key, caller)
      this.translationService.requestTranslation(key, caller)

      return subject
    }
    return null
  }
}