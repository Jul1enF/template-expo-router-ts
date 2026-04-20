import { ColorValue, ViewStyle, TextStyle, TextInput } from "react-native";
import { Dispatch, ReactNode, SetStateAction, RefObject } from "react";

// ITEM TYPES

export type EmployeeItemType = {
    employee: EmployeeType;
    title: string;
}

export type EmployeeType = {
    __v: number;
    _id: string;
    contract_end: null | string;
    createdAt: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    schedule: {};
    updatedAt: string;
}


// COMPONENTS PROPS

// SHARED TYPES
type ComponentsSharedProps = {
    sectionToSelectKey?: string;
    titleToSelectKey?: string;
    emptyResultText?: string;
    dropdownMaxHeight?: number;
    dropdownContainerStyle?: ViewStyle;
    dropdownItemStyle?: ViewStyle;
    dropdownTextStyle?: TextStyle;
    dropdownLineColor?: ColorValue;
    boldTitleWeight?: string;
    tabBar?: boolean;
    header?: boolean;
}


// AUTOCOMPLETE
export type AutocompleteProps<AutocompleteItem, SelectedItem> = ComponentsSharedProps & {
    data?: AutocompleteItem[];
    setSelectedItem: Dispatch<SetStateAction<null | SelectedItem>>;
    selectedItem: null | SelectedItem;
    placeholderText?: string;
    placeholderColor?: ColorValue;
    inputStyle?: TextStyle & ViewStyle;
    iconColor?: ColorValue;
    canCreate?: true | "string";
    editable?: boolean;
    showClear?: boolean;
    multiline?: boolean;
    autoCapitalize?: boolean;
}


// PROVIDER / DROPDOWN
export type AutocompleteProviderProps = {
    modalPageWrapper?: boolean;
    children: ReactNode;
}

export type DropdownItem = EmployeeItemType | string // & Other types of item used in the app
export type DropdownSelectedItem = EmployeeType | string

export type DropDownProps = ComponentsSharedProps & {
    flatlistData?: DropdownItem[];
    setSelectedItem: Dispatch<SetStateAction<null | DropdownSelectedItem>>;
    closeDropdown: () => void;
    layoutStyle: ViewStyle;
    autocompleteInputRef: RefObject<TextInput>;
    dropdownId: string;
}

export type ScreenLocationType = {
    pageX: number;
    pageY: number;
}

export type AutocompleteContextType = {
    setDropdownProps: Dispatch<SetStateAction<null | DropDownProps>>;
    currentDropdownId: string | null;
    setCurrentDropdownId: Dispatch<SetStateAction<null | string>>;
};


// HOOK
export type UseDropdownPositionOptions = {
    dropdownHeight: null | number;
    autocompleteInputRef: RefObject<TextInput>; 
    tabBar?: boolean;
    header?: boolean;
    dropdownId: string;
    pressLocation: ScreenLocationType | null;
    closeDropdown: ()=>void;
}

export type InputMeasureType = ScreenLocationType & {
    width: number;
    height: number;
}