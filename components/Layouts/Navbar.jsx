import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

// import { AuthAPI } from "../../api/authAPI";
// import customerApi from "../../api/customerApi";
import _ from "lodash";
import { getCurrentUser, logout } from "../../store/actions/authActions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  // const [customerInfo, setCustomerInfo] = useState({});

  const router = useRouter();
  const { asPath } = router;

  // useEffect(() => {
  //   customerApi.getInfoCustomer()
  //     .then(res => {
  //       setCustomerInfo(res.data.user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [router])

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const navigation = [
    { name: "Trang Chủ", href: "/", current: asPath === "/" ? true : false },
    {
      name: "Điều Khoản Sử Dụng",
      href: "/dieukhoan",
      current: asPath === "/dieukhoan/" ? true : false,
    },
    {
      name: "Chính Sách Bảo Mật",
      href: "/baomat",
      current: asPath === "/baomat/" ? true : false,
    },
    // {
    //   name: "Lịch Sử Tích Điểm",
    //   href: "/lichsutichdiem",
    //   current: asPath === "/lichsutichdiem/" ? true : false,
    // },
    // {
    //   name: "Lịch Sử Tích Điểm",
    //   href: "https://sukien.doppelherz.vn/hoadon",
    //   current: false,
    // },
  ];
  const handleLogout = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      // AuthAPI.logout()
      //   .then(() => {
      //     router.push('/');
      //     localStorage.removeItem("auth_token");
      //   })
      //   .catch((err) => console.log(err))
      dispatch(logout(router));
    }
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white  shadow-md fixed z-50 w-full py-1 top-0"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-3 md:p-0 ">
              <div className="relative flex items-center justify-between h-20">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary-red hover:text-red-600 hover:bg-gray-100 focus:outline-none ">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 relative flex items-center justify-center sm:items-stretch lg:justify-start">
                  <Link href={"/"}>
                    <a>
                      <LazyLoadImage
                        className=" h-20 w-auto"
                        src={"/logo-nav.png"}
                        alt="Doppleherz"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden lg:block sm:ml-6">
                  <div className="flex space-x-6">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? " text-primary-red border-b-4 border-primary-red  font-medium"
                              : "text-primary-red  hover:text-red-600",
                            " py-2 ml-5 text-lg uppercase font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}

                    {!_.isEmpty(user) ? (
                      <>
                        <Link href={"/lichsutichdiem"}>
                          <a
                            className={classNames(
                              asPath === "/lichsutichdiem/"
                                ? " text-primary-red border-b-4 border-primary-red  font-medium"
                                : "text-primary-red  hover:text-red-600",
                              " py-2 ml-5 text-lg uppercase font-medium"
                            )}
                            aria-current={
                              asPath === "/lichsutichdiem/" ? "page" : undefined
                            }
                          >
                            Lịch Sử Tích Điểm
                          </a>
                        </Link>
                        <Link href={"javascript:void(0)"}>
                          <a
                           onClick={handleLogout}
                            className={classNames(
                              "text-primary-red  hover:text-red-600",
                              " py-2 text-lg uppercase font-medium"
                            )}
                            aria-current={undefined}
                          >
                            Đăng xuất
                          </a>
                        </Link>
                      </>
                    ) : (
                      <Link href={"/dangnhap"}>
                      <a
                        className={classNames(
                          asPath === "/dangnhap/"
                            ? " text-primary-red border-b-4 border-primary-red  font-medium"
                            : "text-primary-red  hover:text-red-600",
                          " py-2 ml-5 text-lg uppercase font-medium"
                        )}
                        aria-current={
                          asPath === "/dangnhap/" ? "page" : undefined
                        }
                      >
                       Tham gia ngay
                      </a>
                    </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="block border-t lg:hidden bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-red-500 text-white"
                        : "text-primary-red  hover:text-red-600",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {!_.isEmpty(user) ? (
                  <div
                    className="flex ml-0 overflow-hidden"
                    onClick={handleLogout}
                  >
                    <Disclosure.Button
                      as="a"
                      href={"/#"}
                      className={classNames(
                        "text-primary-red  hover:text-red-600",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={undefined}
                    >
                      Đăng xuất
                    </Disclosure.Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
