import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http"
import { ApolloModule, Apollo } from 'apollo-angular';
import {  InMemoryCache } from '@apollo/client/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
  ) {
    apollo.create({
      uri:"http://localhost:5000",
      cache: new InMemoryCache()
    });
  }
}



