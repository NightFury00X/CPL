import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './auth-guard.service';
import {ErrorPageComponent} from './error-page/error-page.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LeagueComponent} from './league/league.component';
import {TeamComponent} from './team/team.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {ModalsComponent} from './modals/modals.component';
import {LoginComponent} from './auth/login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NotificationComponent} from './notifications/notification/notification.component';
import {NotificationService} from "./notifications/services/notification.service";
import {PlayerComponent} from './players/player/player.component';
import {RulesComponent} from './rulesbook/rules/rules.component';
import {AddComponent} from './rulesbook/add/add.component';
import {ConfirmComponent} from './alerts/confirm/confirm.component';
import {AlertsComponent} from './alerts/alerts.component';
import {SuccessComponent} from './alerts/success/success.component';
import {CancelComponent} from './alerts/cancel/cancel.component';
import {TeammanagementComponent} from './teammanagement/teammanagement.component';
import {SelectplayerComponent} from './alerts/selectplayer/selectplayer.component';
import {ScheduleComponent} from './schedule/schedule.component';
import {ListComponent} from './schedule/list/list.component';
import {ScorebookComponent} from './scorebook/scorebook.component';
import {AddScoreComponent} from './scorebook/add-score/add-score.component';
import {BattingScoreComponent} from './scorebook/batting-score/batting-score.component';
import {BowlingScoreComponent} from './scorebook/bowling-score/bowling-score.component';
import {ManageScoreBookComponent} from './scorebook/manage-score-book/manage-score-book.component';
import {AuthService} from "./services/auth.service";
import {HttpProxyService} from "./services/http-proxy.service";
import {HttpWrapperService} from "./services/http-wrapper.service";
import {JwtTokenHelper, TokenManagerService} from "./services/token-manager.service";
import {AppService} from "./services/app.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        ErrorPageComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        LeagueComponent,
        TeamComponent,
        PageHeaderComponent,
        ModalsComponent,
        LoginComponent,
        NotificationComponent,
        PlayerComponent,
        RulesComponent,
        AddComponent,
        ConfirmComponent,
        AlertsComponent,
        SuccessComponent,
        CancelComponent,
        TeammanagementComponent,
        SelectplayerComponent,
        ScheduleComponent,
        ListComponent,
        ScorebookComponent,
        AddScoreComponent,
        BattingScoreComponent,
        BowlingScoreComponent,
        ManageScoreBookComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [AuthGuard, NotificationService, AuthService, HttpProxyService, HttpWrapperService, TokenManagerService, AppService, JwtTokenHelper],
    bootstrap: [AppComponent]
})
export class AppModule {
}
