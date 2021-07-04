
export class TimeUtil {

    static handleTimeDurations(date: string): any {
        let delta = Math.abs(new Date().getTime() - new Date(date).getTime()) / 1000;
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        const minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        const seconds = delta % 60;

        if (days > 0) {
            return this.handleTimesDuration(new Date(date), new Date());
        }

        if (hours > 0) {
            return this.handleTimeForm(hours, 'hour');
        }

        if (minutes > 0) {
            return this.handleTimeForm(minutes, 'minute');
        }

        return this.handleTimeForm(Math.round(seconds), 'second');
    }

    private static handleTimeForm(value: number, type: string): string {
        const suffix = ' ago';
        if (value === undefined || value === null) {
            return '';
        }

        if (value === 0) {
            return 'just now';
        }

        if (value === 1) {
            return value + ' '.concat(type) + suffix;
        }

        if (value > 1) {
            return value + ' '.concat(type) + 's' + suffix;
        }
    }

    static handleTimesDuration(date1, date2): string {
        const suffix = ' ago';
        const date2UTC = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()));
        const date1UTC = new Date(Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate()));

        // tslint:disable-next-line: one-variable-per-declaration
        let yAppendix = '', mAppendix = '', dAppendix = '';

        let days = date2UTC.getDate() - date1UTC.getDate();
        if (days < 0) {

            date2UTC.setMonth(date2UTC.getMonth() - 1);
            days += this.handleDaysInMonth(date2UTC);
        }

        let months = date2UTC.getMonth() - date1UTC.getMonth();
        if (months < 0) {
            date2UTC.setFullYear(date2UTC.getFullYear() - 1);
            months += 12;
        }

        const years = date2UTC.getFullYear() - date1UTC.getFullYear();

        if (years > 1) { yAppendix = ' years'; }
        else { yAppendix = ' year'; }
        if (months > 1) { mAppendix = ' months'; }
        else { mAppendix = ' month'; }
        if (days > 1) { dAppendix = ' days'; }
        else { dAppendix = ' day'; }

        if (years) {
            return years + yAppendix + suffix;
        }

        if (months) {
            return months + mAppendix + suffix;
        }

        if (days) {
            return days + dAppendix + suffix;
        }

    }

    private static handleDaysInMonth(date2UTC) {
        const monthStart = new Date(date2UTC.getFullYear(), date2UTC.getMonth(), 1);
        const monthEnd = new Date(date2UTC.getFullYear(), date2UTC.getMonth() + 1, 1);
        const monthLength = (monthEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24);
        return monthLength;
    }

}
