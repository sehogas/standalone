import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: '154941308532-9hl4e05d5sl5scs1e7nhqhpe0shuav68.apps.googleusercontent.com',
    redirectUri: window.location.origin + '/main',
    scope: 'openid profile email',
  }

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(this.config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  get isLoggedIn() {
    return !!this.oauthService.getIdToken();
  }

  get getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  get claims() {
    return this.oauthService.getIdentityClaims() as any;
  }

  logIn() {
    this.oauthService.initLoginFlow();
  }

  logOut() {
    this.oauthService.logOut();
  }

  public getRoles(): number[] {
    return [1];
    // const token = this.getAccessToken()
    // if (!token) {
    //   return [];
    // }
    // let roles: number[] = [];
    // const claims = atob(token.split('.')[1]);
    // if (claims) {
    //   roles = JSON.parse(claims).rol.split(',').map((i: string)=>Number(i));
    // }
    // return roles;
  }


}
