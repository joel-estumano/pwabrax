export class DateFormatUtil {
    /**
     *
     * @param dateString example "28/01/2023"
     * @returns "2023-01-28T02:00:00.000Z"
     */
    static dateStringToDate(dateString: string): Date {
        const d = dateString.split('/');
        return new Date(d[1] + '/' + d[0] + '/' + d[2]);
    }
}
