import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../../../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FuseProgressBarService } from '../../../../../@fuse/components/progress-bar/progress-bar.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param authService
     * @param router
     * @param fuseProgressBarService
     * @param _snackbar
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private fuseProgressBarService: FuseProgressBarService,
        private _snackbar: MatSnackBar
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.fuseProgressBarService.show();
        this.authService
            .login(
                this.loginForm.value
            )
            .subscribe(
                token => {
                    this.fuseProgressBarService.hide();
                    this.router.navigate(['/pages/dashboard']);
                },
                error => {
                    this._snackbar.open(`Error ${error.status}: ${error.message}`, 'Ok');
                    this.fuseProgressBarService.hide();
                    throw error;
                }
            );
    }


    signInWithGoogle(): void {
        this.authService.loginWithGoogle();
    }


    signInWithAzureAD(): void {
        this.authService.loginWithAzure();
    }
}
