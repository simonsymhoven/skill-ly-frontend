import { NgModule } from '@angular/core';

import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatSnackBarModule,
        // Authentication
        LoginModule,
        RegisterModule,

        // Profile
        ProfileModule,

        // Dashboard
        DashboardModule
    ]
})
export class PagesModule
{

}
