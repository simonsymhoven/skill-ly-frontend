import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { AuthGuard } from '../../../services/authentication/auth.guard';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
    {
        path        : 'profile',
        component   : ProfileComponent,
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        TranslateModule
    ],
    providers   : [
        AuthGuard
    ]
})
export class ProfileModule
{
}
