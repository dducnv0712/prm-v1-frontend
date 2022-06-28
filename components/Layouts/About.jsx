import React from "react";
import Image from "next/image";
const About = () => {
  return (
    <div
      className="py-10"
      style={{
        backgroundImage: "url(" + `${"/gioithieubg.jpg"}` + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
        <div className="flex justify-center">
          <div className="text-center  mb-3 md:mb-0">
            <img
              className="icon-size"
              alt="Thương hiệu số 1 tại Đức"
              src={"/icon/so1taiduc.png"}
            />
            <h3 className="text-xl font-semibold text-center mt-1">
              Thương hiệu số 1 tại Đức
            </h3>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center w-40 md:w-56  mb-3 md:mb-0">
            <img
              className="icon-size"
              alt="98% người tiêu dùng Đức biết tới"
              src={"/icon/nguoiducbiet.png"}
            />
            <h3 className="text-xl font-semibold inline-block text-center mt-1">
              98% người tiêu dùng Đức biết tới
            </h3>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center w-40 md:w-56  mb-3 md:mb-0">
          <img
              className="icon-size"
              alt="98% người tiêu dùng Đức biết tới"
              src={"/icon/70.png"}
            />
            <h3 className="text-xl font-semibold inline-block text-center mt-1">
              98% người tiêu dùng Đức biết tới
            </h3>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-center w-40 md:w-56">
          <img
              className="icon-size"
              alt="98% người tiêu dùng Đức biết tới"
              src={"/icon/800.png"}
            />
        
            <h3 className="text-xl font-semibold inline-block text-center mt-1">
              98% người tiêu dùng Đức biết tới
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
