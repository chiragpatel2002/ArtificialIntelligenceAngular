import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private router: Router) { }

    logout() {
        this.user = null;
        this.router.navigate(['login']);
        localStorage.clear();
    }
}