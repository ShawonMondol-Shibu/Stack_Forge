export type CommonFilterType = {
    searchPlaceholder:string,
    selectPlaceholder: string,
    selectPlaceholder_2: string,
    sortPlaceholder: string,
    selectItems: SelectItemsType[],
    selectItems2: SelectItemsType[],
    sortitems: SelectItemsType[]
};

export type SelectItemsType = {
    value: string,
    label: string,
}