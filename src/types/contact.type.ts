export type IContactData = {
  id: string;
  status: string;
  senderName: string;
  senderEmail: string;
  message: string;
  senderPhone: string;
  messageTitle: string;
  totalViews: string;
  createdAt: Date;
};

export type IFilterMessageQuery = {
  createdAt?: string;
  updated_at?: string;
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
  limit?: number;
};

export type IBaseResponse = {
  status: true;
  statusCode: number;
  message: string;
};

type AllMessages = {
  status: string;
  id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  senderPhone: string;
  messageTitle: string;
  totalViews: string;
  createdAt: Date;
};

export type IGetAllMessages = IBaseResponse & {
  data: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    messages: AllMessages[];
  };
};

export type IGetSingleMessage = IBaseResponse & {
  data: AllMessages;
};
