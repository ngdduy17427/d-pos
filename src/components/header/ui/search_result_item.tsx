import { IDrink } from "@type";
import { useRef } from "react";
import { formatCurrency, handleAddProductCartAnimation } from "utils/utils_helper";

const SearchResultItem = ({
  result,
  handleAddProductToCart,
}: {
  result: IDrink;
  handleAddProductToCart?: (product: IDrink) => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClickProduct = () =>
    handleAddProductCartAnimation(result.thumbnail, imgRef).then(() =>
      handleAddProductToCart?.(result)
    );

  return (
    <div key={result.id} className="search-item" onClick={handleClickProduct}>
      <div className="thumb">
        <img ref={imgRef} src={result.thumbnail} alt={result.name} />
      </div>
      <h1 className="title">
        <strong>{result.name}</strong>
      </h1>
      <p className="amount">
        {formatCurrency(result.price, "en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
    </div>
  );
};

export default SearchResultItem;
