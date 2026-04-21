import { hasId, itemHasKey, itemHasStringValue } from "@utils/typeGuards"
import { FindSelectItemTitleOptions } from "./Autocomplete.types"


const isPrimitive = (v : unknown) : v is null | string | number | boolean =>
    v === null ||
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"

const isDate = (v : unknown) : v is Date =>
    v instanceof Date ||
    (typeof v === "string" && !Number.isNaN(Date.parse(v)))



const sameArrays = (a :unknown, b : unknown) : boolean => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false
    if (a.length !== b.length) return false

    return a.every((value, index) => {
        const other = b[index]

        if (isPrimitive(value)) return value === other
        if (isDate(value))
            return isDate(other) && new Date(value).getTime() === new Date(other).getTime()

        if (Array.isArray(value)) return sameArrays(value, other)

        if (typeof value === "object") return sameObjects(value, other)

        return false
    })
}


const sameObjects = (a : unknown, b : unknown) => {
    if (a === b) return true
    if (!a || !b) return false
    if (typeof a !== "object" || typeof b !== "object") return false
    if (Array.isArray(a) || Array.isArray(b)) return false

    // Mongo priority
    if (hasId(a) && hasId(b)) return a._id === b._id

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false

    return keysA.every((key) => {
        const recordA = a as Record<string, unknown>
        const recordB = b as Record<string, unknown>
        const valA = recordA[key]
        const valB = recordB[key]

        if (isPrimitive(valA)) return valA === valB
        if (isDate(valA))
            return isDate(valB) && new Date(valA).getTime() === new Date(valB).getTime()

        if (Array.isArray(valA)) return sameArrays(valA, valB)

        if (typeof valA === "object") return typeof valB === "object"

        return false
    })
}


export const findSelectedItemTitle = ({ data, sectionToSelectKey, titleToSelectKey, selectedItem } : FindSelectItemTitleOptions) : string => {

    let title = ""
    const titleKey = titleToSelectKey ?? "title"

    for (let item of data) {
        const selectedSection = sectionToSelectKey && itemHasKey(item, sectionToSelectKey) ? item[sectionToSelectKey] : null

        // If there is no section to select in the data array of object
        if (!sectionToSelectKey) {
            //selectedItem is an object, check if a title field match the item title field
            if (itemHasStringValue(item, titleKey) && itemHasStringValue(selectedItem, titleKey) && item[titleKey] === selectedItem[titleKey]) {
                title = item[titleKey]
                break;
            }
        }

        // There was a section of the items that was selected : trying to find the one matching selectedItem
        else if (typeof selectedSection === "string" && itemHasStringValue(item, titleKey) && selectedSection === selectedItem) {
            title = item[titleKey]
            break;
        }
        else if (hasId(selectedSection) && hasId(selectedItem) && itemHasStringValue(item, titleKey) && selectedSection._id === selectedItem._id) {
            title = item[titleKey]
            break;
        }
        else if (Array.isArray(selectedSection) && itemHasStringValue(item, titleKey) && sameArrays(selectedItem, selectedSection)) {
            title = item[titleKey]
            break;
        }
        else if (itemHasStringValue(item, titleKey) && typeof selectedSection === "object" && sameObjects(selectedItem, selectedSection)) {
            title = item[titleKey]
            break;
        }
    }
    return title
}


export const createId = (length : number) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')
    let id = ""
    for (let i = 0; i < length; i++) {
        id += chars[Math.floor(Math.random() * chars.length)]
    }
    return id
}