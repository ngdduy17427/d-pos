import { ITable } from "@type";
import { uuidv4 } from "utils/utils_helper";

const createTables = (numberOfTable: number) => {
  const tables: ITable[] = [];
  for (let i = 0; i < numberOfTable; i++)
    tables.push({
      id: uuidv4(),
      name: `Table ${i + 1}`,
      itemsInCart: [],
      orderedAt: undefined,
      isServing: false,
    });
  return tables;
};
const tableList: ITable[] = [...createTables(12)];
export default tableList;
