import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef } from '@angular/core';

import { Chart } from 'chart.js'

import { MaterialDesignColors } from './config/colors';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() backgroundColor: string[] = [];
  @Input() hoverBackgroundColor: string[] = [];
  @Input() hoverBorderWidth: number = null;
  @Input() displayLegend: boolean = true;
  
  @ViewChild('canvas') canvasRef: ElementRef;

  chart: Chart = null;
  
  ngAfterViewInit() {
    if (this.data) {
      const ctx = this.canvasRef.nativeElement.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'doughnut', 
        data: {
          labels: this.labels,
          datasets: [
            { 
              data: this.data,
              backgroundColor: this.backgroundColor.length ? this.backgroundColor : this.data.map(() => this.getRandomColor()),
              hoverBackgroundColor: this.hoverBackgroundColor.length ? this.hoverBackgroundColor : this.data.map(() => this.getRandomColor()),
              hoverBorderWidth: this.hoverBorderWidth ? this.hoverBorderWidth : 5,
            }
          ],
        },
        options: {
          responsive: false,
          legend: {
            display: this.displayLegend,
          },
          animation: {
            animateScale: true,
          }
        }
        
      });
      this.changeDetector.detectChanges();
    }
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  private getRandomColor(): string {
    const color = MaterialDesignColors[Math.floor(Math.random() * (MaterialDesignColors.length))];
    return color;
  }
}
