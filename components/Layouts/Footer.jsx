import React from "react";
import {
  HomeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MailIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";

const Footer = () => {
  return (
    <footer className="text-center lg:text-left border-t bg-yellow text-gray-600">
      <div className="max-w-7xl mx-auto px-2 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="col-span-1">
            <h2 className="uppercase font-semibold mb-4 text-3xl flex justify-center md:justify-start">
              Liên hệ
            </h2>
            <div className="flex">
              <div className="w-7">
                <LocationMarkerIcon className="w-6 h-6 mr-1" />
              </div>

              <a
                href="https://www.google.com/maps/place/DoppelHerz+Vi%E1%BB%87t+Nam/@21.0200792,105.7912142,15z/data=!4m5!3m4!1s0x3135ab5bba9ff49f:0x181b6d6292e3afb7!8m2!3d21.0200657!4d105.7915506"
                className="text-left mb-4"
              >
                Tầng 06, tháp A, tòa nhà Central Point số 219 Trung Kính, Phường
                Yên Hòa, Quận Cầu Giấy, TP Hà Nội
              </a>
            </div>

            <div className="flex">
              <div className="w-7">
                <PhoneIcon className="w-6 h-6 mr-1" />
              </div>
              <a
                href="tel:18001770"
                className="text-left mb-4"
              >
                Hotline: 18001770
              </a>
            </div>
            <div className="flex">
              <div className="w-7">
                <MailIcon className="w-6 h-6 mr-1" />
              </div>
              <a
                href="mailto:info@mastertran.vn"
                className="text-left mb-4"
              >
                Email: info@mastertran.vn
              </a>
            </div>
            <div className="flex">
              <div className="w-7">
                <GlobeAltIcon className="w-6 h-6 mr-1" />
              </div>
              <a
                href="https://doppelherz.vn/"
                className="text-left"
              >
                Website: www.doppelherz.vn
              </a>
            </div>
          </div>

          <div className="col-span-1 grid-cols-2 flex flex-row">
            <div className="col-span-1 w-full">
              <img
                src={"/logoDH1.png"}
                className="mr-3 h-48"
                alt="Doppelhers Logo"
              />
            </div>
            <div className="col-span-1 w-full">
              <img
                src={"/logo-mastertran.png"}
                className="mr-3 h-48"
                alt="Mastertran Logo"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-100 p-6 bg-red-500">
        <span> © 2022 Copyright: </span>
        <a className="text-white font-semibold" href="https://tbht.vn/">
          IT-TBHT
        </a>
      </div>
    </footer>
  );
};

export default Footer;
