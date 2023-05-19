import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { LoginComponent } from '../login/login.component';
import { SessionComponent } from '../portfolio/session/session.component';

const routes: Routes = [
  {path:'home', component:PortfolioComponent},
  {path:'iniciar-sesion', component:LoginComponent},
  {path:'account', component:SessionComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteModule { }
