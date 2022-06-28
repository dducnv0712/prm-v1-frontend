import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Form, Field } from "react-final-form";
import Header from "../components/Layouts/Header";
import Link from "next/link";
import {
  TextField,
  IconButton,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthAPI } from "../api/authAPI";
import toast, { Toaster } from "react-hot-toast";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Register = () => {
  const router = useRouter();
  const pattern = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
  const patternPassword = new RegExp(/^(.{6})$/);
  const patternEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const required = (value) => (value ? undefined : "Vui lòng nhập thông tin");
  const passwordValid = (value) =>
    patternPassword.test(value)
      ? undefined
      : "Mật Khẩu Không Hợp Lệ, Mật Khẩu Phải Có Ít Nhất 6 Ký Tự";
  const emailValid = (value) =>
    patternEmail.test(value) ? undefined : "Email Không Hợp Lệ";
  const ValidPhoneNumber = (value) =>
    !pattern.test(value) ? "Số Điện Thoại Không Hợp Lệ" : undefined;
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );

  // useEffect(() => {
  //   const getLocalStorageItem = (key) => {
  //     return (typeof window !== undefined || typeof window !== 'undefined')
  //       ? window.localStorage.getItem(key)
  //       : null;
  //   };
  //   if (getLocalStorageItem('auth_token')) {
  //     router.push('/')
  //   }
  // }, [router])

  const handleRegister = (data) => {
    if (data.password !== data.password_confirmation) {
      toast.error("Mật khẩu xác nhận không khớp!");
    }
    AuthAPI.register(data)
      .then((res) => {
        if (res.data.status_code === 200) {
          // axiosClient({
          //   method: 'POST',
          //   url: 'https://sukien.doppelherz.vn/api/login',
          //   data: data
          // })
          //   .then((res) => {
          //     if (res.data.status_code === 200) {
          //       window.localStorage.setItem('auth_token', res.data.access_token);
          //       router.push('/lichsutichdiem/')
          //     }
          //   })
          //   .catch(err => console.log(err));
          router.push("/dangnhap/");
        } else if (res.data.status === 400) {
          console.log(res.data.status);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.error.email) {
            toast.error(err.response.data.error.email[0]);
          } else if (err.response.data.error.phone) {
            toast.error(err.response.data.error.phone[0]);
          }
        } else {
          toast.error("Đăng ký không thành công, vui lòng thử lại!");
        }
        // console.log(err);
      });
  };
  return (
    <>
      <Header title="Đăng Ký" />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
            fontSize: "12px",
          },
        }}
      />
      <section className="min-h-screen flex p- justify-center items-center bg-gray-100">
        <div className="w-full lg:w-5/12  px-4 mx-auto pt-6">
          <div className="relative flex flex-col bg-white min-w-0 break-words w-full  shadow-lg rounded-lg  border-0">
            <div className="rounded-t mb-0 px-4 py-4">
              <div className="w-full text-center">
                <Link href={"/"}>
                  <a>
                    <Image
                      src={"/logo-nav.png"}
                      width={100}
                      height={"100%"}
                      alt="Logo"
                    />
                  </a>
                </Link>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <h1 className="text-2xl text-center mb-3 font-bold text-gray-800">
              Đăng Ký
            </h1>

            <div className="flex-auto px-4 lg:px-10 py-3">
              <Form
                onSubmit={handleRegister}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 lg:grid-cols-2">
                      <Field name="name" validate={composeValidators(required)}>
                        {({ input, meta }) => (
                          <div className=" w-full">
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
                        name="phone"
                        validate={composeValidators(required, ValidPhoneNumber)}
                      >
                        {({ input, meta }) => (
                          <div className="w-full">
                            <TextField
                              {...input}
                              error={meta.error && meta.touched}
                              className="w-full"
                              label="Số Điện Thoại"
                              variant="outlined"
                              helperText={
                                meta.error && meta.touched && meta.error
                              }
                            />
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="grid grid-cols-6 gap-6 mb-6">
                      <div className="col-span-6 md:col-span-6">
                        <Field
                          name="email"
                          validate={composeValidators(required, emailValid)}
                        >
                          {({ input, meta }) => (
                            <div className="w-full">
                              <TextField
                                {...input}
                                error={meta.error && meta.touched}
                                className="w-full"
                                label="Email"
                                type="email"
                                variant="outlined"
                                helperText={
                                  meta.error && meta.touched && meta.error
                                }
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      {/* <div className="col-span-6 md:col-span-4">
                        <Field
                          name="address"
                          validate={composeValidators(required)}
                        >
                          {({ input, meta }) => (
                            <div className="w-full">
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
                      </div> */}
                    </div>

                    <Field
                      name="password"
                      validate={composeValidators(required, passwordValid)}
                    >
                      {({ input, meta }) => (
                        <div className="mb-3  w-full">
                          <FormControl className="w-full" variant="standard">
                            <TextField
                              {...input}
                              type={showPassword ? "text" : "password"}
                              error={meta.error && meta.touched}
                              className="w-full"
                              label="Mật Khẩu"
                              variant="outlined"
                              helperText={
                                meta.error && meta.touched && meta.error
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      onMouseDown={(e) => e.preventDefault()}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </div>
                      )}
                    </Field>
                    <Field
                      name="password_confirmation"
                      validate={composeValidators(required, passwordValid)}
                    >
                      {({ input, meta }) => (
                        <div className="mb-3 mt-6 w-full">
                          <FormControl className="w-full" variant="standard">
                            <TextField
                              {...input}
                              type={showPassword ? "text" : "password"}
                              error={meta.error && meta.touched}
                              className="w-full"
                              label="Xác nhận mật khẩu"
                              variant="outlined"
                              helperText={
                                meta.error && meta.touched && meta.error
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      onMouseDown={(e) => e.preventDefault()}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </FormControl>
                        </div>
                      )}
                    </Field>
                    <div className="flex items-center mb-6">
                      <Field
                        name="sauces"
                        component="input"
                        type="checkbox"
                        value="ketchup"
                        checked
                      />
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-700"
                        >
                          Tôi đồng ý với{" "}
                          <Link href={`/baomat`}>
                            <a className="text-red-500 underline">
                              điều khoản và chính sách bảo mật
                            </a>
                          </Link>
                        </label>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={classNames(
                          buttonDisable ? "bg-red-400" : "bg-red-600",
                          "px-4 py-2 rounded-md text-base w-full text-white "
                        )}
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
            <div className="option-sep mb-4 mt-4">hoặc</div>
            <div className="px-6 pb-4">
              <div className="text-center text-base text-gray-600">
                Bạn đã có tài khoản?{" "}
                <Link href={"/dangnhap"}>
                  <a className="font-medium text-red-500 hover:underline">
                    Đăng nhập
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
