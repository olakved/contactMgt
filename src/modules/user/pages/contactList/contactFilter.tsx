import { useForm } from "react-hook-form";
import { IFilterMessageQuery } from "../../../../types/contact.type";
import { MdOutlineClose } from "react-icons/md";

interface ContactFilterProps {
  queryParams: IFilterMessageQuery;
  updateQueryParams: (params: Partial<IFilterMessageQuery>) => void;
  closeFilterBox: () => void;
}

function ContactFilter({
  queryParams,
  updateQueryParams,
  closeFilterBox,
}: ContactFilterProps) {
  const { register, handleSubmit, reset } = useForm<IFilterMessageQuery>({
    defaultValues: queryParams,
  });

  const onSubmit = (data: IFilterMessageQuery) => {
    updateQueryParams({
      ...data,
      page: 1, // Reset to page 1 when filters are applied
    });
    closeFilterBox();
  };

  const onClearFilters = () => {
    reset({
      status: "",
      search: "",
      createdAt: "",
      page: 1,
      limit: 5,
    }); // Reset form values
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-light-1/50 backdrop-filter backdrop-blur-sm">
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col gap-[20px] bg-primary-white w-[550px] rounded-[12px] p-[40px] flex flex-col gap-3 shadow-sm"
        >
          <div className="flex justify-between">
            <p className="font-[500] mb-[5px] text-primary-main text-[16px]">
              Filters
            </p>
            <p
              onClick={onClearFilters}
              className="cursor-pointer text-statusText-error"
            >
              Clear all
            </p>
          </div>
          <div>
            <p className="font-[500] mb-[5px] text-primary-main text-[16px]">
              Status
            </p>
            <select
              {...register("status")}
              className="w-full p-[12px] border-[1px] border-primary-light-1 rounded-[8px]"
            >
              <option value="">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          <div>
            <p className="font-[500] mb-[5px] text-primary-main text-[16px]">
              Date
            </p>
            <input
              className="w-full p-[12px] border-[1px] border-primary-light-1 rounded-[8px]"
              type="date"
              {...register("createdAt")}
            />
          </div>
          <div>
            <p className="font-[500] mb-[5px] text-primary-main text-[16px]">
              Limit
            </p>
            <input
              className="w-full p-[12px] border-[1px] border-primary-light-1 rounded-[8px]"
              type="number"
              {...register("limit")}
              min="1"
            />
          </div>
          <button
            type="submit"
            className="bg-secondary-light-1 py-[12px] px-[24px] rounded-[12px] font-[500] text-primary-white"
          >
            Apply Filters
          </button>
          <div
            onClick={closeFilterBox}
            className="absolute -right-[40px] -top-[40px] p-[12px] cursor-pointer rounded-[100%] bg-statusText-error rounded-[12px] font-[500] text-primary-white"
          >
            <div className="flex justify-center items-center w-full h-full">
              <MdOutlineClose />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactFilter;
