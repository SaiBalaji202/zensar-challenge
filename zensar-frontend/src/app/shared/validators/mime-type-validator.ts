import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeTypeValidator = (
  ctrl: AbstractControl
):
  | Promise<{ [err: string]: boolean }>
  | Observable<{ [err: string]: boolean }> => {
  if (typeof ctrl.value === 'string') {
    return of(null);
  }

  const file = ctrl.value as File;
  const reader = new FileReader();
  const frObs = new Observable(
    (observer: Observer<{ [err: string]: boolean }>) => {
      reader.onloadend = () => {
        const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
        let isValid = false;

        let header = '';
        arr.forEach((data) => {
          header += data.toString(16);
        });

        switch (header) {
          case '89504e47':
            // PNG
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
          case 'ffd8ffe3':
          case 'ffd8ffe8':
            // JPEG
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }

        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      };
      reader.readAsArrayBuffer(file);
    }
  );

  return frObs;
};
