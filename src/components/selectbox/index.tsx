import { useState, useEffect, useRef } from 'react';
import { useClickOutside } from 'hooks';
import { TSelectBoxProps, TSelectOptions } from 'types';
import { CaretDown } from 'icons';
import Loading from '../loading';
import SelectedItem from './selectedItem';
import {
  handleArrowDown,
  handleArrowUp,
  handleEnter,
  handleTab,
  handleBackspace,
  handleArrowLeft,
} from './keyNavigate';
import './style.scss';

const Selectbox: React.FC<TSelectBoxProps> = ({
  options,
  loading,
  search,
  setSearch,
  error,
}) => {
  const selecRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<TSelectOptions[]>([]);
  const [isDropDown, setIsDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const resetInput = () => {
    if (searchRef.current) {
      searchRef.current.value = '';
      setSearch('');
    }
  };

  const searchFocused = () => {
    if (searchRef.current) searchRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim();
    setSearch(searchTerm);
  };

  const handleSelect = (item: TSelectOptions) => {
    if (selected.find((s) => s.id === item.id))
      setSelected(selected.filter((s) => s.id !== item.id));
    else setSelected([...selected, item]);

    resetInput();
  };

  const handleRemoveItem = (item: TSelectOptions) => {
    const updatedSelect = selected.filter((s) => s.id !== item.id);
    setSelected([...updatedSelect]);
    searchFocused();
  };

  const toogleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setFocusedIndex(0);
    const target = e.target as HTMLElement;
    if (target.closest('.select__selected')) return;

    setIsDropdown((prev) => !prev);
  };

  const isChecked = (item: TSelectOptions) =>
    selected.find((s) => s.id === item.id) ? true : false;

  const matchText = (name: string) => {
    const parts = name.split(new RegExp(`(${search})`, 'gi'));
    return (
      <>
        {parts.map((part, index) => (
          <span
            key={index}
            className={
              search && part.toLowerCase() === search.toLowerCase() ? 'text-bold' : ''
            }
          >
            {part}
          </span>
        ))}
      </>
    );
  };

  useEffect(() => {
    searchFocused();
  }, [isDropDown]);

  const closeDropdown = () => {
    setIsDropdown(false);
  };
  useClickOutside(selecRef, closeDropdown);

  const scrollList = (down: boolean) => {
    if (!listRef.current) return;
    const itemHeight = listRef.current.scrollHeight / options.length;
    const scrollTop = listRef.current.scrollTop;
    const scrollOffset = down ? itemHeight : -itemHeight;

    if (down) {
      listRef.current.scrollTop = Math.min(
        scrollTop + scrollOffset,
        listRef.current.scrollHeight - listRef.current.clientHeight
      );
    } else {
      listRef.current.scrollTop = Math.max(scrollTop + scrollOffset, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (options && options.length === 0) return;

    const isInputFocused =
      searchRef.current && searchRef.current.contains(document.activeElement);
    if (isInputFocused) setIsDropdown(true);

    if (
      (e.key === 'ArrowDown' && focusedIndex === options.length - 1) ||
      (e.key === 'ArrowUp' && focusedIndex === 0)
    ) {
      if (listRef.current) {
        listRef.current.scrollTop =
          e.key === 'ArrowDown' ? 0 : listRef.current.scrollHeight;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        handleArrowDown({ e, options, setFocusedIndex, scrollList });
        break;
      case 'ArrowUp':
        handleArrowUp({ e, options, setFocusedIndex, scrollList });
        break;
      case 'Enter':
        handleEnter({ focusedIndex, options, handleSelect });
        break;
      case 'Tab':
        handleTab({ setIsDropdown });
        break;
      case 'Backspace':
        handleBackspace({ selected, search, handleRemoveItem });
        break;
      case 'ArrowLeft':
        handleArrowLeft({ setFocusedIndex, isInputFocused });
        break;
      default:
        break;
    }
  };

  return (
    <div ref={selecRef} className="select">
      <div
        className="select__action"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => toogleDropdown(e)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="select__value">
          {selected &&
            selected.map((item, index) => (
              <SelectedItem
                key={index}
                item={item}
                index={index}
                selected={selected}
                handleRemoveItem={handleRemoveItem}
                searchFocused={searchFocused}
              />
            ))}
          <div className="select__input-wrapper">
            <input
              className="select__input"
              type="text"
              id="search"
              name="search"
              ref={searchRef}
              onChange={handleInputChange}
              tabIndex={0}
              autoComplete="false"
              autoCorrect="off"
              autoCapitalize="none"
            />
          </div>
        </div>
        <div className="select__menu-icon">
          <CaretDown />
        </div>
      </div>

      {isDropDown && (
        <div className="select__dropdown">
          <ul ref={listRef} className="select__dropdown-list">
            {loading && <Loading />}
            {!loading && typeof error === 'string' && (
              <div className="select__error-msg">{error}</div>
            )}
            {!loading &&
              options.length > 0 &&
              options.map((item: TSelectOptions, index) => (
                <li
                  key={item.id}
                  className={`select__dropdown-item ${
                    index === focusedIndex ? 'focused' : ''
                  }`}
                  onClick={() => handleSelect(item)}
                >
                  <input
                    type="checkbox"
                    className="select__dropdown-check"
                    checked={isChecked(item)}
                    onChange={() => {}}
                  />
                  <div className="flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="select__dropdown-img"
                    />
                    <div>
                      <p>{matchText(item.name)}</p>
                      <p className="text-gray">
                        {item?.episode ? item.episode.length : 0} Episode
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selectbox;
