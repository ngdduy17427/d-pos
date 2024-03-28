import { ITable } from "@type";
import classNames from "classnames";
import moment from "moment";
import { startTransition, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TableCard = ({ table }: { table: ITable }) => {
  const [orderedTime, setOrderedTime] = useState(moment().diff(table.orderedAt));

  const orderedItems = useMemo(() => table.itemsInCart.length, [table]);
  const servedItems = useMemo(
    () => table.itemsInCart.filter((item) => item.isServed).length,
    [table]
  );

  useEffect(() => {
    if (!table.isServing) return;

    const orderedTimer = setInterval(
      () => startTransition(() => setOrderedTime(moment().diff(table.orderedAt))),
      1000
    );

    return () => clearInterval(orderedTimer);
  }, [table]);

  return (
    <Link
      to={`/table/${table.id}`}
      className={classNames(
        "table-card",
        { "no-order": !table.isServing },
        { serving: table.isServing },
        { late: orderedTime >= 180000 },
        { "too-late": orderedTime >= 300000 }
      )}
    >
      <strong className="table-name">{table.name}</strong>
      {table.isServing && <p className="table-serve-time">{moment(orderedTime).format("mm:ss")}</p>}
      {table.isServing ? (
        <strong className="table-serve">
          Served {servedItems}/{orderedItems} items
        </strong>
      ) : (
        <strong className="table-serve">No Order</strong>
      )}
    </Link>
  );
};

export default TableCard;
