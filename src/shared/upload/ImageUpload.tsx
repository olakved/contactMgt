import { Input } from "@chakra-ui/react";
import { resetInputValue } from "../../utils/constants";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlinePhotoCameraFront } from "react-icons/md";

type UploadProp = {
  keyName?: string;
  url?: string;
  className?: string;
  acceptType: string;
  successWatcher: boolean;
  setChosenImage?: (_val: File) => void;
};

const MAX_IMAGE_SIZE = 600 * 600; // 1MB

function ImageUpload({
  keyName,
  className,
  acceptType,
  successWatcher,
  setChosenImage,
}: UploadProp) {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [imageString, setImageString] = useState<File | null>(null);
  const sideClasses =
    "relative h-[150px] w-[150px] cursor-pointer primary-self-text flex rounded-full justify-center items-center bg-tertiary-light-4 overflow-hidden mx-auto ";

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = useMemo(() => {
    if (sideClasses) {
      return sideClasses + " " + className;
    }
    return sideClasses;
  }, [className]);

  useEffect(() => {
    // setChosenImage && setChosenImage(imageString as File);
    if (setChosenImage) {
      setChosenImage(imageString as File);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageString]);

  useEffect(() => {
    if (successWatcher) {
      setPreviewImage("");
      setImageString(null);
    }
  }, [successWatcher]);

  const onClickImage = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const allowedExtensions = /(jpg|jpeg|png|svg)$/i;
    //checking the img type
    const isValid = allowedExtensions.exec(file?.type);

    if (!isValid) {
      alert("Not Valid Image type");
      return resetInputValue(e);
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image size exceeds the maximum allowed size (240kb).");
      return resetInputValue(e);
    } else if (file) {
      setImageString(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        id={keyName}
        className="hidden"
        type="file"
        accept={acceptType}
        onChange={(e) => {
          if (handleImage1Change) {
            handleImage1Change(e);
          }
        }}
      />

      <div className="relative w-[150px]">
        <div className={classes} onClick={onClickImage}>
          {previewImage ? (
            <img
              className={"object-cover w-[100%] h-[100%] "}
              src={previewImage}
              alt="upload_image"
            />
          ) : (
            <FaCircleUser className="h-[100px] w-[100px] text-background-dark" />
          )}
        </div>
        <div
          className="absolute right-[10px] cursor-pointer bg-background-dark w-[30px] h-[30px] flex justify-center items-center top-[10px] rounded-full"
          onClick={onClickImage}
        >
          <MdOutlinePhotoCameraFront className=" text-[20px] text-primary-white" />
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
