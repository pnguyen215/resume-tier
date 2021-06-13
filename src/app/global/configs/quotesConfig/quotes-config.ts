
export class QuotesConfig {

    static readonly SIGN_IN_SAY = '';
    static readonly SIGN_IN_BACKGROUND_SAY = `sivaos-resume.com </br> Tool support to build resume`;
    static readonly SHORT_NAME_ORGANIZATION = 'SivaOs.Org';

    static getQuotesSignIn() {
        return `${this.SIGN_IN_SAY}`;
    }

    static getQuotesBackground() {
        return `${this.SIGN_IN_BACKGROUND_SAY}`;
    }

    static getShortNameOrganization() {
        return `${this.SHORT_NAME_ORGANIZATION}`;
    }
}
