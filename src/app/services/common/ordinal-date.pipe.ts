import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'ordinalDate'
})
export class OrdinalDatePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(start: string | Date, end: string | Date): SafeHtml {
        if (!start || !end) return '';
        const formattedStartDate = this.formatDate(start);
        const formattedEndDate = this.formatDate(end);
        // Check if start date is equal to end date
        if (formattedStartDate === formattedEndDate) {
            return this.sanitizer.bypassSecurityTrustHtml(formattedStartDate);
        } else {
            const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
            return this.sanitizer.bypassSecurityTrustHtml(formattedDateRange);
        }
    }

    private formatDate(value: string | Date): string {
        const date = new Date(value);
        const day = date.getDate();
        const month = this.getMonthName(date.getMonth());
        const year = date.getFullYear();
        const formattedDay = this.formatDay(day);
        const ordinalSuffix = this.getOrdinalSuffix(day);
        return `${this.getDayOfWeek(date.getDay())} ${formattedDay}<sup>${ordinalSuffix}</sup> ${month} ${year}`;
    }

    private getDayOfWeek(dayOfWeek: number): string {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[dayOfWeek];
    }

    private getMonthName(monthIndex: number): string {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthIndex];
    }

    private formatDay(day: number): string {
        return day.toString();
    }

    private getOrdinalSuffix(day: number): string {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }
}