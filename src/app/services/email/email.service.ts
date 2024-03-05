import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  async sendEmail(data: any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${environment.cloudFunctions.url}${environment.cloudFunctions.sendEmail}`,
          { data }
        )
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: (error) => {
            reject(error);
            console.error('There was an error!', error);
          },
        });
    });
  }
}
