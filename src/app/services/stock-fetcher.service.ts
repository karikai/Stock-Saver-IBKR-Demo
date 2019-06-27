import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockFetcherService {

  // Gets stock object from api using the stocks symbol
  getStock(symbol: string) {
    return new Promise((resolve) => {
      this.http.get('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=pk_c37812d235954d52b6089fe8ecf50261').subscribe((resp) => {
        resolve(resp)
      })
    })
  }

  // Checks whether or not stock exist
  doesStockExist(symbol) {
    return new Promise((resolve) => {
      this.http.get('https://cloud.iexapis.com/stable/stock/' + symbol + '/quote?token=pk_c37812d235954d52b6089fe8ecf50261').subscribe((resp) => {
        if (resp) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }

  constructor(private http: HttpClient) {
  }
}
