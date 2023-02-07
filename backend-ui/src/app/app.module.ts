import { environment } from '../environments/environment'; // Angular CLI environment
import {  BrowserModule } from '@angular/platform-browser'
import {  NgModule } from '@angular/core'
import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import {  StoreModule } from '@ngrx/store'
import {  StoreDevtoolsModule } from '@ngrx/store-devtools'
import {  EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component'
import { LoginModule } from './ui/login/login.module';
import { NavbarModule } from './ui/navbar/navbar.module'
import { WrapperModule } from './ui/wrapper/wrapper.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material/snack-bar'
// dialog will be used all along the app, so better to import here and reuse
import { MatDialogModule } from '@angular/material/dialog'

import { TranslationServiceModule } from '@services/translation'

import { AuthenticationEffects } from '@store_effects/Authentication'
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

import { reducer as adminUserReducer } from '@store_reducers/AdminUser'
import { reducer as authReducer } from '@store_reducers/Authentication'
import { reducer as detailsReducer } from '@store_reducers/Details'
import { reducer as experienceReducer } from '@store_reducers/Experience'
import { reducer as languageReducer } from '@store_reducers/Languages'
import { reducer as localeReducer } from '@store_reducers/Locale'
import { reducer as messageReducer } from '@store_reducers/Message'
import { reducer as quoteReducer } from '@store_reducers/Quote'
import { reducer as resumeReducer } from '@store_reducers/Resume'
import { reducer as referencesReducer } from '@store_reducers/References'
import { reducer as settingsReducer } from '@store_reducers/Settings'
import { reducer as skillsReducer } from '@store_reducers/Skills'
import { reducer as socialNetworkReducer } from '@store_reducers/SocialNetworks'
import { reducer as trainingReducer } from '@store_reducers/Trainings'
import { reducer as translationReducer } from '@store_reducers/Translation'

import { LoadingInterceptor } from '@ui/loading-spinner/interceptor/http-interceptor'
import { SpinnerServiceModule } from '@ui/loading-spinner/loading-spinner.module'

import { LoginInterceptor } from '@ui/login/interceptor/http-interceptor'

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
            AuthenticationEffects,
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
        LoginModule,
        MatDialogModule,
        MatSnackBarModule,
        NavbarModule,
        StoreModule.forRoot({
            adminUser: adminUserReducer,
            authentication: authReducer,
            details: detailsReducer,
            experience: experienceReducer,
            languages: languageReducer,
            locale: localeReducer,
            message: messageReducer,
            quote: quoteReducer,
            resume: resumeReducer,
            references: referencesReducer,
            settings: settingsReducer,
            skills: skillsReducer,
            socialNetworks: socialNetworkReducer,
            trainings: trainingReducer,
            translation: translationReducer,
        }, {}),
        SpinnerServiceModule,
        TranslationServiceModule,

        WrapperModule,
        ...dev
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}