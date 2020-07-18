import { NgModule } from '@angular/core';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangelogModule } from './changelog/changelog.module';

@NgModule({
    imports: [
        MatSnackBarModule,
        ChangelogModule
    ]
})
export class DocumentationModule
{

}
