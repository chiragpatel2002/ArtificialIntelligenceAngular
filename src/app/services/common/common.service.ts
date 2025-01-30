import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Observable, catchError, of, tap, Subject, BehaviorSubject, throwError } from 'rxjs';
import { AppService } from '../app/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageConstants, TokenConstants } from 'src/app/constants/MessageConstants';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/commonModel';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  private userImageSource = new BehaviorSubject<string | null>(null);
  userImage$ = this.userImageSource.asObservable();
  private errorMessage: string = "Something went wrong. Please try again after sometime.";
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  private encryptionKey = CryptoJS.enc.Utf8.parse('EA34FF3E-JU84-1974-AW70-BB81D9564426');
  private KEY = CryptoJS.enc.Hex.parse(
    'c604f199ff095b4ced4caf373264e84045f71b384ce39628ee8adca2b27109e8'
  );
  private IV = CryptoJS.enc.Hex.parse('47b5b25d579c0bed815c9166b4f37ee8');
  private salt = CryptoJS.enc.Base64.parse('SXZhbiBNZWR2ZWRldg==');
  private iterations = 100000;
  private CryptoAlgo = CryptoJS.algo.SHA512;
  private KEY2 = "c604f199ff095b4ced4caf373264e84045f71b384ce39628ee8adca2b27109e8";
  private IV2 = "47b5b25d579c0bed815c9166b4f37ee8";
  private logoutSubject = new Subject<void>();
  public logoutAction$ = this.logoutSubject.asObservable();
  public href: any;
  IsError: boolean = false;
  private bannerData = new BehaviorSubject<string | null>(null);
  bannerData$ = this.bannerData.asObservable();
  isSystemAlert: boolean = false;

  constructor(private toster: ToastrService, private appService: AppService, private http: HttpClient, private spinner: NgxSpinnerService, private dialog: NgbModal) {
  }

  doGet(apiUrl: String): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.ApiBaseUrl}${apiUrl}`;

    return this.http.get<ApiResponse>(url, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }

  doPost(apiUrl: string, postData: any): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders(
      )
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.post<ApiResponse>(url, postData, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }

  doPut(apiUrl: string, putData: any): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders(
      )
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.put<ApiResponse>(url, putData, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }

  doDelete(apiUrl: String, idtoDelete: number): Observable<ApiResponse> {
    const httpOptions = {
      headers: new HttpHeaders(
      )
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Origin', '*');
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    }

    const options = {
      headers: httpOptions.headers,
      body: {
        UserId: idtoDelete
      }
    };
    const url = (`${environment.ApiBaseUrl}${apiUrl}`);
    return this.http.delete<ApiResponse>(url, httpOptions).pipe(
      tap(() => this.log(`doGet success`)),
      catchError((error: HttpErrorResponse) => {
        this.checkAuthorize(error);
        return throwError(() => error);
      })
    );
  }

  doDownloadPost(apiUrl: string, postData: any) {
    const httpOptions = {
      headers: new HttpHeaders()
    };
    let loginData = localStorage.getItem('authToken');
    if (loginData) {
      httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + loginData);
      httpOptions.headers = httpOptions.headers.set('Access-Control-Allow-Methods', '*');
    }
    const url = `${environment.ApiBaseUrl}${apiUrl}`;
    return this.http.post(url, postData, { headers: httpOptions.headers, observe: "response", responseType: "blob" });
  }

  postRequest(apiUrl: string, request: any): Observable<string> {    
    const url = `${environment.AIBaseUrl}${apiUrl}`
    // Serialize the request body
    const jsonRequest = JSON.stringify(request);

    // Set up headers
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    // Make the HTTP POST request
    return this.http.post(url, jsonRequest, { headers, responseType: 'text' })
      .pipe(
        catchError((error) => {
          throw new Error(`Error: ${error.message}`);
        })
      );
  }

  async handleResponse(responseBody: string): Promise<string> {
    // Assume ProcessResponseBodyConcurrently is a function that processes the response
    const responses = await this.processResponseBodyConcurrently(responseBody);
    return responses.join('');
  }

  async processResponseBodyConcurrently(responseBody: string): Promise<string[]> {
    // Simulate processing the response (e.g., parsing JSON, performing async operations)
    return [responseBody]; // Just returns the responseBody as an array for now
  }

  // Check Authorize Role
  checkAuthorize(error: any) {
    if (error.status == HttpStatusCode.Unauthorized) {
      if (this.IsError == false) {
        this.IsError = true
        this.toster.error(ErrorMessageConstants.Message);
      }
      localStorage.clear();
      this.appService.logout();
      this.spinner.hide();
      this.dialog.dismissAll();
    }
    else if (error.status == HttpStatusCode.Forbidden) {
      if (this.IsError == false) {
        this.IsError = true
        this.toster.error(TokenConstants.Session_Expired);
      }
      localStorage.clear();
      this.appService.logout();
      this.spinner.hide();
      this.dialog.dismissAll();

    }
    else if (error.status === HttpStatusCode.InternalServerError) {
      this.toster.error(ErrorMessageConstants.Message);
      this.appService.logout();
      this.spinner.hide();
      this.dialog.dismissAll();
    }
    else {
      let errorMessage = (error.error.message != null) ? error.error.message : error.message
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      this.checkAuthorize(error);

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.IsError = false;
  }

  public Decrypt(cipherText: string): string {
    const KEY = CryptoJS.enc.Hex.parse(this.KEY2);
    const IV = CryptoJS.enc.Hex.parse(this.IV2);

    // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
    let decrypt = CryptoJS.AES.decrypt(cipherText, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8).toString();

    return decrypt.replaceAll("\x00", "").replaceAll(/&quot;/g, '"');
  }

  public EncryptForNotSlash(clearText: string): string {
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(clearText), this.KEY,
      {
        keySize: 128 / 8,
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encodeURIComponent(encrypted.toString());
  }

  public DecryptForNotSlash(cipherText: string): string {
    let decrypted = CryptoJS.AES.decrypt(decodeURIComponent(cipherText), this.KEY, {
      keySize: 128 / 8,
      iv: this.IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  public EncryptNew(clearText: string): string {
    // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf16LE.parse(clearText),
      this.KEY,
      {
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
  }

  public DecryptNew(cipherText: string): string {
    // As you're using Encoding.Unicde in .net, we have to use CryptoJS.enc.Utf16LE here.
    let decrypt = CryptoJS.AES.decrypt(cipherText, this.KEY, {
      iv: this.IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
      .toString(CryptoJS.enc.Utf8)
      .toString();
    return decrypt.replaceAll('\x00', '').replaceAll(/&quot;/g, '"');
  }

  clearLocalStorage(clearAll: boolean) {
    if (clearAll) {
      localStorage.clear();
    }
    else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userImage");
    }
  }

  getTimeZone() {
    const timezoneOffset = new Date().getTimezoneOffset();
    const offset = Math.abs(timezoneOffset);
    const offsetOperator = timezoneOffset < 0 ? '+' : '-';
    const offsetHours = Math.floor(offset / 60).toString().padStart(2, '0');
    const offsetMinutes = Math.floor(offset % 60).toString().padStart(2, '0');
    return `${offsetOperator}${offsetHours}:${offsetMinutes}`;
  }
   // Generate Response from Ollama Generate API
  getResponse(request: any): Observable<any> {
    const jsonRequest = JSON.stringify(request);
    const OllamaGenerateAPIUrl = 'http://59.144.96.161:11434/api/generate'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

     // Use observe: 'body' and set responseType to 'text'
     return this.http.post<string>(OllamaGenerateAPIUrl, jsonRequest, {
      headers,
      responseType: 'text' as 'json' // This works in Angular versions 14 and later
    }).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return of(`Error: ${error.message}`);
      })
    );
  }
}