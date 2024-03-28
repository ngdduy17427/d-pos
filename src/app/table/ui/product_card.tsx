import { IDrink } from "@type";
import { useRef } from "react";
import { formatCurrency, handleAddProductCartAnimation } from "utils/utils_helper";

const ProductCard = ({
  product,
  handleAddProductToCart,
}: {
  product: IDrink;
  handleAddProductToCart: (product: IDrink) => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClickProduct = () =>
    handleAddProductCartAnimation(product.thumbnail, imgRef).then(() =>
      handleAddProductToCart(product)
    );

  return (
    <div className="product-card" onClick={handleClickProduct}>
      <div className="product-thumb">
        <img ref={imgRef} src={product.thumbnail} alt="Drink Thumbnail" />
      </div>
      <div className="product-info">
        <h1>
          <strong>{product.name}</strong>
        </h1>
        <h2>{formatCurrency(product.price, "en-US", { style: "currency", currency: "USD" })}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
