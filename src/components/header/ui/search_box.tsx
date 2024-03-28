import { IDrink } from "@type";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import drinkList from "mock_data/drink_list";
import { ChangeEvent, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { addClassToElement, removeClassFromElement } from "utils/utils_helper";
import SearchResultItem from "./search_result_item";

const SearchBox = ({
  handleAddProductToCart,
}: {
  handleAddProductToCart?: (product: IDrink) => void;
}) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState<IDrink[]>([]);
  const timeoutId = useRef<any>();

  const { ref: searchBoxRef } = useOnClickOutside(() =>
    addClassToElement("searchBoxContainer", "hide-search-result")
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchKey(value);

    if (value === "") return setSearchResult([]);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      if (value === "") return setSearchResult([]);
      const _searchResult: IDrink[] = [];

      drinkList.forEach((drink) => {
        if (drink.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
          _searchResult.push(drink);
      });

      setSearchResult(_searchResult);
    }, 1000);
  };

  return (
    <div
      ref={searchBoxRef}
      id="searchBoxContainer"
      className="search-box-container"
      onClick={() => removeClassFromElement("searchBoxContainer", "hide-search-result")}
    >
      <label className="search-box">
        <MdSearch />
        <input
          id="searchInput"
          type="search"
          placeholder="Search Item"
          value={searchKey}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      {searchResult.length > 0 && (
        <div className="search-result">
          {searchResult?.map((result) => (
            <SearchResultItem
              key={result.id}
              result={result}
              handleAddProductToCart={handleAddProductToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
