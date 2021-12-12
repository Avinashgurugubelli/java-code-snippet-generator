import { camelCase, isEmpty } from "lodash";

export class JavaPojoGenerator {

    public static generateFromArray(input: string[]): string | null {
        if (!isEmpty(input)) {
            let output: string = '';
            input.forEach((key: string) => {
                const camelCaseKey: string = camelCase(key);
                const jsonPropertyAnnotation: string = `@JsonProperty(${key})`;
                const fieldName: string = `public String ${camelCaseKey};`;
                output += jsonPropertyAnnotation + '\n';
                output += fieldName + '\n';

            });
            return output;
        }
        return null;
    }

    public static generateFromJson(input: { [key: string]: any }): string |  null {
        const keys: string[] = Object.keys(input);
        return this.generateFromArray(keys);
    }
}