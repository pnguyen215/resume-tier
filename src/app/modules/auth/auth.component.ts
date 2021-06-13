import { Component, OnInit } from '@angular/core';
import { ParamsConfig } from 'src/app/global/configs/paramsConfig/params-config';
import { QuotesConfig } from 'src/app/global/configs/quotesConfig/quotes-config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  today: Date = new Date();
  logoUrl = ParamsConfig.getBrand();
  backgroundUrl = `background-image: url('` + ParamsConfig.getBackgroundSignIn() + `')`;
  qoutes = `${QuotesConfig.getQuotesBackground()}`;

  constructor() { }

  ngOnInit(): void {
  }

}
