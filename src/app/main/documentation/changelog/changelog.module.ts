import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangelogComponent } from './changelog.component';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { AuthGuard } from '../../../services/authentication/auth.guard';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';


const routes = [
    {
        path        : 'changelog',
        component   : ChangelogComponent,
        canActivate : [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ChangelogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,

        FuseSharedModule,
        TranslateModule
    ],
    providers   : [
        AuthGuard
    ]
})
export class ChangelogModule
{
}
