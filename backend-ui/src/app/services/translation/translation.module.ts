import { NgModule } from '@angular/core';

import { TranslatePipe } from './translation.pipe';
import { TranslationService } from './translation.service';

@NgModule({
    declarations: [TranslatePipe],
    imports: [],
    exports: [TranslatePipe],
    providers: [TranslationService]
})
export class TranslationServiceModule {}
