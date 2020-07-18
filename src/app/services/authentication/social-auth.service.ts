import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../../../environments/environment';
import { Configuration } from 'msal';
import {
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalAngularConfiguration,
  MsalInterceptor,
  MsalService
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/beta/', ['user.read']]
];

export const SocialAuthenticationConfig = [
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
              environment.google_oauth_client_id
          ),
        }
      ],
    } as SocialAuthServiceConfig,
  }];

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.azure_oauth_client_id,
      authority: environment.authority,
      redirectUri: environment.redirectUrl,
      postLogoutRedirectUri: environment.postLogoutRedirectUrl,
      navigateToLoginRequestUrl: true,
      validateAuthority: true
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: false,
    protectedResourceMap
  };
}

export const MSALAuthenticationConfig = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_CONFIG,
    useFactory: MSALConfigFactory
  },
  {
    provide: MSAL_CONFIG_ANGULAR,
    useFactory: MSALAngularConfigFactory
  },
    MsalService
];
