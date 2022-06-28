import React, { memo } from "react";
import Image from "next/image";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Tab } from "@headlessui/react";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { formatStatus } from "../../utils/formatStatus";

const scanColumns = [
  {
    name: 'Tên Sản Phẩm',
    selector: row => row.product_name,
  },
  {
    name: 'Mã Sản Phẩm',
    selector: row => row.qr_specialCode,
  },
  {
    name: 'Đơn Giá',
    selector: row => formatCurrency(row.price),
  },
  {
    name: 'Ngày Quét Mã',
    selector: row => formatDate(row.created_at),
  }
];

const exchangeColumns = [
  {
    name: 'Tên Phần Quà',
    selector: row => row?.gift?.name,
  },
  {
    name: 'Địa Chỉ Nhận Quà',
    selector: row => row.address,
  },
  {
    name: 'Số Điểm',
    selector: row => row?.gift?.valuePromotion,
  },
  {
    name: 'Ngày Đổi Quà',
    selector: row => formatDate(row.created_at),
  },
  {
    name: 'Trạng Thái',
    selector: row => formatStatus(row?.gift?.status),
  },
]

const customStyles = {
  table: {
    style: {
      minHeight: '800px'
    },
  },
  rows: {
    style: {
      minHeight: '72px',
      fontSize: '12px',
      fontWeight: 500
    },
  },
  headCells: {
    style: {
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold'
    },
  },
  cells: {
    style: {

    },
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Mobile = ({ customerInfo, isLoading, historyExchanges, historyScans }) => {

  return (
    <>
      <div className="py-32 p-2">
        <div className="text-center">
          <Image src={"/logo-nav.png"} width={40} alt="Logo" height={40} />
          <h2 className="font-bold mb-2 text-base text-gray-700">
            Doppelherz Việt Nam
          </h2>
        </div>
        <div className="p-3 mb-3 w-full bg-white border rounded-lg">
          <div className="space-y-6 text-center text-gray-500">
            <p className="text-lg font-extrabold tracking-tight uppercase font-body">
              THÔNG TIN TÍCH ĐIỂM
            </p>
          </div>
          <h3 className="mt-2 uppercase font-semibold">Thông Tin Khách Hàng</h3>
          <table>
            <tbody>
              {
                isLoading ? <Skeleton count={7}></Skeleton> : (
                  <>
                    {/* <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium ">Mã KH:</span>
                      </td>
                      <td>
                        <span className="font-medium  text-gray-700">#{customerInfo?.id}</span>
                      </td>
                    </tr> */}
                    {/* <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium ">Họ và Tên:</span>
                      </td>
                      <td>
                        <span className="font-medium  text-gray-700">
                          {customerInfo?.name}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium ">Số Điện Thoại:</span>
                      </td>
                      <td>
                        <span className="font-medium  text-gray-700">{customerInfo?.phone}</span>
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium ">Email:</span>
                      </td>
                      <td>
                        <span className="font-medium  text-gray-700">
                          {customerInfo?.email}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium ">Địa Chỉ:</span>
                      </td>
                      <td>
                        <span className="font-medium text-gray-700">
                          {customerInfo?.address}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium">Ngày Tham Gia:</span>
                      </td>
                      <td>
                        <span className="font-medium text-gray-700">{formatDate(customerInfo?.created_at)}</span>
                      </td>
                    </tr>
                    <tr className="mt-4 flex">
                      <td width={150} className="flex justify-start">
                        <span className="font-medium">Tổng điểm tích luỹ:</span>
                      </td>
                      <td>
                        <span className="font-medium text-red-700">{customerInfo?.currentPoint}</span> Điểm
                      </td>
                    </tr> */}
                    <tr>
                      <td width={200} className="font-medium ">Mã KH:</td>
                      <td className="font-medium  text-gray-700">#{customerInfo?.id}</td>
                    </tr>
                    <tr>
                      <td width={200} className="font-medium ">Họ và Tên:</td>
                      <td className="font-medium text-gray-700">{customerInfo?.name}</td>
                    </tr>
                    <tr>
                      <td width={200} className="font-medium ">Số Điện Thoại:</td>
                      <td className="font-medium text-gray-700">{customerInfo?.phone}</td>
                    </tr>
                    <tr>
                      <td width={200} className="font-medium ">Email:</td>
                      <td className="font-medium text-gray-700">{customerInfo?.email}</td>
                    </tr>
                    <tr>
                      <td width={200} className="font-medium">Địa Chỉ:</td>
                      <td className="font-medium text-gray-700">{customerInfo?.address}</td>
                    </tr>
                    <tr>
                      <td width={120} className="flex justify-start">
                        <span className="font-medium">Ngày Tham Gia:</span>
                      </td>
                      <td>
                        <span className="font-medium text-gray-700">{formatDate(customerInfo?.created_at)}</span>
                      </td>
                    </tr>
                    <tr>
                      <td width={150} className="flex justify-start">
                        <span className="font-medium">Tổng điểm tích luỹ:</span>
                      </td>
                      <td>
                        <span className="font-medium text-red-700">{customerInfo?.summaryPoint}</span> Điểm
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
                    {/* <tr>
                      <td width={200} className='pt-6 font-medium'>TỔNG ĐIỂM TÍCH LŨY:
                      </td>
                      <td className='pt-5 font-medium text-red-700 text-2xl'>{customerInfo?.summaryPoint} Điểm</td>
                    </tr> */}
                  </>
                )
              }
            </tbody>
          </table>
          <div className="flex justify-between mt-3">
            <h1 className="text-2xl font-bold">Số Điểm Hiện Tại:</h1>
            <h1 className="text-2xl text-red-600 font-bold">{customerInfo?.summaryPoint} Điểm</h1>
          </div>
        </div>
        <div className="mb-2 flex justify-end">
          <Link href="/doiqua/">
            <a className="bg-rose-600 mt-1 hover:bg-rose-700  py-2 px-3 cursor-pointer   text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              Đôỉ Quà Ngay
            </a>
          </Link>
        </div>

        <div className="p-3 mb-3 w-full bg-white border rounded-lg">
          {/* <h3 className="mt-2 uppercase text-center font-semibold">
            Lịch sử tích điểm
          </h3>
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination={false}
            subHeaderAlign="left"
            responsive={true}
            customStyles={customStyles}
          /> */}

          <Tab.Group>
            <Tab.List className="flex space-x-1 p-1 pt-6 pb-6">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'pt-4 pb-4 pl-8 pr-8 text-sm font-medium leading-5 ease-in',
                    selected
                      ? 'text-red-700 border-solid border-b-2 border-rose-600'
                      : 'text-black-700 hover:text-red-700'
                  )
                }
              >
                Lịch sử tích điểm
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'pt-4 pb-4 pl-8 pr-8 text-sm font-medium leading-5 ease-in',
                    selected
                      ? 'text-red-700 border-solid border-b-2 border-rose-600'
                      : 'text-black-700 hover:text-red-700'
                  )
                }
              >
                Lịch sử đổi quà
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="pb-12">
                  <h2 className="text-xl font-medium">Lịch sử tích điểm</h2>
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
                <div className="pb-12">
                  <h2 className="text-xl font-medium">Lịch sử đổi quà</h2>
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
      </div>
    </>
  );
};

export default memo(Mobile);
