import { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import _ from "lodash";
import SampleNextArrow from "../components/SampleNextArrow";
import SamplePrevArrow from "../components/SamplePrevArrow";
import ReverseMd5 from "reverse-md5";
import About from "../components/Layouts/About";
import Products from "../components/Layouts/Products";
import customerApi from "../api/customerApi";
import Image from "next/image";
import Header from "../components/Layouts/Header";
import { TruckIcon } from "@heroicons/react/outline";
import Link from "next/link";
const Home = () => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          arrows: false,
        },
      },
    ],
  };
  var rev = ReverseMd5({
    lettersUpper: false,
    lettersLower: true,
    numbers: false,
    special: false,
    whitespace: false,
    maxLen: 32,
  });

  return (
    <Layout>
      <Header title="Tích Điểm" />
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 pt-10  m-auto px-3 md:px-6">
        <div className=" max-w-7xl w-full  m-auto mt-16 ">
          <div className="mb-7 rounded-2xl overflow-hidden">
            <Image
              src={"/Banner-home.png"}
              width={1200}
              height={500}
              className="w-full"
              layout="responsive"
              alt=""
            />
            {/* <Slider {...settings}>
              <div className="w-full rounded-lg overflow-hidden">
                <img className="w-full" src="https://doppelherz.vn/wp-content/uploads/2022/04/c-gui-up-lai-nay.jpg" />
              </div>
              <div className="w-full rounded-lg overflow-hidden">
                <img className="w-full" src="https://doppelherz.vn/wp-content/uploads/2021/06/00.-Banner-Trang-chu-Giai-thuong-2.jpg" />
              </div>
            </Slider> */}
          </div>
          <div
            id="thele"
            className="flex items-center justify-between w-full mb-5 "
          >
            <div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded">
              <div className="w-full mr-2  mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-2xl lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="text-center text-white">
                  <h1 className="text-lg md:text-2xl font-bold">
                    ÁP DỤNG TOÀN QUỐC
                  </h1>
                  khi mua sản phẩm của Doppelherz
                </div>
              </div>
              <div className="w-full mr-2 mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-red-500 to-red-700">
                <div className="text-center text-white">
                  <h1 className=" text-lg md:text-2xl  font-bold">
                    NHẬN QUÀ HẤP DẪN
                  </h1>
                  khi tích đủ điểm
                </div>
              </div>
              <div className="w-full mr-2 mb-3 md:mb-3 lg:mb-0 rounded-2xl flex justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20  bg-gradient-to-r from-red-500 to-red-700">
                <div className="text-center text-white">
                  <h1 className="text-lg md:text-2xl font-bold">
                    DỄ DÀNG THAO TÁC
                  </h1>
                  chỉ với 01 lần quét mã
                </div>
              </div>
              <div className="w-full flex rounded-2xl lg:mb-0 justify-center items-center border shadow-md lg:w-1/4 text-base md:h-28 h-20 bg-gradient-to-r from-red-500 to-red-700">
                <div className="text-center text-white">
                  <h1 className="text-lg md:text-2xl font-bold">
                    QUÀ TẶNG CHÍNH HÃNG
                  </h1>
                  từ CHLB. Đức
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow max-w-7xl m-auto p-1 text-lg rounded-lg md:rounded-b-none md:rounded-t-2xl">
          <div className="text-xl lg:text-4xl mt-6 font-bold uppercase text-center text-primary-red">
            CHƯƠNG TRÌNH TÍCH ĐIỂM ĐỔI QUÀ
          </div>
          <div className="px-4 pt-3 md:pt-6 text-base lg:text-lg">
            <p className="mb-2">
              Cùng tham gia chương trình{" "}
              <span className=" font-bold">
                Tích điểm đổi quà cùng Doppelherz Việt Nam
              </span>{" "}
              để tận hưởng những đặc quyền cho riêng mình. Tích điểm tại bất cứ
              nơi đâu để nhận những phần quà hấp dẫn từ thương hiệu số 1 tại
              Đức. Hơn thế nữa, Doppelherz Việt Nam ra mắt &ldquo;Tem tích điểm&ldquo; trên
              mỗi hộp sản phẩm giúp khách hàng tích điểm dễ dàng hơn chỉ với 01
              lần quét mã.
            </p>
            <p className="mb-2">
              <span className="font-bold">1. Tên chương trình:</span> Tích điểm
              đổi quà cùng Doppelherz Việt Nam{" "}
            </p>
            <p className="mb-2">
              <span className="font-bold">2. Thời gian áp dụng:</span> Từ ngày
              01/06/2022 đến khi có thông báo mới nhất
            </p>
            <p className="mb-2">
              <span className="font-bold">3. Đối tượng áp dụng:</span> Tất cả
              các Khách hàng mua sản phẩm của Doppelherz Việt Nam tại các hiệu
              thuốc, nhà thuốc, chuỗi cửa hàng, sàn thương mại điện tử, website,
              kênh online.. là đại lý bán hàng, nhà phân phối chính thức của
              Doppelherz Việt Nam.
            </p>
            <p className="mb-2">
              <span className="font-bold">4. Nội dung chương trình:</span> Khách
              hàng quét mã QR tại &ldquo;Tem tích điểm&ldquo; dán trên mỗi hộp
              sản phẩm Doppelherz sẽ được tích điểm vào hệ thống trên website{" "}
              <a
                className="text-red-700 underline"
                href="https://sukien.doppelherz.vn/hoadon"
              >
                https://sukien.doppelherz.vn
              </a>{" "}
              và quy đổi ra quà tặng tương ứng với số điểm tích được. Mỗi
              10.000đ sẽ được tích 1 điểm vào tài khoản của Khách hàng trên hệ
              thống.
            </p>
            <p className="mb-2">
              <span className="font-bold">
                5. Thể lệ chi tiết chương trình:
              </span>{" "}
              Vui lòng tham khảo{" "}
              <Link href={"/#thele"}>
                <a className="text-red-600">tại đây</a>
              </Link>
            </p>
            <p className="mb-2">
              <span className="font-bold">6. Điều khoản sử dụng:</span> Vui lòng
              tham khảo{" "}
              <Link href={"/dieukhoan"}>
                <a target={"_blank"} className="text-red-600">
                  tại đây
                </a>
              </Link>
            </p>
            <p className="mb-2">
              <span className="font-bold">7. Chính sách bảo mật:</span> Vui lòng
              tham khảo{" "}
              <Link href={"/baomat"}>
                <a target={"_blank"} className="text-red-600">
                  tại đây
                </a>
              </Link>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-yellow p-3 md:p-6 mt-5 md:mt-0 rounded-xl shadow md:rounded-t-none md:rounded-b-2xl">
            <div className="flex mx-auto flex-col xl:flex-row">
              <div className=" md:mr-6 mb-3 w-full rounded-xl shadow-md bg-white dark:bg-gray-800 p-3">
                <div className="flex  gap-4 justify-start md:justify-center items-center">
                  <div className="flex-shrink-0 py-3">
                    <img
                      alt="profil"
                      src="https://doppelherz.vn/wp-content/uploads/2020/05/so-luong-2.png"
                      className="mx-auto object-cover rounded-full h-20 w-20"
                    />
                  </div>
                  <div className=" flex text-center flex-col ">
                    <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                      Sản Phẩm
                    </span>
                    <span className="text-gray-600 font-bold dark:text-white  text-lg">
                      Chính Hãng 100%
                    </span>
                  </div>
                </div>
              </div>
              <div className=" md:mr-6 mb-3 w-full rounded-xl shadow-md bg-white dark:bg-gray-800 p-3">
                <div className="flex  gap-4 justify-start md:justify-center items-center">
                  <div className="flex-shrink-0 py-3">
                    <img
                      alt="profil"
                      src="https://doppelherz.vn/wp-content/uploads/2020/05/brand-1.png"
                      className="mx-auto object-cover rounded-full h-20 w-20 "
                    />
                  </div>
                  <div className=" flex text-center flex-col ">
                    <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                      Thương Hiệu
                    </span>
                    <span className="text-gray-600 font-bold dark:text-white  text-lg">
                      Số 1 Tại Đức
                    </span>
                  </div>
                </div>
              </div>
              <div className=" mb-3 w-full rounded-xl shadow-md bg-white dark:bg-gray-800 p-3">
                <div className="flex  gap-4 justify-start md:justify-center items-center ">
                  <div className="flex-shrink-0 py-3">
                    <img
                      alt="profil"
                      src={"/icon/freeship.png"}
                      className="mx-auto object-cover rounded-full h-20 w-20 "
                    />
                  </div>
                  <div className=" flex text-center flex-col ">
                    <span className="text-gray-600 dark:text-white text-lg w-44  font-medium">
                      Miễn Phí Giao Hàng
                    </span>
                    <span className="text-gray-600 font-bold dark:text-white  text-lg">
                      Toàn Quốc
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className=" md:mr-6 mt-3 flex justify-center items-center w-full">
              <a
                href="https://sukien.doppelherz.vn/dangky"
                className="text-2xl animation-btn font-medium px-14 shadow-md rounded-xl py-3 hover:bg-red-600 bg-red-500 text-white"
              >
                Tích điểm ngay
              </a>
            </div>
          </div>
        </div>
        <section className="max-w-7xl m-auto">
          <Products />
        </section>
      </div>
      <section>{/* <About /> */}</section>
    </Layout>
  );
};

export default Home;
