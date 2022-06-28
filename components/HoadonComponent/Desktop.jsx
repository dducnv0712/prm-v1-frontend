import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { Tab } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";

import Loading from "../../components/Loading/Loading";

import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { formatStatus } from "../../utils/formatStatus";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Desktop = ({
  customerInfo,
  isLoading,
  historyExchanges,
  historyScans,
}) => {
  const scanColumns = [
    {
      name: "Tên Sản Phẩm",
      selector: (row) => row.product_name,
    },
    {
      name: "Mã Sản Phẩm",
      selector: (row) => row.qr_specialCode,
    },
    {
      name: "Đơn Giá",
      selector: (row) => formatCurrency(row.price),
    },
    {
      name: "Ngày Quét Mã",
      selector: (row) => formatDate(row.created_at),
    },
  ];

  const exchangeColumns = [
    {
      name: "Tên Phần Quà",
      selector: (row) => row?.gift?.name,
    },
    {
      name: "Địa Chỉ Nhận Quà",
      selector: (row) => row.address,
    },
    {
      name: "Số Điểm",
      selector: (row) => row?.gift?.valuePromotion,
    },
    {
      name: "Ngày Đổi Quà",
      selector: (row) => formatDate(row.created_at),
    },
    {
      name: "Trạng Thái",
      selector: (row) => formatStatus(row?.gift?.status),
    },
  ];

  const customStyles = {
    table: {
      style: {
        minHeight: "800px",
      },
    },
    rows: {
      style: {
        minHeight: "72px",
        fontSize: "14px",
        fontWeight: 500,
      },
    },
    headCells: {
      style: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {},
    },
  };

  return (
    <>
      <div className="py-32">
        <div className="max-w-5xl  mx-auto">
          {isLoading ? (
            <>
              <div style={{ height: 500 }}></div>
              <Loading />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-3xl text-slate-600 pb-8 pt-2">
                  LỊCH SỬ TÍCH ĐIỂM
                </h1>
                <div className="space-y-6 text-gray-500">
                  <Link className="mb-2" href="/doiqua/">
                    <a className="bg-rose-600 mt-1 hover:bg-rose-700  py-2 px-3 cursor-pointer text-white transition ease-in duration-200 text-center text-base font-semibold shadow-sm  focus:outline-none focus:ring-2 rounded-md">
                      Đổi Quà Ngay
                    </a>
                  </Link>
                </div>
              </div>
              <article className="overflow-hidden border rounded-xl">
                <div className="bg-[white] ">
                  <div className="p-9">
                    <div className="flex justify-between">
                      <div>
                        <Image
                          src={"/logo-nav.png"}
                          width={100}
                          alt="Logo"
                          height={"100%"}
                        />
                      </div>
                      <div className="space-y-6 text-gray-500 text-right">
                        <h3 className="text-3xl">
                          Điểm thưởng:{" "}
                          <span className="text-red-500 font-semibold">
                            {customerInfo?.currentPoint}
                          </span>
                        </h3>
                        <p className="text-xl text-slate-500">
                          Ngày tham gia:{" "}
                          <span className="font-normal text-slate-700">
                            {formatDate(customerInfo?.created_at)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-9">
                    <h2 className="font-bold mb-2 text-2xl text-gray-700">
                      Doppelherz Việt Nam
                    </h2>
                  </div>

                  <div className="px-9">
                    <div className=" mb-8 text-gray-700">
                      <div>
                        Tầng 06, tháp A, tòa Central Point số 219 Trung Kính
                        <br />
                        Phường Yên Hòa, Quận Cầu Giấy, Hà Nội
                        <br />
                        Email: info@mastertran.vn
                        <br />
                        SĐT: 18001770
                      </div>
                    </div>
                    <div className="border-t border-gray-200 mb-8 " />
                  </div>

                  <div className="px-9">
                    <h2 className="text-xl font-medium">Thông tin tài khoản</h2>
                    <table className="w-full">
                      <tbody>
                        {isLoading ? (
                          <Skeleton count={7}></Skeleton>
                        ) : (
                          <>
                            <tr>
                              <td width={200} className="font-medium ">
                                Mã KH:
                              </td>
                              <td className="font-medium  text-gray-700">
                                #{customerInfo?.id}
                              </td>
                            </tr>
                            <tr>
                              <td width={200} className="font-medium ">
                                Họ và Tên:
                              </td>
                              <td className="font-medium text-gray-700">
                                {customerInfo?.name}
                              </td>
                            </tr>
                            <tr>
                              <td width={200} className="font-medium ">
                                Số Điện Thoại:
                              </td>
                              <td className="font-medium text-gray-700">
                                {customerInfo?.phone}
                              </td>
                            </tr>
                            <tr>
                              <td width={200} className="font-medium ">
                                Email:
                              </td>
                              <td className="font-medium text-gray-700">
                                {customerInfo?.email}
                              </td>
                            </tr>
                            <tr>
                              <td width={200} className="font-medium">
                                Địa Chỉ:
                              </td>
                              <td className="font-medium text-gray-700">
                                {customerInfo?.address}
                              </td>
                            </tr>
                            <tr>
                              {/* <td width={200}>
                            <span className="font-medium">Ngày Tham Gia:</span>
                          </td> */}
                              {/* <td>
                            <span className="font-medium text-gray-700">{customerInfo?.created_at}</span>
                          </td> */}
                            </tr>
                            <tr>
                              <td width={200} className="pt-6 font-medium">
                                TỔNG ĐIỂM TÍCH LŨY:
                              </td>
                              <td className="pt-5 font-medium text-red-700 text-2xl">
                                {customerInfo?.summaryPoint} Điểm
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <Tab.Group>
                    <Tab.List className="flex space-x-1 p-1 pt-9 pb-12 pl-8 pr-8">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "pt-4 pb-4 mr-6 text-sm font-medium leading-5 ease-in",
                            selected
                              ? "text-red-700 border-solid border-b-4 border-rose-600"
                              : "text-black-700 hover:text-red-700"
                          )
                        }
                      >
                        Lịch sử tích điểm
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "pt-4 pb-4 text-sm font-medium leading-5 ease-in",
                            selected
                              ? "text-red-700 border-solid border-b-4 border-rose-600"
                              : "text-black-700 hover:text-red-700"
                          )
                        }
                      >
                        Lịch sử đổi quà
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div className="pb-12 pl-8 pr-8">
                          <h2 className="text-xl font-medium">
                            Lịch sử tích điểm
                          </h2>
                          <div className="flex flex-col border rounded-lg mx-0 mt-2 overflow-auto p-2">
                            <DataTable
                              columns={scanColumns}
                              data={historyScans}
                              fixedHeader
                              fixedHeaderScrollHeight="300px"
                              // pagination={true}
                              customStyles={customStyles}
                              subHeaderAlign="left"
                              responsive={true}
                            />
                          </div>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="pb-12 pl-8 pr-8">
                          <h2 className="text-xl font-medium">
                            Lịch sử đổi quà
                          </h2>
                          <div className="flex flex-col border rounded-lg mx-0 mt-2 overflow-auto p-2">
                            <DataTable
                              columns={exchangeColumns}
                              data={historyExchanges}
                              fixedHeader
                              fixedHeaderScrollHeight="300px"
                              // pagination={true}
                              customStyles={customStyles}
                              subHeaderAlign="left"
                              responsive={true}
                            />
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </article>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Desktop);
