import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { FileuploadModule } from '@app/ui/file-upload/file-upload.module'
import { TranslationServiceModule } from '@services/translation'
import { OthersComponent } from './others.component'
import { DialogModule } from '@app/ui/dialog/dialog.module'
import { ReactiveFormsModule } from '@angular/forms'
import { ReferencesModule } from '@app/ui/references/references.module'

@NgModule({
    declarations: [
        OthersComponent,
    ],
    imports: [
        CardModule,
        ConfirmModule,
        CommonModule,
        DialogModule,
        FileuploadModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        ReferencesModule,
        TranslationServiceModule,
    ],
    exports: [OthersComponent]
})
export class OthersModule { }
