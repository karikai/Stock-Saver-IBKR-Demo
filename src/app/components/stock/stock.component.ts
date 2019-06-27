import { Component, OnInit } from '@angular/core';
import { StockFetcherService } from 'src/app/services/stock-fetcher.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  isLoaded = false;
  stock;

  setChart() {
    
  }

  constructor(private stockFetch: StockFetcherService, private activatedRoute: ActivatedRoute) {
    const stockSymbol = this.activatedRoute.snapshot.paramMap.get("symbol");
    this.stockFetch.getStock(stockSymbol).then((stock) => {
      console.log(stock)
      this.stock = stock;
      this.isLoaded = true;
    })
  }

  ngOnInit() {
  }

}
