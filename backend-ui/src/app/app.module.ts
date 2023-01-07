import { environment } from '../environments/environment'; // Angular CLI environment
import {  BrowserModule } from '@angular/platform-browser'
import {  NgModule } from '@angular/core'
import {  HttpClientModule } from '@angular/common/http'

import {  StoreModule } from '@ngrx/store'
import {  StoreDevtoolsModule } from '@ngrx/store-devtools'
import {  EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component'
import { NavbarModule } from './ui/navbar/navbar.module'
import { WrapperModule } from './ui/wrapper/wrapper.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material/snack-bar'
// dialog will be used all along the app, so better to import here and reuse
import { MatDialogModule } from '@angular/material/dialog'

import { TranslationServiceModule } from '@services/translation'

import { DetailsEffects } from '@store_effects/Details'
import { ExperienceEffects } from './store/effects/Experience'
import { LanguageEffects } from '@store_effects/Languages'
import { LocaleEffects } from '@store_effects/Locale'
import { OthersEffects } from '@store_effects/Others'
import { SkillEffects } from '@store_effects/Skills'
import { SocialNetworksEffects } from '@store_effects/SocialNetworks'
import { TrainingEffects } from '@store_effects/Training'
import { TranslationEffects } from '@store_effects/Translation'
import { SettingsEffects } from './store/effects/Settings';

import { reducer as detailsReducer } from '@store_reducers/Details'
import { reducer as experienceReducer } from '@store_reducers/Experience'
import { reducer as languageReducer } from '@store_reducers/Languages'
import { reducer as localeReducer } from '@store_reducers/Locale'
import { reducer as messageReducer } from '@store_reducers/Message'
import { reducer as referencesReducer } from '@store_reducers/References'
import { reducer as settingsReducer } from '@store_reducers/Settings'
import { reducer as skillsReducer } from '@store_reducers/Skills'
import { reducer as socialNetworkReducer } from '@store_reducers/SocialNetworks'
import { reducer as trainingReducer } from '@store_reducers/Trainings'
import { reducer as translationReducer } from '@store_reducers/Translation'


let dev = [
    StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
    }),
];

if (environment.production) {
    dev = [];
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        EffectsModule.forRoot([
            DetailsEffects,
            ExperienceEffects,
            LanguageEffects,
            LocaleEffects,
            OthersEffects,
            SettingsEffects,
            SkillEffects,
            SocialNetworksEffects,
            TrainingEffects,
            TranslationEffects,
        ]),
        HttpClientModule,

        MatDialogModule,
        MatSnackBarModule,
        NavbarModule,
        StoreModule.forRoot({
            details: detailsReducer,
            experience: experienceReducer,
            languages: languageReducer,
            locale: localeReducer,
            message: messageReducer,
            references: referencesReducer,
            settings: settingsReducer,
            skills: skillsReducer,
            socialNetworks: socialNetworkReducer,
            trainings: trainingReducer,
            translation: translationReducer,
        }, {}),
        TranslationServiceModule,

        WrapperModule,
        ...dev
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}