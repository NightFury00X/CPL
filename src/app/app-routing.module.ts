import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LeagueComponent} from "./league/league.component";
import {TeamComponent} from "./team/team.component";
import {LoginComponent} from "./auth/login/login.component";
import {PlayerComponent} from "./players/player/player.component";
import {RulesComponent} from "./rulesbook/rules/rules.component";
import {TeammanagementComponent} from "./teammanagement/teammanagement.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ScorebookComponent} from "./scorebook/scorebook.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'league', component: LeagueComponent},
    {path: 'rules', component: RulesComponent},
    {path: 'team', component: TeamComponent},
    {path: 'manageTeam', component: TeammanagementComponent},
    {path: 'player', component: PlayerComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'scorebook', component: ScorebookComponent},
    {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    {path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
