import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TranslationServiceModule } from '@services/translation'

import { FileuploadComponent } from './file-upload.component'
import { ConfirmComponent } from './confirm.component'

@NgModule({
    declarations: [
        FileuploadComponent,
        ConfirmComponent,
    ],
    imports: [
        CommonModule,
        TranslationServiceModule
    ],
    exports: [FileuploadComponent]
})

export class FileuploadModule {}