import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import KTLayoutFooter from '../../../../../assets/js/layout/base/footer';
import { QuotesConfig } from 'src/app/global/configs/quotesConfig/quotes-config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, AfterViewInit {
  footerContainerCSSClasses: string;
  currentYear: string;
  shortNameOrganization = QuotesConfig.getShortNameOrganization();

  constructor(private layout: LayoutService) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear().toString();
  }

  ngOnInit(): void {
    this.footerContainerCSSClasses = this.layout.getStringCSSClasses(
      'footer_container'
    );
  }

  ngAfterViewInit() {
    // Init Footer
    KTLayoutFooter.init('kt_footer');
  }
}
