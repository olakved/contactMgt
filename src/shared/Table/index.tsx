import { useNavigate } from "react-router-dom";
import { ITableBody, ITableProp } from "./table.interface";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { capitalize, getClass } from "../../utils/constants";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import CustomPagination from "../../shared/customPagination";
import { HiOutlineDotsVertical } from "react-icons/hi";

const CustomTable = <TData extends ITableBody>({
  tableHeads,
  dataTableSource,
  pathTo,
  showMenu,
  showPagination,
  clickRow,
  showDivider,
  rowDetailCollector,
  current_page,
  setCurrentPage,
  page_size,
  total,
  menuOptions,
  onMenuClick,
  loading,
  tableEmptyState,
  tableLoader,
  setLimit,
  children,
  onRowClick,
  containerClassName,
  paginationArray,
}: ITableProp<TData>) => {
  const navigate = useNavigate();
  const dataLength = total as number;

  const itemsPerPage = page_size as number; // Number of items to display per page

  // Calculate the indexes for the current page
  const startIndex = ((current_page as number) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handleSetLimit = (value: number) => {
    // setLimit && setLimit(value);
    if (setLimit) {
      setLimit(value);
    }
  };

  const handleNavigationToDetailpage = (indexValue: number) => {
    const id = dataTableSource![indexValue]?.id;
    if (pathTo !== "") {
      navigate(`${pathTo}/${id}`);
    } else {
      if (rowDetailCollector) {
        rowDetailCollector(dataTableSource![indexValue] as TData);
      }
    }
  };

  const dataTableSourceLength = dataTableSource?.length as number;
  const borderValue = showDivider ? "1px" : "0px";

  return (
    <div
      className={`w-full bg-primary-white rounded-lg mt-[30px] p-[24px] ${containerClassName}`}
    >
      {children}
      <div
        id="tableContainer"
        // className={`w-full overflow-y-auto`}
        className={`w-full h-auto overflow-y-auto flex flex-col mt-[15px]`}
      >
        {loading ? (
          tableLoader
        ) : !loading && dataTableSourceLength > 0 ? (
          <div className="relative">
            <TableContainer className="z-0">
              <Table size="sm">
                <Thead className="w-full bg-primary-light-2 sticky top-0 z-0">
                  <Tr>
                    {tableHeads?.map((heads, index) => {
                      return (
                        <Th
                          sx={{
                            cursor: "pointer",
                          }}
                          key={index}
                          className={`text-left px-[10px] py-[80px] font-[500] bg-white capitalize text-sm text-[#64748B] border-b-[${borderValue}]`}
                        >
                          {heads.label}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>

                <Tbody className={showDivider ? "divide-y" : ""}>
                  {dataTableSource?.map((rowData, indexKey) => {
                    return (
                      <Tr
                        className={`w-full bg-white cursor-pointer capitalize`}
                        key={indexKey}
                        onClick={() => onRowClick && onRowClick(rowData)}
                      >
                        {tableHeads?.map(({ accessor, render }, i) => {
                          const dataToShow =
                            (render
                              ? render(rowData)
                              : rowData[accessor as string]) || "--";
                          return (
                            <Td
                              py="4"
                              fontSize="sm"
                              key={i}
                              className={`first:capitalize ${
                                !clickRow && "cursor-pointer"
                              }`}
                              // onClick={() => {
                              //   clickRow &&
                              //     handleNavigationToDetailpage(indexKey);
                              // }}
                              onClick={() => {
                                if (clickRow) {
                                  handleNavigationToDetailpage(indexKey);
                                }
                              }}
                            >
                              <span className={getClass(dataToShow)}>
                                {dataToShow}
                              </span>
                            </Td>
                          );
                        })}

                        {showMenu && (
                          <Td className="px-[10px] py-[13px] relative  z-50s">
                            <span className="z-50 flex justify-center bg-red-90p -ml-5">
                              <Menu
                                menuButton={
                                  <MenuButton>
                                    <HiOutlineDotsVertical className="w-[30px]" />
                                    {/* + */}
                                  </MenuButton>
                                }
                                transition={true}
                              >
                                {dataTableSource![indexKey]?.action_text && (
                                  <MenuItem
                                    onClick={() => {
                                      if (onMenuClick) {
                                        onMenuClick(dataTableSource![indexKey]);
                                      }
                                    }}
                                    // className={menuItemText(
                                    //   dataTableSource![indexKey]?.action_text,
                                    // )}
                                  >
                                    {capitalize(
                                      dataTableSource![indexKey]?.action_text
                                    )}
                                  </MenuItem>
                                )}
                                {menuOptions?.map((menuItem, i) => {
                                  return (
                                    <MenuItem
                                      key={i}
                                      onClick={() =>
                                        menuItem?.action(
                                          dataTableSource![indexKey]
                                        )
                                      }
                                      // className={menuItemText(menuItem?.menuTitle)}
                                      className={`px-[20px] z-50 py-[8px] bg-primary-light-2 cursor-pointer`}
                                    >
                                      {menuItem?.menuTitle}
                                    </MenuItem>
                                  );
                                })}
                                {dataTableSource![indexKey]
                                  ?.action_text_sec && (
                                  <MenuItem
                                    onClick={() => {
                                      if (onMenuClick) {
                                        onMenuClick(dataTableSource![indexKey]);
                                      }
                                    }}
                                    // className={menuItemText(
                                    //   dataTableSource![indexKey]?.action_text_sec,
                                    // )}
                                  >
                                    {capitalize(
                                      dataTableSource![indexKey]
                                        ?.action_text_sec
                                    )}
                                  </MenuItem>
                                )}
                              </Menu>
                            </span>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          tableEmptyState
        )}
      </div>
      {/* pagination */}
      {loading && showPagination
        ? null
        : dataTableSourceLength === 0
        ? null
        : showPagination &&
          dataLength > 0 && (
            <div
              className="flex items-center justify-center mt-5"
              id="tablePagination"
            >
              <CustomPagination
                endIndex={endIndex}
                startIndex={startIndex}
                currentPage={current_page as number}
                onChangeOfPage={handlePageChange}
                lengthOfData={dataLength}
                onChangeofPageSize={handleSetLimit}
                limit={page_size as number}
                paginationArray={paginationArray}
              />
            </div>
          )}
    </div>
  );
};
export default CustomTable;
