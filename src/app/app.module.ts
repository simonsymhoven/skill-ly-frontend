import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { MSALAuthenticationConfig, SocialAuthenticationConfig} from './services/authentication/social-auth.service';
import { SocialLoginModule } from 'angularx-social-login';
import {MsalModule} from '@azure/msal-angular';


const appRoutes: Routes = [
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path        : 'documentation',
        loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule)
    },
    {
        path        : '**',
        redirectTo  : 'pages/dashboard'
    },
];


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        // Authentication
        SocialLoginModule,

        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // MSAL
        MsalModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        // AuthInterceptorProviders,
        SocialAuthenticationConfig,
        MSALAuthenticationConfig
    ]
})
export class AppModule {
}
