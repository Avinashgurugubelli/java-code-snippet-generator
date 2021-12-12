import { camelCase, isEmpty } from "lodash";

export class JavaPojoMapperSkeletonGenerator {

    public static generateFromArray(input: string[]): string | null {
        if (!isEmpty(input)) {
            let output: string = '';
            const propertyMapping: string[] = input.map((key: string) => {
                const camelCaseKey: string = camelCase(key);
                const mapping = `@Mapping(source = "", target = "${camelCaseKey}")`
                return mapping;
            });
            // joining -> , and newLine after every value ending. and adding tab space at every element starting
            const mappingStr: string = propertyMapping.join(',\r\n\t');
            output = `@Mappings({\n\t${mappingStr}\n})`;
            return output;
        }
        return null;
    }

    public static generateFromJson(input: { [key: string]: any }): string | null {
        const keys: string[] = Object.keys(input);
        return this.generateFromArray(keys);
    }
}