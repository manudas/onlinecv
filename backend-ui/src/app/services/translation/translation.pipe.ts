import {
    ChangeDetectorRef,
    EmbeddedViewRef,
    Pipe,
    PipeTransform,
    Type
} from '@angular/core';

import { Subject } from 'rxjs';
import { TranslationService } from './translation.service';

/*
 * Translate a string to the localised version
 * depending on language id passed as a parameter
 */
@Pipe({
    name: 'translate',
    pure: false // it'll be executed no matters the parameters passed to transform have changed or not
})
export class TranslatePipe implements PipeTransform {
    constructor(
        private translationService: TranslationService,
        private cdRef: ChangeDetectorRef
    ) {}

    transform(key: string): Subject<string> {
        const context = (
            this.cdRef as EmbeddedViewRef<Type<any>>
        ).context;
        const caller: string = context?.constructor?.name; // otherwise, undefined
        return this.translationService.asyncTranslate(
            key,
            caller
        );
    }
}
