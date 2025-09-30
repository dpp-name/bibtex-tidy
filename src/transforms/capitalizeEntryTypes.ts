import type {Transform} from "../types.ts";

const entryTypes = [
    "Article",
    "Book",
    "Booklet",
    "Conference",
    "InBook",
    "InCollection",
    "InProceedings",
    "Manual",
    "MastersThesis",
    "Misc",
    "PhDThesis",
    "Proceedings",
    "TechReport",
    "Unpublished",
];

const entryTypesMap: { [key: string]: string } = {};
for (const entryType of entryTypes) {
    entryTypesMap[entryType.toLocaleLowerCase()] = entryType;
}

function capitalize(type: string) {
    if (!type) {
        return type;
    }
    return entryTypesMap[type.toLocaleLowerCase()] ?? type[0]?.toLocaleUpperCase() + type.substring(1).toLocaleLowerCase();
}

export function createCapitalizeEntryTypesTransform(): Transform {
    return {
        name: "capitalize-entry-type",
        apply: (ast) => {
            for (const entry of ast.entries()) {
                entry.parent.command = capitalize(entry.parent.command);
            }
            return undefined;
        },
    };
}
