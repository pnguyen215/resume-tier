import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlibsAuthenticationService } from 'ngx-blibs-api';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: BlibsAuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const isAuthenticated = this.authenticationService.isAuthenticated();
        if (isAuthenticated) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.getBlibsToken()}`
                }
            });
        }
        return next.handle(request);
    }
}

