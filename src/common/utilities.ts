export default class Utilities {
    public static versionCompare(version: string, operator: string, compareVersion: string) {
        const a1 = version.split(".");
        const b1 = compareVersion.split(".");
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

        if (operator === "<") {
            return test === -1;
        } else if (operator === "<=") {
            return test === -1 || test === 0;
        } else if (operator === "==" || operator === "===") {
            return test === 0;
        } else if (operator === ">") {
            return test === 1;
        } else if (operator === ">=") {
            return test === 1 || test === 0;
        }
        throw new Error(`Unknown operator: ${operator}`);
    }
}
