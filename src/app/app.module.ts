import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeBr from '@angular/common/locales/pt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth_interceptor';
import { registerLocaleData } from '@angular/common';
import { IConfig, NgxMaskModule } from 'ngx-mask';
registerLocaleData(localeBr);


const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfigFunction),
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, 
      useClass : AuthInterceptor,
      multi : true
    },
    {
      provide: LOCALE_ID , useValue: 'pt-BR'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
