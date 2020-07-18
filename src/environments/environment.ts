// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr       : false,
    baseURL   : 'http://localhost:8080/api/v1',
    google_oauth_client_id : '33715599448-msad2upromm0dldmf8pvqrfjdsc2b5u2.apps.googleusercontent.com',
    azure_oauth_client_id: 'e805b187-4a75-4d76-ae89-767d32d53b17',
    authority: 'https://login.microsoftonline.com/42f2c9da-1a16-4951-9762-1ccb1be48721/',
    redirectUrl: 'http://localhost:4200/pages/dashboard',
    postLogoutRedirectUrl: 'http://localhost:4200/pages/auth/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
