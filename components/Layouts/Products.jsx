import React from "react";
import ProductListComponent from "../ProductListComponent";
import _ from "lodash";
import Link from "next/link";
const ProductData = [
  {
    id: 1,
    title: "Dành Cho Phụ Nữ",
    products: [
      {
        id: 1,
        name: "Aktiv Meno",
        price: "266.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2021/03/MENO60-left-01-247x296.png",
        point: "266",
      },
      {
        id: 2,
        name: "Beauty Collagen",
        price: "324.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/SBECO30-Tube-Vertical-01-247x296.png",
        point: "324",
      },
      {
        id: 5,
        name: "Belle Anti-aging",
        price: "250.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/ATAG-left-01-247x296.png",
        point: "650",
      },
      {
        id: 6,
        name: "Belle Hairnaki",
        price: "250.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/HAIRNAKIN-left-01-247x296.png",
        point: "750",
      },
    ],
  },
  {
    id: 2,
    title: "Dành Cho Nam Giới",
    products: [
      {
        id: 3,
        name: "Active Men Plus",
        price: "491.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/ACMEN-left-01-247x296.png",
        point: "200",
      },
      {
        id: 4,
        name: "Prostacalm",
        price: "349.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/PROS-left-01-247x296.png",
        point: "150",
      },
      {
        id: 7,
        name: "Liver Complex",
        price: "349.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/LICO-left-01-247x296.png",
        point: "700",
      },
      {
        id: 8,
        name: "Anti Stress",
        price: "349.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/ANTS-left-01-247x296.png",
        point: "600",
      },
      {
        id: 9,
        name: "Anti Stress",
        price: "349.000",
        image:
          "https://doppelherz.vn/wp-content/uploads/2020/12/ANTS-left-01-247x296.png",
        point: "600",
      },
    ],
  },
];
const Products = () => {
  return (
    <>
      <div className="mb-5 px-3 md:px-0">
        <ProductListComponent />
        <div className=" md:mr-6 mt-5 flex justify-center items-center w-full">
          <Link href={"https://doppelherz.vn/san-pham/"}>
            <a
              target={"_blank"}
              className="text-2xl font-medium px-12  shadow-md rounded-xl py-3 hover:bg-red-600 bg-red-500 text-white"
            >
              Xem Thêm
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Products;
