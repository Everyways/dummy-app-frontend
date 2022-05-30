import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {

    QUOTA_EXCEEDED: string = 'Quota exceeded';

    storeItem(itemKey: string, itemToStore: string) {
        try {
            localStorage.setItem(itemKey, itemToStore);
            return true;
        } catch(e) {
            if (this.isQuotaExceeded(e)) {
                return this.QUOTA_EXCEEDED;
            }
            return new Error('Error');
        }
    }

    getItem(itemToGetKey: string) {
        try {
            return localStorage.getItem(itemToGetKey);
        } catch(e) {
            return new Error('Error');
        }
    }

    deleteItem(itemToDelete: string) {
        try {
            localStorage.removeItem(itemToDelete);
            return true;
        } catch(e) {
            return new Error('Error');
        }
    }

    clearLocalStorage() {
        try {
            localStorage.clear();
            return true;
        } catch(e) {
            return new Error('Error');
        }
    }


    isQuotaExceeded(e: any): boolean {
        let quotaExceeded = false;
        if (e) {
          if (e.code) {
            switch (e.code) {
              case 22:
                quotaExceeded = true;
                break;
              case 1014:
                // Firefox
                if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                  quotaExceeded = true;
                }
                break;
            }
          } else if (e.number === -2147024882) {
            // Internet Explorer 8
            quotaExceeded = true;
          }
        }
        return quotaExceeded;
      }
}