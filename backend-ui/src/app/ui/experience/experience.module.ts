import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';

import {
    MatTableModule
} from "@angular/material/table";

import {
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';

import {
    CardModule
} from '@app/ui/card/card.module'
import {
    ConfirmModule
} from '@app/ui/confirm/confirm.module'

import {
    TranslationServiceModule
} from '@services/translation';

import {
    ExperienceComponent
} from './experience.component';
import {
    DragDropModule
} from '@angular/cdk/drag-drop';
import {
    UnderscoreModule
} from '@app/services/underscore';

import {
    ExperienceDialogComponent
} from './experience-dialog.component';
import {
    ReactiveFormsModule
} from '@angular/forms';

@NgModule({
    declarations: [
        ExperienceComponent,
        ExperienceDialogComponent,
    ],
    imports: [
        CardModule,
        ConfirmModule,
        CommonModule,
        DragDropModule,
        FontAwesomeModule,
        MatTableModule,
        ReactiveFormsModule,
        TranslationServiceModule,
        UnderscoreModule,
    ],
    exports: [ExperienceComponent]
})
export class ExperienceModule {}