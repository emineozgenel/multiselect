import { TSelectedItemProps, TSelectOptions } from 'types';

const SelectedItem = ({
  item,
  index,
  selected,
  handleRemoveItem,
  searchFocused,
}: TSelectedItemProps) => {
  const handleButtonKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    item: TSelectOptions
  ) => {
    const handleArrowRight = () => {
      const index = selected.findIndex((s: TSelectOptions) => s.id === item.id);
      const nextButton = document.getElementById(`button-${index + 1}`);
      if (nextButton) nextButton.focus();
      if (index === selected.length - 1) searchFocused();
    };

    const handleEnter = () => {
      handleRemoveItem(item);
    };

    switch (e.key) {
      case 'ArrowRight':
        handleArrowRight();
        break;
      case 'Enter':
        handleEnter();
        break;
      default:
        break;
    }
  };

  return (
    <div className="select__selected">
      <p className="select__name">{item.name}</p>
      <button
        id={`button-${index}`}
        tabIndex={0}
        type="button"
        className="select__remove"
        onClick={() => handleRemoveItem(item)}
        onKeyDown={(e) => handleButtonKeyDown(e, item)}
        aria-label={`Remove ${item.name}`}
      >
        X
      </button>
    </div>
  );
};

export default SelectedItem;
