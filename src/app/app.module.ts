import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importaciones de otros servicios
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRouteModule} from './app-route/app-route.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//componentes
import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { JobComponent } from './job/job.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesService } from './servicios/services.service';
import { InterceptorService } from './servicios/interceptor.service';
import { SessionComponent } from './portfolio/session/session.component';
import { AboutMeSessionComponent } from './portfolio/session/about-me-session/about-me-session.component';
import { EducationSessionComponent } from './portfolio/session/education-session/education-session.component';
import { JobSessionComponent } from './portfolio/session/job-session/job-session.component';
import { NavigationSessionComponent } from './portfolio/session/navigation-session/navigation-session.component';
import { ProjectsSessionComponent } from './portfolio/session/projects-session/projects-session.component';
import { SkillsSessionComponent } from './portfolio/session/skills-session/skills-session.component';
import { MenuSessionComponent } from './portfolio/session/navigation-session/menu-session/menu-session.component';
import { BtnEditComponent } from './portfolio/session/btn-edit/btn-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    JobComponent,
    NavigationComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    MenuComponent,
    LoginComponent,
    PortfolioComponent,
    SessionComponent,
    AboutMeSessionComponent,
    EducationSessionComponent,
    JobSessionComponent,
    NavigationSessionComponent,
    ProjectsSessionComponent,
    SkillsSessionComponent,
    MenuSessionComponent,
    BtnEditComponent,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRouteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ServicesService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
