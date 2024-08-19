import { useEffect, useState } from "react";
import CustomTable from "../../../../shared/Table";
import { ITableHead } from "../../../../shared/Table/table.interface";
import EmptyBar from "../../../../shared/Table/tableEmpty";
import TableLoading from "../../../../shared/Table/tableLoading";
import {
  IContactData,
  IFilterMessageQuery,
} from "../../../../types/contact.type";
import { formatDate } from "../../../../utils/constants";
import StatusBadge, { IStatusType } from "../../../../utils/StatusBadge";
import AppHeader from "../../layout/appHeader";
import { useNavigate } from "react-router-dom";
import {
  UseGetAllMessages,
  useUpdateMessageStatus,
  useUpdateMessageViewsCount,
} from "../../../../services/contact.service";
import { useModalContext } from "../../../../contexts/modalContext";
import ContactFilter from "./contactFilter";
import { IoFilterOutline } from "react-icons/io5";
import PageContainer from "../../../../layout/PageContainer";

function ContactList() {
  const navigate = useNavigate();
  const { modalState, handleModalOpen, handleModalClose } = useModalContext();

  const [queryParams, setQueryParams] = useState({
    search: "",
    page: 1,
    limit: 5,
    createdAt: "",
    status: "",
  });

  const { isLoading, data, isRefetching, refetch } = UseGetAllMessages({
    queryParams: queryParams,
  });

  const { mutate } = useUpdateMessageStatus();
  const { mutate: mutateCount } = useUpdateMessageViewsCount();

  const payload = {
    status: "read",
  };
  const updateStatus = (id: string) => {
    mutate({ id: id as string, payload });
  };

  const updateViewsCount = (id: string) => {
    mutateCount(id);
  };

  const updateQueryParams = (params: IFilterMessageQuery) => {
    setQueryParams((prev) => ({ ...prev, ...params }));
  };

  // useEffect to refetch data when queryParams change
  useEffect(() => {
    refetch();
    // Call refetch whenever queryParams changes
  }, [queryParams, refetch]);

  const tableHead: ITableHead<IContactData>[] = [
    {
      label: "Sender's Name",
      accessor: "senderName",
      render: ({ senderName }) => senderName,
    },

    {
      label: "Sender's Email",
      accessor: "senderEmail",
      render: ({ senderEmail }) => senderEmail,
    },
    {
      label: "Title",
      accessor: "messageTitle",
      render: ({ messageTitle }) => messageTitle,
    },
    {
      label: "Total Views",
      accessor: "totalViews",
      render: ({ totalViews }) => totalViews,
    },
    {
      label: "Date Sent",
      accessor: "createdAt",
      render: ({ createdAt }) => {
        return formatDate({ date: createdAt, time: true });
      },
    },
    {
      label: "Status",
      accessor: "status",
      render: ({ status }) => {
        return (
          <StatusBadge
            status={status as IStatusType}
            className={` w-[80px] text-center p-2 rounded-[8px] font-[500]  ${
              status === "unread"
                ? "text-statusText-error bg-statusText-error/10"
                : status === "read" &&
                  "text-statusText-success bg-statusText-success/10"
            }`}
          />
        );
      },
    },
  ];

  const openFilterBox = () => handleModalOpen("filterContactList");

  const closeFilterBox = () => {
    handleModalClose("filterContactList");
  };

  return (
    <>
      <AppHeader title="Contact List" />
      <PageContainer className="">
        <div className=" flex items-center justify-between">
          <div></div>
          <div>
            <button
              onClick={() => openFilterBox()}
              className="flex items-center gap-2 bg-background-dark text-primary-white py-[8px] px-[24px] rounded-[8px]"
            >
              <span>
                <IoFilterOutline className="text-[20px]" />
              </span>{" "}
              Filter
            </button>
          </div>
        </div>
        <div className="">
          <CustomTable<IContactData>
            // children={renderText()}
            tableHeads={tableHead}
            loading={isLoading || isRefetching}
            dataTableSource={data?.data?.messages || []}
            page_size={data?.data?.pageSize}
            total={data?.data?.total}
            current_page={data?.data?.currentPage}
            setCurrentPage={(val: number) => updateQueryParams({ page: val })}
            setLimit={(val: number) => updateQueryParams({ limit: val })}
            tableEmptyState={
              <EmptyBar emptyStateSize="lg" componentType="contact" />
            }
            tableLoader={<TableLoading title="Loading Messages" />}
            // showMenu={true}
            // menuOptions={[
            //   {
            //     menuTitle: "Read",
            //     action: (agentId: IContactData) =>
            //       console.log("View Details clicked", agentId.id),
            //   },
            //   {
            //     menuTitle: "Unread",
            //     action: (agentId: IContactData) =>
            //       console.log("Delete clicked", agentId),
            //   },
            // ]}
            // onMenuClick={() => null}
            showPagination
            onRowClick={(row: IContactData) => {
              updateViewsCount(row.id);
              if (row.status === "unread") {
                updateStatus(row.id);
              }
              navigate(`/user/contact/${row.id}`);
            }}
          />
        </div>
      </PageContainer>

      {modalState?.modalType === "filterContactList" &&
        modalState?.openModal && (
          <ContactFilter
            queryParams={queryParams}
            updateQueryParams={updateQueryParams}
            closeFilterBox={closeFilterBox}
          />
        )}
    </>
  );
}

export default ContactList;
