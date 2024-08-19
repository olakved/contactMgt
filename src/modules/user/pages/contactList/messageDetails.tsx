import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../../layout/appHeader";
import { GET_SINGLE_MESSAGES_URL } from "../../../../utils/apiUrl";
import {
  UseGetSingleMessages,
  useUpdateMessageStatus,
} from "../../../../services/contact.service";
import { formatDate } from "../../../../utils/constants";
import { IoArrowBack } from "react-icons/io5";

function MessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = UseGetSingleMessages({
    // queryParamsId: authUser?.id as string,
    url: GET_SINGLE_MESSAGES_URL(id as string),
  });

  const { mutate, isLoading: statusLoading } = useUpdateMessageStatus();

  const status = data?.data?.status as string;
  const setNewStatus = status === "unread" ? "read" : "unread";
  const payload = {
    status: setNewStatus,
  };
  const updateStatus = () => {
    mutate({ id: id as string, payload });
  };

  return (
    <div>
      <div>
        <AppHeader title="View Message" />
      </div>
      {isLoading ? (
        <div>Loading..</div>
      ) : (
        <div>
          <div className="px-[40px] mt-[40px]">
            <div className="p-[40px]  bg-primary-light-2">
              <div className="flex justify-between pb-[10px] border-b-[1px] border-x-primary-lighter">
                <div
                  onClick={() => navigate(-1)}
                  className="bg-primary-white flex justify-center items-center p-y-2 px-4 rounded-[8px]"
                >
                  <IoArrowBack className="cursor-pointer text-[25px]" />
                </div>
                <div className="flex items-center gap-[20px]">
                  <p
                    onClick={updateStatus}
                    className={`text-primary-white w-[100px] flex items-center justify-center p-2 cursor-pointer rounded-[8px] font-[500]  ${
                      status === "unread"
                        ? "bg-statusText-error "
                        : status === "read" && "bg-statusText-success"
                    }`}
                  >
                    {statusLoading ? "Loading..." : status}
                  </p>
                  <p
                    className={` w-[100px] flex items-center justify-center p-2 cursor-pointer rounded-[8px] font-[500] border-[1px] border-statusText-error text-statusText-error               
                    `}
                  >
                    {/* {statusLoading ? "Loading..." : "Delete"} */}
                    Delete
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[10px] mt-[20px] ">
                <p>
                  <span className="font-[700]">Name:</span>{" "}
                  {data.data.senderName}
                </p>
                <div className="flex gap-[40px]">
                  <p>
                    <span className="font-[700]">Email:</span>{" "}
                    {data.data.senderEmail}
                  </p>
                  <p>
                    <span className="font-[700]">Phone:</span>{" "}
                    {data.data.senderPhone}
                  </p>
                  <p>
                    <span className="font-[700]">Date:</span>{" "}
                    {formatDate({ date: data.data.createdAt, time: false })}
                  </p>
                </div>
                <div className="flex gap-[40px]">
                  <p>
                    <span className="font-[700]">Title:</span>{" "}
                    {data.data.messageTitle}
                  </p>
                  <p>
                    <span className="font-[700]">Views:</span>{" "}
                    {data.data.totalViews}
                  </p>
                </div>
                <p className="h-[320px]  overflow-y-auto">
                  <span className="font-[700]">Message:</span>{" "}
                  <span>{data.data.message}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageDetails;
