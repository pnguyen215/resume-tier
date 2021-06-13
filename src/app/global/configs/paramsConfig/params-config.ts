
export class ParamsConfig {

    static readonly logoImage = 'signal-app-48.png';
    static readonly logoImageSidebar = 'logo-light.png'; // defind logo left aside
    static readonly backgroundSignIn = 'copy.svg'; // deind background sign in
    static readonly dateFormatedGlobal = 'dd/MM/yyyy HH:mm:ss'; // define time in this form global
    static readonly dateFormSendToAPI = 'yyyy-MM-dd hh:mm:ss'; // send time string format to API as this form 

    /* Setup brand global */
    static getBrand() {
        return `./assets/media/logos/${this.logoImage}`;
    }

    static getTitleBrandMobile() {
        return `${this.logoImage}`;
    }

    static getBrandSidebar() {
        return `./assets/media/logos/${this.logoImageSidebar}`;
    }

    static getBackgroundSignIn() {
        // illustrations
        return `./assets/media/svg/illustrations/${this.backgroundSignIn}`;
    }

    static getDateFormattedGlobal() {
        return `${this.dateFormatedGlobal}`;
    }

    static getDateFormSendToAPI() {
        return `${this.dateFormSendToAPI}`;
    }
}

