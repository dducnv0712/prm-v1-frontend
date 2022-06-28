import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layouts/Layout";
import _, { parseInt } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Layouts/Header";
import qrcodeApi from "../../api/qrcodeApi";
import Link from "next/link";
import Loading from "../../components/Loading/Loading";
import { getCurrentUser, logout } from "../../store/actions/authActions";

const STORAGE_URL = process.env.STORAGE_URL;
const Tichdiem = (data) => {
  const router = useRouter();
  const params = router.query.param;
  const [infoExchange, setInfoExchange] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const customerInfo = useSelector((state) => state.auth.auth);

  useEffect(() => {
    if (_.isEmpty(customerInfo)) {
      router.push("/dangnhap");
    }
  }, [customerInfo, router]);
  useEffect(() => {
    if (params && params.length === 3) {
      const promotion_id = params[0];
      const product_id = params[1];
      const special_code = params[2];
      qrcodeApi
        .getInfoExchangeGift({ promotion_id, product_id, special_code })
        .then((res) => {
          if (res.status === 200) {
            setIsLoading(false);
            setInfoExchange({
              ...infoExchange,
              ...res.data,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setInfoExchange({
            ...infoExchange,
            // message: err.data.error
          });
        });
    } else {
      setInfoExchange({});
    }
  }, [params]);

  return (
    <>
      <Header title="Thông báo" />
      <Layout>
        <div className="mx-auto min-h-screen px-5 lg:px-14 pt-10 bg-gray-100">
          <div className="w-full md:max-w-5xl m-auto mt-10">
            {isLoading ? (
              <>
                <Loading />
              </>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <Image
                  alt=""
                  src="https://sukien.doppelherz.vn/src/dist/img/logo/logo.png"
                  width="150px"
                  height="150px"
                  objectFit="contain"
                />
                {infoExchange?.status ? (
                  <>
                    <div className="my-8">
                      <h1 className="text-center text-5xl text-red-600 font-medium my-4">
                        {infoExchange?.message}
                      </h1>
                      <p className="text-center text-xl text-slate-700 my-4">
                        Sản Phẩm Đã Quét:{" "}
                        <span className="text-red-600">
                          {infoExchange?.product?.name}
                        </span>
                      </p>
                      <p className="text-center text-sm text-slate-500 mt-4 mb-6">
                        Bạn đã được tích{" "}
                        <span className="text-red-600 text-xl font-semibold">
                          {infoExchange?.point}
                        </span>{" "}
                        điểm vào tài khoản, Cảm ơn bạn đã tham gia chương trình!
                      </p>
                      <p className="m-auto w-full text-center">
                        <Link href={`/lichsutichdiem`}>
                          <a className="bg-red-500 text-white font-sm px-6 rounded-md py-3">
                            Xem lịch sử
                          </a>
                        </Link>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="my-8">
                      <h1 className="text-center text-5xl text-red-600 font-medium my-4">
                        Tích Điểm Thất Bại
                      </h1>
                      <p className="text-center text-xl text-slate-700 my-4">
                        Sản Phẩm Đã Quét:{" "}
                        <span className="text-red-600">
                          {infoExchange?.product?.name}
                        </span>
                      </p>
                      <p className="m-auto text-center text-sm text-slate-500 leading-6 my-t-4 mb-6 w-full md:w-3/5">
                        Mã số sản phẩm của bạn đã từng được kích hoạt. Yêu cầu
                        tích điểm không thành công. Vui lòng liên hệ{" "}
                        <span className="text-red-600">CSKH</span> của{" "}
                        <Link href={"https://doppelherz.vn/"}>
                          <a className="text-red-600">Doppelherz Việt Nam</a>
                        </Link>{" "}
                        qua email{" "}
                        <Link href={"mailto:info@mastertran.vn"}>
                          <a className="text-red-600">info@mastertran.vn</a>
                        </Link>{" "}
                        để được bồi thường và hỗ trợ tốt nhất.
                      </p>
                      <p className="m-auto w-full text-center">
                        <Link href={`/lichsutichdiem`}>
                          <a className="bg-red-500 text-white font-sm px-6 rounded-md py-3">
                            Xem lịch sử
                          </a>
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Tichdiem;
