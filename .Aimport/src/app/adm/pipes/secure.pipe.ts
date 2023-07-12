import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {
// 
 
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url:string): Observable<SafeUrl> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
      return this.http
          .get(url, { responseType: 'blob', headers: headerOptions})
          .pipe(map(val => this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(val))));
  }


 blob(url:string) {
  let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
  this.http.get(url,{observe: 'response' ,
    responseType: 'arraybuffer',headers:headerOptions} 
   ).subscribe(response => {
     let headerProperty = response.headers.get('Content-Type');
     console.log("HEADERS", response.headers)
     console.log(headerProperty)

     this.downLoadFile(response.body, headerProperty!)
    }
     );

 }

/**
* Method is use to download file.
* @param data - Array Buffer data
* @param type - type of the document.
*/
downLoadFile(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
  }
}
  
}