function PersonalInfo() {
  const personalInfoArray = [
    {
      label: "Full Name",
      inputName: "full_name",
    },
    {
      label: "Email",
      inputName: "email",
    },
    {
      label: "Phone Number",
      inputName: "phone_number",
    },
    {
      label: "Gender",
      inputName: "gender",
    },
  ];
  return (
    <div>
      {" "}
      <div className="flex flex-col gap-y-[20px]">
        {personalInfoArray.map((info) => {
          return (
            <div key={info.label}>
              <p>{info.label}</p>
              <input type="text" name={info.inputName} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInfo;
