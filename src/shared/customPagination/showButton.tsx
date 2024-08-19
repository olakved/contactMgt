import { useEffect, useRef, useState } from "react";
import { ICustomPagination } from "./pagination.interface";
import { FaChevronUp } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const pageSizeOptions = [5, 10, 20, 30, 40, 50];

function ShowButton({
  onChangeofPageSize,
  limit,
  paginationArray,
}: Partial<ICustomPagination>) {
  const [selectOption, setSelectOption] = useState({
    pageSize: limit ? limit : pageSizeOptions[1],
    isOpen: false,
  });
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleOpenOption = () => {
    setSelectOption({
      ...selectOption,
      isOpen: !selectOption.isOpen,
    });
  };

  useEffect(() => {
    const handler = (e: { target: EventTarget | null }) => {
      if (divRef.current && !divRef.current.contains(e.target as HTMLElement)) {
        setSelectOption({
          ...selectOption,
          isOpen: false,
        });
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [selectOption]);

  const pageSizeOptionsToUse = paginationArray
    ? paginationArray
    : pageSizeOptions;

  return (
    <div>
      <div
        className="rounded-[8px] cursor-pointer py-[10px] px-[11px] border-[1px] border-gray-100 flex items-center gap-x-[9px] w-[100px]"
        onClick={handleOpenOption}
        ref={divRef}
      >
        <div className="w-[80%]">
          <p className=" font-[500] text-[12px] leading-[19px] text-dark-500 ">
            Show {selectOption.pageSize}
          </p>
        </div>
        <div className="w-[20%]">
          <FaChevronUp className="w-[15px] h-[10px]" />
        </div>
      </div>
      {selectOption.isOpen && (
        <div className="absolute bottom-0 right-0 mb-[50px] border-[1px] px-[10px] pb-[9px] rounded-[8px] z-50 max-h-[120px] translate-y-1 overflow-auto   border-solid border-[#DFE2E2] bg-primary-white text-[#131515] scrollbar-thin scrollbar-none text-[12px]">
          {pageSizeOptionsToUse.map((item) => {
            return (
              <p
                onClick={() => {
                  if (onChangeofPageSize) {
                    onChangeofPageSize(item);
                    setSelectOption({
                      pageSize: item,
                      isOpen: false,
                    });
                  }
                }}
                key={item}
                className="cursor-pointer flex justify-between items-center gap-3 mt-[9px]"
              >
                {item} Pages{" "}
                {selectOption.pageSize === item && (
                  <IoCheckmarkDoneOutline className="text-[15px]" />
                )}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShowButton;
