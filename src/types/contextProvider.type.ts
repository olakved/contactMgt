export type ProviderProps = {
  children: React.ReactNode;
};

export type IFormContextValue = {
  [x: string]: boolean | string | number;
};

export type IFormContextType = {
  multiFormValues: IFormContextValue;
  setmultiFormValues: React.Dispatch<React.SetStateAction<IFormContextValue>>;
  setFormValues: (_values: any) => void;
};

export type IModalContextValue = {
  modalType: string;
  openModal: boolean;
  message: string;
};

export type ISaveDetailContextValue = {
  url: string | null;
};

export type ISaveDetailContextType = {
  saveDetails: ISaveDetailContextValue;
  setSaveDetails: React.Dispatch<React.SetStateAction<ISaveDetailContextValue>>;
};
export type IModalContextType = {
  modalState: IModalContextValue;
  setModalState: React.Dispatch<React.SetStateAction<IModalContextValue>>;
  handleModalClose: (_type: string) => void;
  handleModalOpen: (_type: string) => void;
};
