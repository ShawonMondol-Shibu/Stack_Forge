export type CommonFilterType = {
  searchPlaceholder: string;
  selectPlaceholder?: string;
  selectPlaceholder_2?: string;
  sortPlaceholder?: string;
  selectItems?: SelectItemsType[];
  selectItems2?: SelectItemsType[];
  sortitems?: SelectItemsType[];
  handleSelect?: () => void;
  handleFilter?: (search?: string ) => void;
  isNote?: true | false,
};

export type SelectItemsType = {
  value: string;
  label: string;
};
