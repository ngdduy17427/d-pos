import { IDrink } from "@type";
import vodkaPNG from "assets/vodka.png";
import { uuidv4 } from "utils/utils_helper";
import categoryList from "./category_list";

const createDrinkList = () => {
  const drinks: IDrink[] = [];

  for (let i = 0; i < categoryList.length; i++)
    for (let j = 0; j < 12; j++)
      drinks.push({
        id: uuidv4(),
        name: `${categoryList[i].name} ${j + 1}`,
        thumbnail: vodkaPNG,
        price: Math.floor(Math.random() * (12 - 4 + 1) + 4),
        categoryId: categoryList[i].id,
      });

  return drinks;
};
const drinkList: IDrink[] = [...createDrinkList()];
export default drinkList;
