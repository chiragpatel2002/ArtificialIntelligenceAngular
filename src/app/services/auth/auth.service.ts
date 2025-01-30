import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  startStatusObs$: any;
  length: any;
  startStatus: any;

  constructor(private storageService:StorageService) {}

  isTokenExpired():boolean {
    let expireDate = this.storageService.getValue('expireDate');
    return new Date().getTime() > new Date(expireDate).getTime();
  }

  getAccessToken(): any {
    let token = this.storageService.getValue(StorageKey.authToken);
    return token ? token : null;
  }

  getUserId(): any {
    let id = JSON.parse(this.storageService.getValue(StorageKey.currentUser)).id;
    return id ? id : null;
  }
}