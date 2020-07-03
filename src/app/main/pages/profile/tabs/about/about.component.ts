import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { EmployeeService } from '../../../../../services/employee/employee.service';
import { AuthService } from '../../../../../services/authentication/auth.service';
import { FuseTranslationLoaderService } from '../../../../../../@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as german } from './i18n/de';
import { locale as spanish } from './i18n/es';
import { SocialUser } from 'angularx-social-login';

@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy
{
    // Private
    private _unsubscribeAll: Subject<any>;

    // Public
    user: SocialUser = new SocialUser();

    /**
     * Constructor
     *
     * @param _employeeService
     * @param _authService
     * @param _fuseTranslationLoaderService
     */
    constructor(
        private _employeeService: EmployeeService,
        private _authService: AuthService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, german, spanish);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.getEmployee();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the logged in employee
     */
    private getEmployee(): void
    {
        this._authService.getSocialLoggedInUser().subscribe(user => {
            this.user = user;
        });
    }
}
