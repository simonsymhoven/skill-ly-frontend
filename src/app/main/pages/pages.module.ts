import { NgModule } from '@angular/core';

import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './authentication/login/login.module';
import { LockModule } from './authentication/lock/lock.module';
import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
import { MailConfirmModule } from './authentication/mail-confirm/mail-confirm.module';
import { RegisterModule } from './authentication/register/register.module';
import { ResetPasswordModule } from './authentication/reset-password/reset-password.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        MatSnackBarModule,
        // Authentication
        LoginModule,
        LockModule,
        ForgotPasswordModule,
        MailConfirmModule,
        RegisterModule,
        ResetPasswordModule,

        // Profile
        ProfileModule,

        // Dashboard
        DashboardModule
    ]
})
export class PagesModule
{

}
