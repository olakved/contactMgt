// import logo from "../assets/logo.png";
import { footerData } from "../db/footerData";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

function Footer() {
  return (
    <div className="bg-background-dark py-[100px]">
      <div className="max-content">
        <div className="container">
          <div className="flex gap-[80px] text-[white]">
            <div className="w-[450px]">
              <div className="flex gap-[12px] ">
                {/* <img
                  src={logo}
                  alt=""
                  className="w-[40px] h-[40px] rounded-[50%]"
                /> */}
                <p className="font-[600] text-[32px] leading-[32px]">Veroco</p>
              </div>
              <p className="">32 Ade Ajayi St, Ogudu GRA 100242, Lagos</p>
              <p className="">Email: support@edgehr.com</p>
              <div className="flex items-center gap-[12px] mt-[30px]">
                <BsTwitterX />
                <BsLinkedin />
                <BsInstagram />
                <BsFacebook />
              </div>
            </div>

            {/* Part B starts here */}
            <div className="flex">
              {footerData.map((item, i) => (
                <div key={i} className="w-[350px] ">
                  <p className="font-bold">{item.header}</p>

                  <div className="mt-[18px] flex flex-col gap-[15px]">
                    {item.links.map((list, i) => (
                      <p key={i}>{list.text}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
