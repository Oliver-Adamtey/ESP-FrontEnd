import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsImageProcessingService {

  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  private base64DataSubject = new BehaviorSubject<string | null>(null);
  base64Data$ = this.base64DataSubject.asObservable();

  private maxSize = 1 * 1024 * 1024;

  processFile(file: File, controlName: string): void {
    const fileSize = file.size;

    if (fileSize > this.maxSize) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileDataUrl = reader.result as string;
      this.profileImageSubject.next(fileDataUrl);
    };

    reader.onloadend = () => {
      const readerForBase64 = new FileReader();
      readerForBase64.onload = () => {
        const base64Data = readerForBase64.result as string;
        this.base64DataSubject.next(base64Data);
      };
      readerForBase64.readAsDataURL(file);
    };

    reader.readAsDataURL(file);
  }

  uploadFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const profileImageUrl = e.target.result;
      this.profileImageSubject.next(profileImageUrl);
    };
    reader.readAsDataURL(file);
  }
}
