import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard} from './user/auth.guard';

/* Feature Modules */
// import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { PreloadAllModules, RouterModule } from '@angular/router';
import {SelectiveStrategy} from './selective-strayegy.service'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {
        path: 'products', canActivate: [AuthGuard],
        data: {preload: true},
        loadChildren: () => 
        import('./products/product.module')
        .then (m => m.ProductModule)
      },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ],
    {
      preloadingStrategy: SelectiveStrategy
    }
    ),
    // ProductModule,
    UserModule,
    MessageModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
