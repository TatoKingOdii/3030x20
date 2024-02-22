import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard, authGuard} from "../libs/guards/auth-guard/auth.guard";
import {LoginComponent} from "./login/login.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {contentResolver, ContentResolver} from "../libs/resolvers/id-loaded/content.resolver";
import {CanActivateLoggedInGuard, loggedInGuard} from "../libs/guards/logged-in-guard/logged-in.guard";

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], resolve: [contentResolver]},
  {path: 'dashboard/:id', component: DashboardComponent, canActivate: [authGuard], resolve: [contentResolver]},
  {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
  {path: '', component: LoginComponent, canActivate: [loggedInGuard]},
  {path: '**', component: PageNotFoundComponent}
];


export const INJECTABLES = [AuthGuard, CanActivateLoggedInGuard, ContentResolver] as const;
