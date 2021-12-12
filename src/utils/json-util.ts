import { camelCase } from "lodash";

export class JSONUtil {

    public static getJsonKeys(input: { [key: string]: any }): string[] {
        const keys: string[] = Object.keys(input);
        return keys;
    }

    public static getJsonKeysInCamelCase(input: { [key: string]: any }): string[] {
        const keys: string[] = Object.keys(input);
        const camelCaseKeys: string[] = keys.map((key: string) => camelCase(key));
        return camelCaseKeys;
    }
}