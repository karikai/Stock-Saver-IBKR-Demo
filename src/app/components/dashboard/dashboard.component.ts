import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { StockListService } from 'src/app/services/stock-list.service';
import { StockFetcherService } from 'src/app/services/stock-fetcher.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  symbolName;
  symbolList = [];
  isLoaded = false;
  isSignedIn;
  user;
  invalidStock;

  addStock() {
    this.invalidStock = false;
    this.stockFetcher.doesStockExist(this.symbolName).then((result) => {
      console.log(result);
      if (result) {
        this.stockService.addStock(this.symbolName, this.user.id).then(() => {
          this.getStocks();
        });
      } else {
        this.invalidStock = true;
      }
    })
  }

  searchStock(symbol) {
    UtilitiesService.redirect('stock/' + symbol);
  }

  getStocks() {
    this.symbolList = [];
    this.userAuth.getLoggedInUser().then((userData) => {
      if (userData) {
        //@ts-ignore
        this.stockService.getUser(userData.uid).then((userObject) => {
          this.user = userObject;
          this.user.symbols.forEach(element => {
            this.stockFetcher.getStock(element).then((stock) => {
              console.log(element)
              const stockObject = {
                //@ts-ignore
                stockName: stock.companyName + " (" + element.toLocaleUpperCase() + ")",
                //@ts-ignore
                stockPrice: stock.latestPrice,
                stockSymbol: element
              }
              this.symbolList.push(stockObject)
            })
          });
          this.isLoaded = true;
        })
      }
    })
  }

  signOut() {
    this.userAuth.signOut();
    UtilitiesService.redirect('');
  }
  
  constructor(private userAuth: UserAuthService, private stockService: StockListService, private stockFetcher: StockFetcherService) {
    this.getStocks();
  }

  ngOnInit() {
  }

}
