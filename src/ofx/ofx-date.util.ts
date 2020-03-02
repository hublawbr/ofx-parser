export class OfxDateUtil {
  public static DateToOfxDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = this.addLeadingZero(date.getUTCMonth());
    const day = this.addLeadingZero(date.getUTCDate());
    return `${year}${month}${day}`;
  }

  public static OfxDateToDate(ofxDate: string): Date {
    if (!ofxDate) {
      return undefined;
    }
    const year = parseInt(ofxDate.substr(0, 4), 10);
    const month = parseInt(ofxDate.substr(4, 2), 10) - 1;
    const day = parseInt(ofxDate.substr(6, 2), 10);

    if (ofxDate.length === 8) {
      return new Date(Date.UTC(year, month, day, 0, 0, 0));
    }

    const hour = parseInt(ofxDate.substr(8, 2), 10);
    const minute = parseInt(ofxDate.substr(10, 2), 10);
    const second = parseInt(ofxDate.substr(12, 2), 10);

    if (ofxDate.length === 14) {
      return new Date(Date.UTC(year, month, day, hour, minute, second));
    }

    let millisecond;
    const indexOfDot = ofxDate.indexOf('.');
    if (indexOfDot > -1) {
      millisecond = parseInt(ofxDate.substr(indexOfDot + 1, 3), 10);
    }

    let timezone;
    const indexOfBracket = ofxDate.indexOf('[');
    const indexOfColon = ofxDate.indexOf(':');
    if (indexOfBracket > -1 && indexOfColon > -1) {
      timezone = ofxDate.substring(indexOfBracket + 1, indexOfColon);
      if (timezone === '0') {
        timezone = 'Z';
      } else if (timezone.length === 1) {
        timezone = `${this.addLeadingZero(timezone)}00`;
      } else if (timezone.length === 2) {
        timezone = `${timezone.charAt(0)}0${timezone.charAt(1)}00`;
      }
    }

    if (millisecond !== undefined && !timezone) {
      return new Date(
        Date.UTC(year, month, day, hour, minute, second, millisecond)
      );
    }

    if (millisecond === undefined && timezone) {
      millisecond = '000';
    }

    if (millisecond !== undefined && timezone) {
      const dateString =
        `${year}-${this.addLeadingZero(month + 1)}-${this.addLeadingZero(
          day
        )}` +
        `T${this.addLeadingZero(hour)}:${this.addLeadingZero(minute)}:` +
        `${this.addLeadingZero(second)}.${this.addLeadingZero(
          millisecond,
          3
        )}${timezone}`;

      const date = new Date(dateString);
      return new Date(
        Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          date.getUTCHours(),
          date.getUTCMinutes(),
          date.getUTCSeconds(),
          date.getUTCMilliseconds()
        )
      );
    }
    throw new Error(`bad date format [${ofxDate}]`);
  }

  private static addLeadingZero(
    number: string | number,
    targetLength: number = 2
  ): string {
    if (typeof number === 'number') {
      number = number.toString();
    }
    while (number.length < targetLength) {
      number = `0${number}`;
    }
    return number;
  }
}
