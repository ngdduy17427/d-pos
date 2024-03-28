import { ICategory } from "@type";
import classNames from "classnames";
import { memo } from "react";

interface AsideCategoryCardProps {
  category: ICategory;
  onClick: () => void;
  isSelected: boolean;
}

const AsideCategoryCard = ({ category, onClick, isSelected }: AsideCategoryCardProps) => {
  return (
    <button
      type="button"
      className={classNames("aside-category-card", {
        selected: isSelected,
      })}
      onClick={onClick}
    >
      <img src={category.thumbnail} alt="Category Thumbnail" className="h-[60px] object-contain" />
      <strong>{category.name}</strong>
    </button>
  );
};

export default memo(
  AsideCategoryCard,
  (oldProps: AsideCategoryCardProps, newProps: AsideCategoryCardProps) => {
    return oldProps.isSelected === newProps.isSelected;
  }
);
