import { ColorValue, ViewStyle, TextStyle, TextInput, TextInputProps, StyleProp } from "react-native";
import { Dispatch, ReactNode, SetStateAction, RefObject } from "react";

// ITEM TYPES

export type AutocompleteItem = string | {
    title?: string;
    boldTitle?: string;
    lightTitle?: string;
    [key: string]: unknown;
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
    boldTitleWeight?: TextStyle["fontWeight"];
    tabBar?: boolean;
    header?: boolean;
}


// AUTOCOMPLETE
export type AutocompleteProps = ComponentsSharedProps & {
    data?: AutocompleteItem[];
    setSelectedItem: Dispatch<SetStateAction<unknown>>;
    selectedItem: unknown;
    placeholderText?: string;
    placeholderColor?: ColorValue;
    inputStyle?: StyleProp<TextStyle & ViewStyle>;
    iconColor?: ColorValue;
    canCreate?: true | "string";
    editable?: boolean;
    showClear?: boolean;
    multiline?: boolean;
    autoCapitalize?: TextInputProps["autoCapitalize"];
}


// PROVIDER / DROPDOWN
export type AutocompleteProviderProps = {
    modalPageWrapper?: boolean;
    children: ReactNode;
}


export type DropDownProps = ComponentsSharedProps & {
    flatlistData?: AutocompleteItem[];
    setSelectedItem: Dispatch<SetStateAction<unknown>>;
    closeDropdown: () => void;
    layoutStyle: ViewStyle;
    autocompleteInputRef: RefObject<TextInput | null>;
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


// HOOK / UTILS
export type UseDropdownPositionOptions = {
    dropdownHeight: null | number;
    autocompleteInputRef: RefObject<TextInput | null>; 
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

export type FindSelectItemTitleOptions = {
    data: AutocompleteItem[];
    sectionToSelectKey?: string;
    titleToSelectKey?: string;
    selectedItem: unknown;
}