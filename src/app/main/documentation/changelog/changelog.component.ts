import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';
import {locale as english} from './i18n/en';
import {locale as german} from './i18n/de';
import {locale as spanish} from './i18n/es';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  constructor(
      private _fuseTranslationLoaderService: FuseTranslationLoaderService
  )
  {
      this._fuseTranslationLoaderService.loadTranslations(english, german, spanish);
  }

  ngOnInit(): void {
  }

}
