import { Component, OnInit, Input } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  @Input() stockName;
  @Input() stockPrice;
  @Input() stockSymbol;

  searchStock() {
    UtilitiesService.redirect('stock/' + this.stockSymbol);
  }

  constructor() {
    console.log(this.stockSymbol)
  }

  ngOnInit() {
  }

}
