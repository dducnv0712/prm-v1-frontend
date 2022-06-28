import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import _ from "lodash";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import giftApi from "../api/giftApi";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../utils/formatCurrency";
import { LazyLoadImage } from "react-lazy-load-image-component";

function imageLoader({ src }) {
  return src; // REPLACE WITH YOUR IMAGE DIRECTORY
}
const ProductListComponent = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    await giftApi.getAllProduct().then((res) => {
      if (res.status === 200) {
        setProducts(res.data);
      }
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <div className="backdrop-blur-sm bg-white/30   rounded-lg shadow-md">
        <div className="flex justify-center px-6">
            <div className="text-xl lg:text-4xl mt-6 font-bold uppercase text-center text-primary-red">
              Sản Phẩm Áp Dụng
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-3 md:pt-6 px-3 relative">
          <Slider {...settings}>
            {_.map(products, (item, index) => {
              return (
                <div key={index} className="px-3 pb-4 md:py-4  md:w-80  m-auto">
                  <a className="w-full rounded-lg overflow-hidden relative pt-2 px-4 pb-4 bg-white block h-full shadow-lg cursor-pointer">
                    {/* <div className="absolute top-3 right-3 rounded-full w-14 h-14 text-center flex justify-center items-center bg-rose-600 font-bold text-lg z-30 text-white">
                        {item && item.point}đ
                      </div> */}
                    <LazyLoadImage
                      alt={item?.name}
                      src={
                        "https://sukien.doppelherz.vn/storage/" + item?.image
                      }
                      className="h-48 w-full object-contain"
                    />
                    <div className="bg-white text-center font-bold text-lg dark:bg-gray-800 w-full p-4">
                      <h2 className="truncate">{item?.name}</h2>
                      <h3 className="text-base text-gray-600">
                        {formatCurrency(item?.price)}
                      </h3>
                    </div>
                    <div className="flex justify-center">
                      <a
                        href={item?.link_product}
                        className="px-3 flex justify-center items-center rounded-lg py-2 w-full hover:bg-red-600 bg-red-500 text-white    m-auto font-bold"
                      >
                        Mua Sản Phẩm
                      </a>
                    </div>
                  </a>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
