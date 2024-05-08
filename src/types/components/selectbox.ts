export type TSelectOptions = {
  id: number;
  name: string;
  image: string;
  episode: string[];
};

export type TSelectedItemProps = {
  item: TSelectOptions;
  index: number;
  selected: TSelectOptions[];
  handleRemoveItem: (item: TSelectOptions) => void;
  searchFocused: () => void;
};

export type TSelectBoxProps = {
  options: TSelectOptions[];
  loading: boolean;
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  error: object | string;
};

export type THandleArrowDownUpProps = {
  e: React.KeyboardEvent;
  options: TSelectOptions[];
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  scrollList: (down: boolean) => void;
};

export type THandleEnterProps = {
  focusedIndex: number | null;
  options: TSelectOptions[];
  handleSelect: (item: TSelectOptions) => void;
};

export type THandleTabProps = {
  setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export type THandleBackspaceProps = {
  selected: TSelectOptions[];
  search: string | null;
  handleRemoveItem: (item: TSelectOptions) => void;
};

export type THandleArrowLeftProps = {
  isInputFocused: boolean | null;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>;
};
