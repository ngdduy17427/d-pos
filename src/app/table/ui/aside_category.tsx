import { useAppContext } from "context/context";
import AsideCategoryCard from "./aside_category_card";

const AsideCategory = ({
  categorySelected,
  setCategorySelected,
}: {
  categorySelected: string;
  setCategorySelected: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const {
    appContext: { categoryList },
  } = useAppContext();

  const handleSelectCategory = (categoryId: string): void => {
    setCategorySelected(categoryId);
    document.getElementById("productContainer")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="aside-category">
      {categoryList?.map(
        (category): JSX.Element => (
          <AsideCategoryCard
            key={category.id}
            category={category}
            onClick={(): void => handleSelectCategory(category.id)}
            isSelected={categorySelected === category.id}
          />
        )
      )}
    </aside>
  );
};

export default AsideCategory;
