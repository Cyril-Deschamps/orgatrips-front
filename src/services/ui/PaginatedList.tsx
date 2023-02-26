import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import iconArrowMiniLeft from "../../assets/img/icons/icon-arrow-mini-left.svg";
import iconArrowMiniRight from "../../assets/img/icons/icon-arrow-mini-right.svg";
import iconEndArrowLeft from "../../assets/img/icons/icon-end-arrow-left.svg";
import iconEndArrowRight from "../../assets/img/icons/icon-end-arrow-right.svg";

const PaginatedList = <Item,>({
  items,
  render,
  paginatedBy,
}: {
  items: Item[];
  render: (item: Item) => JSX.Element | null;
  paginatedBy: number;
}): JSX.Element => {
  const [page, setPage] = useState(1);

  // Memos
  const lastPage = useMemo(
    () => Math.ceil(items.length / paginatedBy),
    [items.length, paginatedBy],
  );
  const paginatedList = useMemo(() => {
    return new Map(
      [...Array(lastPage).keys()].map((page) => [
        page + 1,
        items.slice(page * paginatedBy, (page + 1) * paginatedBy),
      ]),
    );
  }, [items, lastPage, paginatedBy]);
  const currentPage = useMemo(
    () => paginatedList.get(page) || [],
    [paginatedList, page],
  );

  const hasPageOffset = useCallback(
    (offset: number) => {
      return offset > 0 ? page + offset <= lastPage : page + offset >= 1;
    },
    [page, lastPage],
  );
  const hasPreviousPage = useMemo(() => hasPageOffset(-1), [hasPageOffset]);
  const hasNextPage = useMemo(() => hasPageOffset(1), [hasPageOffset]);

  // Effects
  // NOTE: When the items change, we reset the page to 1.
  useEffect(() => {
    setPage(1);
  }, [items]);

  // Methods
  const goToOffset = useCallback(
    (offset: number) => setPage((page) => page + offset),
    [],
  );
  const goToNextPage = useCallback(() => goToOffset(1), [goToOffset]);
  const goToPreviousPage = useCallback(() => goToOffset(-1), [goToOffset]);

  return (
    <div className={"offers-list"}>
      <div>{currentPage.map((item) => render(item))}</div>

      {lastPage > 1 && (
        <div className={"pagination"}>
          <button
            className={"btn --icon"}
            disabled={!hasPreviousPage}
            onClick={() => setPage(1)}
            type={"button"}
          >
            <Image alt={""} className={"icon"} src={iconEndArrowLeft} />
          </button>
          <button
            className={"btn --icon"}
            disabled={!hasPreviousPage}
            onClick={() => goToPreviousPage()}
            type={"button"}
          >
            <Image alt={""} className={"icon"} src={iconArrowMiniLeft} />
          </button>

          <div className={"lay-row --gap-h--xs"}>
            {!hasNextPage && hasPageOffset(-2) && (
              <button
                className={"btn"}
                onClick={() => goToOffset(-2)}
                type={"button"}
              >
                {page - 2}
              </button>
            )}
            {hasPreviousPage && (
              <button
                className={"btn"}
                onClick={() => goToPreviousPage()}
                type={"button"}
              >
                {page - 1}
              </button>
            )}
            <button className={"btn active"}>{page}</button>
            {hasNextPage && (
              <button
                className={"btn"}
                onClick={() => goToNextPage()}
                type={"button"}
              >
                {page + 1}
              </button>
            )}
            {!hasPreviousPage && hasPageOffset(2) && (
              <button
                className={"btn"}
                onClick={() => goToOffset(2)}
                type={"button"}
              >
                {page + 2}
              </button>
            )}
          </div>

          <button
            className={"btn --icon"}
            disabled={!hasNextPage}
            onClick={() => goToNextPage()}
            type={"button"}
          >
            <Image
              alt={"next page arrow"}
              className={"icon"}
              src={iconArrowMiniRight}
            />
          </button>
          <button
            className={"btn --icon"}
            disabled={!hasNextPage}
            onClick={() => setPage(lastPage)}
            type={"button"}
          >
            <Image
              alt={"end arrow"}
              className={"icon"}
              src={iconEndArrowRight}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginatedList;
