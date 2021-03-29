import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  { // added OnInit to make a regular Angular component with usual life cycle
  title = 'backend-ui';

  constructor(private translationService: TranslationService) { }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const translations = this.translationService.getTranslationsRequest()
    console.log(translations)
  }
}
