import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { EmployeeService } from '../../../services/employee/employee.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as german } from './i18n/de';
import { locale as spanish } from './i18n/es';
import { SocialUser } from 'angularx-social-login';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    user: SocialUser = new SocialUser();

    /**
     * Constructor
     */
    constructor(
        private _employeeService: EmployeeService,
        private _authService: AuthService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, german, spanish);
        this.getEmployee();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the logged in employee
     */
    getEmployee(): void {
        this.user = this._authService.getUser();
    }
}
