import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { MatMenu } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from 'src/app/directives/has-role.directive';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterModule,
    HasRoleDirective,
  ]
})
export class NavBarComponent {
  
  public auth = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);
  
  @Input() title: string = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    handleLoginClick = () => this.auth.isLoggedIn ? this.auth.logOut() : this.auth.logIn();

    public menu: any[] = [
      {
        "icon": "home",
        "name": "Inicio",
        "redirect": "/main",
        "roles": [1]
      },
     ];

     public menuProfile: any[] = [
      {
        "icon": "info",
        "name": "Información de usuario",
        "redirect": "/perfil/inicio",
        "roles": [1]
      }
    ];
  
}
