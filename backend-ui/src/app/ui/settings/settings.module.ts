import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from "@angular/material/table"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { CardModule } from '@app/ui/card/card.module'
import { PictureuploadModule } from '@app/ui/pictureupload/pictureupload.module'
import { TranslationServiceModule } from '@services/translation'
import { SettingsComponent } from './settings.component'
import { DataService } from '@services/data/data.service'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        FontAwesomeModule,
        NgbModule,
        CardModule,
        PictureuploadModule,
        MatCheckboxModule,
        MatTableModule,
        ReactiveFormsModule,
        TranslationServiceModule,
    ],
    exports: [SettingsComponent],
    providers: [DataService]
})
export class SettingsModule {}