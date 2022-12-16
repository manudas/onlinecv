import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';

import {
    MatLegacyTableModule as MatTableModule
} from "@angular/material/legacy-table";

import {
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import {
    /*FormsModule,*/
    ReactiveFormsModule
} from '@angular/forms'

import {
    CardModule
} from '@app/ui/card/card.module'

import {
    TranslationServiceModule
} from '@services/translation';

import {
    SkillsComponent
} from './skills.component';
import {
    SkillsDialogComponent
} from './skills-dialog.component';
import {
    LanguageDialogComponent
} from './languages-dialog.component';
import {
    UnderscoreModule
} from '@app/services/underscore';
import {
    ConfirmModule
} from '@app/ui/confirm/confirm.module';
import {
    DragDropModule
} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        SkillsComponent,
        SkillsDialogComponent,
        LanguageDialogComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DragDropModule,
        MatTableModule,
        FontAwesomeModule,
        CardModule,
        ReactiveFormsModule,
        TranslationServiceModule,
        UnderscoreModule,
    ],
    exports: [SkillsComponent]
})
export class SkillsModule {}