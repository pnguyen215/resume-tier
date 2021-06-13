import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { ParamsConfig } from 'src/app/global/configs/paramsConfig/params-config';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent implements OnInit, AfterViewInit {
  headerLogo = '';
  asideSelfDisplay = true;
  headerMenuSelfDisplay = true;
  headerMobileClasses = '';
  headerMobileAttributes = {};
  constructor(private layout: LayoutService) { }

  ngOnInit(): void {
    // build view by layout config settings
    this.headerMobileClasses = this.layout.getStringCSSClasses('header_mobile');
    this.headerMobileAttributes = this.layout.getHTMLAttributes(
      'header_mobile'
    );

    this.headerLogo = this.getLogoUrl();
    this.asideSelfDisplay = this.layout.getProp('aside.self.display');
    this.headerMenuSelfDisplay = this.layout.getProp(
      'header.menu.self.display'
    );
  }

  ngAfterViewInit() {
    // Init Header Topbar For Mobile Mode
    KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
  }

  private getLogoUrl() {
    /*
    const headerSelfTheme = this.layout.getProp('header.self.theme') || '';
    const brandSelfTheme = this.layout.getProp('brand.self.theme') || '';
    let result = 'your-logo.png';
    if (!this.asideSelfDisplay) {
      if (headerSelfTheme === 'light') {
        result = 'your-logo.png';
      }
    } else {
      if (brandSelfTheme === 'light') {
        result = 'your-logo.png';
      }
    }
    */
    return ParamsConfig.getBrandSidebar();
  }
}
