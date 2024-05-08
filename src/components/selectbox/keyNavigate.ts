import {
  THandleArrowDownUpProps,
  THandleEnterProps,
  THandleTabProps,
  THandleBackspaceProps,
  THandleArrowLeftProps,
} from 'types';

const handleArrowDown = ({
  e,
  options,
  setFocusedIndex,
  scrollList,
}: THandleArrowDownUpProps) => {
  e.preventDefault();
  setFocusedIndex((prev) =>
    prev === null || prev === options.length - 1 ? 0 : prev + 1
  );
  scrollList(true);
};

const handleArrowUp = ({
  e,
  options,
  setFocusedIndex,
  scrollList,
}: THandleArrowDownUpProps) => {
  e.preventDefault();
  setFocusedIndex((prev) =>
    prev === null || prev === 0 ? options.length - 1 : prev - 1
  );
  scrollList(false);
};

const handleEnter = ({ focusedIndex, options, handleSelect }: THandleEnterProps) => {
  if (focusedIndex !== null) {
    handleSelect(options[focusedIndex]);
  }
};

const handleTab = ({ setIsDropdown }: THandleTabProps) => {
  setIsDropdown(false);
};

const handleBackspace = ({
  selected,
  search,
  handleRemoveItem,
}: THandleBackspaceProps) => {
  if (selected.length > 0 && !search) {
    handleRemoveItem(selected[selected.length - 1]);
  }
};

const handleArrowLeft = ({ setFocusedIndex, isInputFocused }: THandleArrowLeftProps) => {
  setFocusedIndex(null);
  const buttons = document.querySelectorAll('.select__remove');
  if (isInputFocused && buttons.length > 0) {
    const lastButton = buttons[buttons.length - 1] as HTMLElement;
    lastButton.focus();
  } else {
    const focusedButtonIndex = Array.from(buttons).findIndex(
      (button) => button === document.activeElement
    );
    const previousButtonIndex =
      focusedButtonIndex === 0 ? buttons.length - 1 : focusedButtonIndex - 1;
    const previousButton = buttons[previousButtonIndex] as HTMLElement;
    previousButton.focus();
  }
};

export {
  handleArrowDown,
  handleArrowUp,
  handleEnter,
  handleTab,
  handleBackspace,
  handleArrowLeft,
};
