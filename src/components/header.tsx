import { headerData } from "../db/headerData";
// import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className=" bg-background-dark py-[16px]">
      <div className="max-content">
        <div className="container">
          <div className="flex  items-center justify-between">
            <div className="flex gap-[12px] items-center">
              {/* <img
                src={logo}
                alt=""
                className="w-[40px] h-[40px] rounded-[50%]"
              /> */}
              <p className="text-[white] font-[600] text-[32px] leading-[32px] tracking-normal">
                Veroco
              </p>
            </div>

            <div className="flex gap-[24px]">
              {headerData?.map((item, i) => (
                <p
                  onClick={() => navigate(item.url)}
                  key={i}
                  className="text-[white] cursor-pointer font-[400] text-[16px] leading-[16px] tracking-normal"
                >
                  {item.title}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-[24px]">
              <button className="bg-[white] py-[12px] px-[24px] rounded-[8px] text-[#0a3113]">
                Request a Demo
              </button>
              <button
                onClick={() => navigate("/user")}
                className="border-[white] border-[1px] py-[12px] px-[24px] rounded-[8px] text-[white]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
