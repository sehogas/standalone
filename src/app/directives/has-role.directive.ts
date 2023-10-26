import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private auth = inject(AuthService);

  private menuRoles: number[] = [];
  private userRoles: number[] = [];

  @Input()
  set appHasRole(val: number[]) {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.menuRoles = val;
    this.updateView();
  }

  ngOnInit(): void {
    this.userRoles = this.auth.getRoles();
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    if (this.checkPermission()) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    //console.log('Directive execute!');
    let hasPermission = false;
    if (this.menuRoles.length == 0) {
      return true;
    }
    if ( this.userRoles ) {
      for (const p of this.menuRoles) {
          const encontrado = this.userRoles.find( (value: number) => p == value);
          if (encontrado) {
            hasPermission = true;
            break;
          }
        }
      }
    return hasPermission;
  }

}
