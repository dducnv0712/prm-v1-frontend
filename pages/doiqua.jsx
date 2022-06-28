import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import Layout from "../components/Layouts/Layout";
import _ from "lodash/parseInt";
import ModalComponent from "../components/ModalComponent";
import Image from "next/image";
import { XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import Swal from "sweetalert2";
import customerApi from "../api/customerApi";
import giftApi from "../api/giftApi";
import { useRouter } from "next/router";
import { Form, Field } from "react-final-form";
import Header from "../components/Layouts/Header";
import toast, { Toaster } from "react-hot-toast";
import Zoom from "react-medium-image-zoom";
import Loading from "../components/Loading/Loading";
import { useMemo } from "react";
import { getCurrentUser } from "../store/actions/authActions";
import { LazyLoadImage } from "react-lazy-load-image-component";

const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const patternPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);

const required = (value) => (value ? undefined : "Vui lòng nhập thông tin");
const ValidPhoneNumber = (value) =>
    !patternPhone.test(value) ? "Số Điện Thoại Không Hợp Lệ" : undefined;
const composeValidators =
    (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
            );

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Doiqua = (data) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [itemSelect, setItemSelect] = useState(null);
    const [checkInfo, setCheckInfo] = useState(false);
    const [gifts, setGifts] = useState([]);
    const [validateInfo, setValidateInfo] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const customerInfo = useSelector(state => state.auth.auth)

    const fetchDataGifts = async () => {
        setIsLoading(true);
        giftApi.getAll()
            .then((res) => {
                setIsLoading(false);
                setGifts(res.data.sort((a, b) => a?.valuePromotion - b?.valuePromotion))
            })
    };

    useEffect(() => {
        fetchDataGifts();
    }, [])

    // useEffect(() => {
    //     if (data.customer === null) {
    //         return router.push("https://sukien.doppelherz.vn/hoadon");
    //     } else {
    //         // setCustomerInfo(data?.customer);
    //         // setGifts(data?.gifts);
    //         // setCustomerId(data?.customer.id);
    //         // if (data?.customer?.address == null || data?.customer?.phone == null) {
    //         //     setValidateInfo(true);
    //         // } else {
    //         //     setValidateInfo(false);
    //         // }
    //     }
    // }, [data.customer, data.gifts, router]);

    //hàm mở modal chọn quà
    const handleOpen = (item) => {
        setOpen(true);
        setItemSelect(item);
    };
    //hàm nhận quà.
    const claimGift = async () => {
        setButtonDisable(true);
        data = {
            gift_id: itemSelect?.id,
            customer_id: customerInfo?.id,
        };
        try {
            await giftApi
                .claimGift(data)
                .then((res) => {
                    if (res.status === 200) {
                        setOpen(false);
                        // setTimeout(() => {

                        // }, 600);
                        setButtonDisable(false);
                        setCheckInfo(false);
                        Swal.fire({
                            title: "Chúc Mừng",
                            imageUrl: "/gift-image.png",
                            imageWidth: 200,
                            html:
                                '<p>Bạn đã đổi <b class="text-red-600"> "' + itemSelect.name + '"</b> thành công!</p><p class="text-xs mt-4 ">*Nhân viên CSKH sẽ gọi điện liên hệ xác nhận sau khi bạn đổi quà.</p>',
                            confirmButtonText: "Xác nhận",
                        });
                        dispatch(getCurrentUser());
                        fetchDataGifts();
                    }
                })
                .catch((err) => { });
        } catch (err) { }
    };
    const changeInfo = async (value) => {
        setButtonDisable(true);
        const change = customerApi.updateCustomet(customerInfo?.id, value);
        change.then((res) => {
            if (res.status == 200) {
                setCheckInfo(false);
                setValidateInfo(false);
                setButtonDisable(false);
                dispatch(getCurrentUser());
                return true;
            }
        })
            .catch((err) => {
                setButtonDisable(false);
                return false;

            });
        toast.promise(change, {
            loading: "Đang Đổi Thông Tin...",
            success: <b>Đổi Thông Tin Thành Công!</b>,
            error: <b>Đổi Thông Tin Không Thành Công.</b>,
        });
    };

    //  hàm render phần quà trên thanh tiến trình
    const renderGiftProcess = useMemo(() => {
        return gifts && gifts.map((item, index) => {
            const point = item?.valuePromotion;
            const checkPoint = () => {
                if (customerInfo?.currentPoint < point && customerInfo?.currentPoint < item.valuePromotion) {
                    return (
                        <div
                            key={index}
                            style={{ width: `100px` }}
                            className="w-full  bg-gray-200 rounded items-center align-middle align-center flex-1"
                        >
                            <div
                                className="bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                style={{ width: "0%" }}
                            ></div>
                        </div>
                    );
                } else if (
                    customerInfo?.currentPoint > point ||
                    customerInfo?.currentPoint < item.valuePromotion
                ) {
                    return (
                        <div
                            key={index}
                            style={{ width: `100px` }}
                            className="w-full  bg-gray-200 rounded items-center align-middle align-center flex-1"
                        >
                            <div
                                className="bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                style={
                                    (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                        ? { width: `100%` }
                                        : {
                                            width: `${((customerInfo?.currentPoint - point) * 100) /
                                                (item.valuePromotion - point)
                                                }%`,
                                        }
                                }
                            ></div>
                        </div>
                    );
                }
            };
            return (
                <>
                    <div className="align-center items-center mr-2 align-middle content-center flex">
                        {checkPoint()}
                    </div>
                    <div className="flex-1 w-16 relative mr-2">
                        <div title={item.name} className="absolute top-12">
                            <Zoom>
                                <LazyLoadImage
                                    key={item.id}
                                    src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                    alt={item.name}
                                    className=" object-contain h-12"
                                />
                            </Zoom>
                        </div>

                        <div
                            title={item.name}
                            className={classNames(
                                item.valuePromotion <= customerInfo?.currentPoint
                                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                                    : "bg-rose-300 text-gray-400",
                                "w-12 h-12  mx-auto rounded-full text-lg  flex items-center "
                            )}
                        >
                            <span className="text-center w-full">{item.valuePromotion}</span>
                        </div>
                    </div>
                </>
            );
        });
    }, [customerInfo?.currentPoint, gifts]);


    // hàm render tất cả phần quà
    const renderGift = useMemo(() => {
        return gifts.map((item, index) => {
            return (
                <div
                    key={item.id}
                    className="bg-white  cursor-pointer dark:bg-gray-800 w-full shadow mx-auto rounded-xl p-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg "
                >
                    <div className="relative">
                        <div className="max-h-40 md:block hidden  w-full object-contain">
                            <LazyLoadImage
                                key={item.id}
                                src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                className="object-contain w-full"
                                alt={item.name}
                            />
                        </div>
                        <h3 className="text-center hidden sm:block h-16">{item.name}</h3>

                        <div className="md:block hidden h-full p-2 text-center">
                            <span>
                                {" "}
                                {customerInfo?.currentPoint} /{" "}
                                <span className=" font-medium">{item.valuePromotion}</span>
                            </span>

                            <div className="w-full bg-gray-100 rounded items-center align-middle align-center flex-1">
                                <div
                                    className=" bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                    style={
                                        (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                            ? { width: `100%` }
                                            : {
                                                width: `${(customerInfo?.currentPoint * 100) / item.valuePromotion
                                                    }%`,
                                            }
                                    }
                                />
                            </div>
                            <div className="text-center">
                                {(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100 ? (
                                    <>
                                        <button
                                            onClick={() => handleOpen(item)}
                                            type="button"
                                            className="border px-3 py-1 text-sm mt-2 bg-rose-600 hover:bg-red-700 text-white rounded-md"
                                        >
                                            Đổi
                                        </button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="select-none md:hidden cursor-pointer bg-white rounded-md flex flex-1 items-center p-4">
                        <div className="w-2/6">
                            <LazyLoadImage
                                key={item.id}
                                src={"https://sukien.doppelherz.vn/storage/" + item?.image}
                                alt={item.name}
                                className="object-contain h-full w-full"
                            />
                        </div>

                        <div className="flex-1 w-3/6 mr-2 ">
                            <h1 className="text-sm font-medium mb-1">{item.name}</h1>
                            <div className="text-gray-600 text-sm">
                                <div className="w-full bg-gray-300 rounded items-center align-middle align-center flex-1">
                                    <div
                                        className=" bg-rose-600 text-xs leading-none py-1 text-center text-grey-darkest rounded "
                                        style={
                                            (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                                ? { width: "100%" }
                                                : {
                                                    width: `${(customerInfo?.currentPoint * 100) / item.valuePromotion
                                                        }%`,
                                                }
                                        }
                                    />
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">
                                {customerInfo?.currentPoint}/{item.valuePromotion}
                            </span>
                        </div>
                        <div className="text-gray-600 w-14 text-xs">
                            <div className="text-center">
                                {(customerInfo?.currentPoint * 100) / item.valuePromotion >= 100 ? (
                                    <>
                                        <button
                                            onClick={() => handleOpen(item)}
                                            type="button"
                                            className={classNames(
                                                (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                                                    : "bg-rose-300",
                                                "py-1 px-2 cursor-pointer   text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                            )}
                                        >
                                            Đổi
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className={classNames(
                                            (customerInfo?.currentPoint * 100) / item.valuePromotion >= 100
                                                ? "bg-rose-600 hover:bg-rose-700 text-white"
                                                : "bg-rose-300",
                                            "py-1 px-2 cursor-pointer   text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                        )}
                                    >
                                        Đổi
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            );
        });
    }, [customerInfo?.currentPoint, gifts]);

    return (
        <>
            <Layout>
                <Toaster />
                <Header title="Nhận Thưởng" />
                {
                    isLoading ? <>
                        <div style={{ height: 500 }}></div>
                        <Loading />
                    </> : <>
                        <div className="mx-auto px-5 lg:px-14 pt-10">
                            <div className="lg:text-center mt-16">
                                <p className=" text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    ĐỔI QUÀ
                                </p>
                            </div>

                            <div className="w-full md:max-w-5xl m-auto mt-10">
                                <div className="flex justify-between">
                                    <div className="text-lg font-bold border-l-4 border-rose-600 px-3 py-1 mb-2">
                                        Điểm Của Bạn: <span className="text-red-600">{customerInfo?.currentPoint}</span>
                                    </div>
                                </div>
                                <div className="border  relative bg-white p-3 rounded-md">
                                    <div
                                        id="container-scroll"
                                        className="w-full overflow-x-scroll pb-20 scroll-style-x"
                                    >
                                        <div className="flex pb-3 ">
                                            <div className="flex-1"></div>
                                            {renderGiftProcess}
                                            <div className="flex-1"></div>
                                        </div>
                                    </div>

                                </div>
                                <i className="text-xs block lg:hidden text-gray-500 mt-2">* Vuốt sang phải để xem thêm.</i>
                                <i className="text-xs hidden lg:block text-gray-500 mt-2">* Kéo sang phải để xem thêm.</i>
                            </div>
                            <div className="mb-10 mt-5 md:max-w-5xl w-full border bg-white rounded-md p-3 m-auto ">
                                <div className="grid grid-cols-1  max-h-screen scroll-style-y overflow-y-auto gap-y-5 gap-x-6 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8 p-2 md:p-5">
                                    {renderGift}
                                </div>
                            </div>
                        </div>
                    </>
                }
                <ModalComponent isOpen={open} modalWidth={"70%"}>
                    <button
                        onClick={() => {
                            setOpen(false);
                            setCheckInfo(false);
                        }}
                        className="outline-none bg-none absolute top-2 text-rose-600 hover:text-rose-400 right-2"
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                    {checkInfo ? (
                        <>
                            <button
                                onClick={() => setCheckInfo(false)}
                                className="flex text-gray-700 hover:text-gray-600"
                            >
                                <ArrowLeftIcon className="h-6 w-6 mr-2" />
                                <span>Quay lại</span>
                            </button>
                            <div className="text-center">
                                <h2 className="text-lg font-semibold mb-2">
                                    Kiểm Tra Thông Tin
                                </h2>
                            </div>
                            <Form
                                onSubmit={changeInfo}
                                initialValues={{
                                    phone: customerInfo?.phone,
                                    email: customerInfo?.email,
                                    name: customerInfo?.name,
                                    address: customerInfo?.address,
                                }}
                                render={({ handleSubmit, form, submitting }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Field
                                            name="name"
                                            validate={composeValidators(required)}
                                        >
                                            {({ input, meta }) => (
                                                <div className="mb-3 w-full">
                                                    <TextField
                                                        {...input}
                                                        error={meta.error && meta.touched}
                                                        className="w-full"
                                                        label="Họ và Tên"
                                                        variant="outlined"
                                                        helperText={
                                                            meta.error && meta.touched && meta.error
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <Field
                                            name="email"
                                            validate={composeValidators(required)}
                                        >
                                            {({ input, meta }) => (
                                                <div className="mb-3 w-full">
                                                    <TextField
                                                        {...input}
                                                        error={meta.error && meta.touched}
                                                        className="w-full"
                                                        label="Email"
                                                        variant="outlined"
                                                        helperText={
                                                            meta.error && meta.touched && meta.error
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <Field
                                            disabled
                                            name="phone"
                                            validate={composeValidators(
                                                required,
                                                ValidPhoneNumber
                                            )}
                                        >
                                            {({ input, meta }) => (
                                                <>
                                                    <div className="mb-3 w-full">
                                                        <TextField
                                                            {...input}
                                                            type="tel"
                                                            disabled
                                                            error={meta.error && meta.touched}
                                                            className="w-full"
                                                            label="Số Điện Thoại"
                                                            variant="outlined"
                                                            helperText={
                                                                meta.error && meta.touched && meta.error
                                                            }
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </Field>
                                        <Field
                                            name="address"
                                            validate={composeValidators(required)}
                                        >
                                            {({ input, meta }) => (
                                                <div className="mb-3 w-full">
                                                    <TextField
                                                        {...input}
                                                        error={meta.error && meta.touched}
                                                        className="w-full"
                                                        label="Địa Chỉ"
                                                        variant="outlined"
                                                        helperText={
                                                            meta.error && meta.touched && meta.error
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                        <div className="text-center mb-3 text-gray-600">
                                            <span> Quý khách muốn thay đổi số điện thoại vui lòng liên hệ đến</span><br />
                                            Email: <a href="mailto:info@mastertran.com" className="text-red-500">info@mastertran.com</a>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                disabled={buttonDisable}
                                                className={classNames(
                                                    buttonDisable
                                                        ? "bg-red-400"
                                                        : "bg-red-600 hover:bg-red-700",
                                                    "px-4 py-2 rounded-md text-xs text-white "
                                                )}
                                            >
                                                Xác Nhận Đổi Thông Tin
                                            </button>
                                        </div>
                                    </form>
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <div className="text-center">
                                <h2 className="text-lg font-semibold">
                                    Bạn Có Muốn Đổi Phần Quà Này Không?
                                </h2>
                                <h3 className=" text-base font-semibold text-rose-600">
                                    {itemSelect && itemSelect.name}
                                </h3>
                                <h2 className=" text-bold font-semibold text-rose-600">
                                    {itemSelect && itemSelect.valuePromotion} Điểm
                                </h2>
                            </div>
                            <div className="flex justify-center">
                                <LazyLoadImage
                                    src={
                                        "https://sukien.doppelherz.vn/storage/" +
                                        itemSelect?.image
                                    }
                                    alt={itemSelect?.name}
                                    className="w-full h-72 object-contain"
                                />
                            </div>
                            <div>
                                {validateInfo ? (
                                    <>
                                        <h3 className=" text-lg  text-center text-red-700 mt-1 mb-2">
                                            Có một số thông tin bạn chưa điền đủ hoặc chưa hợp
                                            lệ, vui lòng kiểm tra lại.
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        <h3 className=" text-lg  text-center text-red-700 mt-1 mb-2">
                                            Vui lòng kiểm tra lại thông tin của bạn trước khi
                                            đổi quà.
                                        </h3>
                                    </>
                                )}
                            </div>

                            <div className="text-center">
                                {validateInfo ? (
                                    <>
                                        <button
                                            onClick={() => setCheckInfo(true)}
                                            type="button"
                                            className="bg-orange-500 mt-1 hover:bg-orange-700  py-2 px-3 cursor-pointer   text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                                        >
                                            Cập Nhật Thông Tin
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => setCheckInfo(true)}
                                                type="button"
                                                className="bg-orange-500 mt-1 hover:bg-orange-700 mr-3  py-2 px-3 cursor-pointer   text-white transition ease-in duration-200 text-center text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                                            >
                                                Kiểm tra thông tin
                                            </button>
                                            <button
                                                onClick={claimGift}
                                                // disabled={buttonDisable}
                                                type="button"
                                                // className={classNames(
                                                //     buttonDisable
                                                //         ? "bg-red-400"
                                                //         : "bg-red-600 hover:bg-red-700",
                                                //     "py-2 px-3 rounded-md text-sm mt-1 text-white font-semibold"
                                                // )}
                                                className="py-2 px-3 rounded-md text-sm mt-1 text-white font-semibold bg-red-600 hover:bg-red-700"
                                            >
                                                Đổi Quà
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </ModalComponent>
            </Layout>
        </>
    );
};
// Nhanthuong.getInitialProps = async (req) => {
//   const { param } = req.query;
//   var result = null;
//   var gifts = [];
//   function b64DecodeUnicode(str) {
//     return decodeURIComponent(
//       atob(str)
//         .split("")
//         .map(function (c) {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );
//   }
//   try {
//     result = await customerApi
//       .getByID(b64DecodeUnicode(param?.[0]))
//       .then((res) => {
//         return res.data;
//       });
//     gifts = await giftApi.getAll().then((res) => {
//       return res.data;
//     });
//     return {
//       customer: result ? result : null,
//       gifts: gifts ? gifts : null,
//     };
//   } catch (err) {
//     return {
//       data: null,
//     };
//   }
// };

export default Doiqua;
