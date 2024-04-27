import TableCard from "app/homepage/ui/table_card";
import Header from "components/header";
import { useAppContext } from "context/context";
import "./css.scss";

const Homepage = (): JSX.Element => {
  const {
    appContext: { tableList },
  } = useAppContext();

  return (
    <section className="homepage">
      <Header />
      <div className="table-container">
        {tableList?.map((table): JSX.Element => <TableCard key={table.id} table={table} />)}
      </div>
    </section>
  );
};

export default Homepage;
