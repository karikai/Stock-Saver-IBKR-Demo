import { Component, OnInit } from '@angular/core';
import { StockFetcherService } from 'src/app/services/stock-fetcher.service';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  isLoaded = false;
  isStockValid;
  stock;
  stockSymbol;
  graphData = [];

  redirectToDashboard() {
    UtilitiesService.redirect('dashboard');
  }

  updateChart(range) {
    this.getChartData(range).then(() => {
      this.chartInitialize();
    });
  }

  getChartCoordinates() {
    const labels = [];
    this.graphData.forEach(price => {
      const coordinate = {
        x: price.x,
        y: price.price
      }
      labels.push(coordinate);
    })
    return labels;
  }

  getChartLabel() {
    const labels = [];
    this.graphData.forEach(price => {
      labels.push(price.label);
    })
    return labels;
  }

  getChartData(range) {
    this.graphData = [];
    return new Promise(resolve => {
      this.stockFetch.getHistoricalPrices(this.stockSymbol, range).then((prices) => {
        let count = 1;
        //@ts-ignore
        prices.forEach(price => {
          const dataObject = {
            price: price.close,
            label: price.label,
            x: count
          }
          count ++;
          this.graphData.push(dataObject);
        });
        resolve(this.graphData);
      })
    })
  }
  
  chartInitialize() {
    const myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.getChartLabel(),
        datasets: [{
          label: this.stock.companyName,
          data: this.getChartCoordinates(),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }   
            }]
        }
    }
    });
  }

  constructor(private stockFetch: StockFetcherService, private activatedRoute: ActivatedRoute) {
    this.stockSymbol = this.activatedRoute.snapshot.paramMap.get("symbol");
    this.stockFetch.getStock(this.stockSymbol).then((stock) => {
      this.stock = stock;
      if (stock) {
        this.isStockValid = true;
        this.getChartData('5d').then(() => {
          this.chartInitialize();
        });
      } else {
        this.isStockValid = false;
        document.getElementsByTagName('html')[0].style.height = '0%';
      }
      this.isLoaded = true;
    })
  }
  
  ngOnInit() {
  }

}
