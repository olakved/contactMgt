import { format } from "date-fns";

type IformData = {
  [key: string]: string;
};

export const Account = {
  User: "user",
  Admin: "admin",
  SubAdmin: "subAdmin",
  Aggregator: "aggregator",
  Exporter: "exporter",
  Offtakers: "offtaker",
  Farmer: "farmer",
  Agency: "agency",
  "Agency Admin": "agencyAdmin",
  "Agency Staff": "agencySubAdmin",
};

export const REGEX_CODE = /^[0-9]+$/;
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const ALPHANUM_REGEX = /^[a-zA-Z0-9\s]*$/;
export const ALPHAREGEX_CODE = /^[A-Za-z]+$/;
export const FULLNAME_REGEX = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
export const PHONE_REGEX = /[^\d]/g;
export const fullNameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)+$/;

export const capitalize = (text: string | undefined) => {
  if (text === null || typeof text !== "string") return;

  const words = text.includes("_") ? text.split("_") : text.split(" ");

  const output = words.map((word) => {
    const capitalizedWord =
      word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    return capitalizedWord;
  });
  return output.join(" ");
};

export const formatDate = ({
  date,
  time,
}: {
  date: string | Date;
  time?: boolean;
}) => {
  if (date === null) return;
  if (time) {
    return format(new Date(date), "dd MMM, yyyy • hh:mma");
  } else {
    return format(new Date(date), "dd MMM, yyyy");
  }
};

export const fullNameConcat = (
  firstname: string | undefined,
  lastname: string | undefined
) => {
  if (firstname === null || lastname === null) return;
  if (firstname && lastname) {
    const capitalizedFirstName = firstname ? capitalize(firstname) : "";
    const capitalizedLastName = lastname ? capitalize(lastname) : "";
    const fullName = `${capitalizedFirstName} ${capitalizedLastName}`.trim();
    return fullName !== "" ? fullName : "";
  }
  return "";
};

export function useValueFromArray(array: string[]) {
  return (valueToFind: string) => {
    if (array.includes(valueToFind)) {
      return valueToFind;
    }
    return null; // Return null if the value is not found in the array
  };
}

export const getYear = () => new Date().getFullYear();

export const resetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e) {
    return (e.target.value = "");
  }
};

export const formatString = (inputString: string) => {
  if (inputString === null || inputString === undefined || inputString === "") {
    return "";
  }

  const parts = inputString.split(": ");

  if (parts.length !== 2) {
    // Return the original string if it doesn't match the expected format.
    return inputString;
  }

  let key = parts[0];
  const value = parts[1];

  // Remove underscores and capitalize the first letter of the key.
  key = key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Capitalize the first letter of the value.
  const formattedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());

  // Combine the formatted key and value.
  const formattedString = `${key}: ${formattedValue}`;

  return formattedString;
};

export const extraKey = (inputString: string) => {
  if (inputString === null || inputString === undefined || inputString === "") {
    return "";
  }

  const parts = inputString.split(": ");

  if (parts.length !== 2) {
    // Return the original string if it doesn't match the expected format.
    return inputString;
  }

  const key = parts[0];
  return key;
};

export const getClass = (text: string) => {
  const classText = capitalize(text) as string;
  switch (classText) {
    case "Active":
    case "Verified":
    case "Approved":
    case "Accepted":
    case "Certified":
    case "Success":
      return "bg-[#DAFBEC] py-[6px] px-[12px] text-statusText-success font-[500] rounded-lg";
    case "Inactive":
    case "Blocked":
    case "Rejected":
      return "bg-[#FCD9DC] py-[5px] px-[12px] text-[#720B18] font-[500] rounded-lg";
    case "Not Approved":
    case "Not Certified":
      return "bg-[#FFE5E6] py-[5px] px-[12px] text-statusText-error font-[500] rounded-lg";
    case "Incoming":
    case "Pending":
      return "bg-[#E1E8F1] py-[5px] px-[12px] text-[#E6BB20/80] font-[500] rounded-lg";
    case "Collected":
      return "bg-[#FEF3C7] py-[5px] px-[12px] text-[#B45309] font-[500] rounded-lg";
    case "Processing":
    case "Progress":
      return "bg-[#D4F7F3] py-[5px] px-[12px] text-[#178275] font-[500] rounded-lg";
    default:
      return "";
  }
};

export const getStringArray = (formData: IformData | null): string[] => {
  const stringArray = [] as string[];
  if (formData === null) return [];

  for (const [key, value] of Object.entries(formData as IformData)) {
    if (value) {
      stringArray.push(`${key}: ${value}`);
    }
  }
  return stringArray;
};

// export const removeByKey = (obj: any, keyToRemove: string) => {
export const removeByKey = (
  obj: Record<string, string>,
  keyToRemove: string
) => {
  for (const key in obj) {
    if (key === keyToRemove) {
      delete obj[key];
      break; //Assuming you want to remove only the first occurrence of the key
    }
  }
  return obj;
};

export function getFirstSwordBeforeSpace(str: string, key?: string) {
  // Split the string by space
  const words = str?.split(" ");

  if (key === "lastName") {
    return words[1];
  }

  // Return the first word
  return words[0];
}

export const renderParagraph = (paragraph: string) => {
  // Split paragraph by <bold> tags
  const parts = paragraph.split(/(<bold>.*?<\/bold>)/);

  return parts.map((part, index) => {
    if (part.startsWith("<bold>") && part.endsWith("</bold>")) {
      // If part is bold, render with bold style
      return (
        <span key={index} className="font-bold">
          {part.replace(/<\/?bold>/g, "")}
        </span>
      );
    } else {
      // Otherwise, render normal text
      return <span key={index}>{part}</span>;
    }
  });
};

export function checkDateRange(startDate: Date, endDate: Date) {
  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
  const maxWeeksDifference = 3;

  // Calculate the difference in milliseconds between endDate and startDate
  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

  // Convert the difference to weeks
  const differenceInWeeks = differenceInMilliseconds / millisecondsPerWeek;

  const isWithinRange = differenceInWeeks > maxWeeksDifference;
  return {
    isWithinRange,
  };
}
