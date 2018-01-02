export default class Utilities {
    public static alphaNumericString: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    public static randomAlphaNumericString(length: number): string {
        let value = '';
        for (let i = 0; i < length; i++) {
            value = value + Utilities.randomAlphaNumericChar();
        }
        return value;
    }
    public static randomAlphaNumericChar(): string {
        const randomNumber = Utilities.randomNumber(0, Utilities.alphaNumericString.length - 1);
        const char = Utilities.alphaNumericString[Utilities.randomNumber(0, randomNumber)];
        return char;
    }

    public static randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public static globalJQueryExists(): boolean {
        return typeof (jQuery) !== 'undefined';
    }

    public static versionCompare(version: string, operator: string, compareVersion: string) {
        const a1 = version.split('.');
        const b1 = compareVersion.split('.');
        let tempA, tempB, test = 0;

        for (let i = 0; i < a1.length; i++) {
            tempA = parseInt(a1[i], 10) || 0;
            tempB = parseInt(b1[i], 10) || 0;

            if (tempA > tempB) {
                test = 1;
                break;
            } else if (tempA < tempB) {
                test = -1;
                break;
            }
        }

        if (operator === '<') {
            return test === -1;
        } else if (operator === '<=') {
            return test === -1 || test === 0;
        } else if (operator === '==' || operator === '===') {
            return test === 0;
        } else if (operator === '>') {
            return test === 1;
        } else if (operator === '>=') {
            return test === 1 || test === 0;
        }
        throw new Error(`Unknown operator: ${operator}`);
    }
}
