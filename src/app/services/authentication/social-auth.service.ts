import { GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from '../../../environments/environment';


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
  }
];
