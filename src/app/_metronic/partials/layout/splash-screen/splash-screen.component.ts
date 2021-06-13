import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ParamsConfig } from 'src/app/global/configs/paramsConfig/params-config';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  @ViewChild('splashScreen', { static: true }) splashScreen: ElementRef;
  logoUrl = ParamsConfig.getBrand();

  constructor(
    private el: ElementRef,
    private splashScreenService: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.splashScreenService.init(this.splashScreen);
  }
}
