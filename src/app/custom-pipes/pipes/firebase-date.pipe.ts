import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'firebaseDate',
})
export class FirebaseDatePipe implements PipeTransform {
  /**
   * 
   * @param timestamp Represents a point in time.
   * @param full Parameter to determine the output format, default false.
   * @returns Locale string or locale date string. Ex.: 12/12/2023, 12/12/2023, 10:22:04.
   */
  transform(timestamp: Timestamp, full: boolean = false): string | null {
    if (timestamp) {
      const date = timestamp.toDate();
      return full ? date.toLocaleString() : date.toLocaleDateString();
    }
    return null;
  }
}
