import React from "react";
import Header from "../components/Layouts/Header";
import Link from "next/link";
const ErrorNotFound = () => {
  return (
    <div>
      <Header title="Không Tìm Thấy" />
      <div className="bg-gray-100 ">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-9xl font-bold text-red-600">404</h1>
              <h1 className="text-2xl font-medium py-8">
                Lỗi!, Không Tìm Thấy Trang
              </h1>
              <p className="text-lg pb-8 px-12 font-medium">
                Không tìm thấy trang, hoặc hệ thống bị lỗi. <br />
                Vui lòng thử lại sau hoặc liên hệ với nhãn hàng để được hỗ trợ.
              </p>
              <Link href={"/"}>
                <a className="bg-red-700 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                  Trang Chủ
                </a>
              </Link>
         
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotFound;
