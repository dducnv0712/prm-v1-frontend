import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Form, Field } from "react-final-form";
import Link from "next/link";
import {
  TextField,
  FormControl,
} from "@mui/material";
import Header from "../components/Layouts/Header";
import { AuthAPI } from "../api/authAPI";
import { useRouter } from 'next/router'
import toast, { Toaster } from "react-hot-toast";
import { login } from "../store/actions/authActions";
import _ from 'lodash'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const pattern = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
const required = (value) => (value ? undefined : "Vui lòng nhập thông tin");
const ValidPhoneNumber = (value) =>
  !pattern.test(value) ? "Số Điện Thoại Không Hợp Lệ" : undefined;
const composeValidators =
  (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );


const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [buttonDisable, setButtonDisable] = useState(false);
  const customerInfo = useSelector(state => state.auth.auth)

  useEffect(() => {
    if (!_.isEmpty(customerInfo)) {
      router.push('/lichsutichdiem')
    }
  }, [router, customerInfo])

  const handleLogin = (data) => {
    AuthAPI.login(data)
      .then((res) => {
        if (res.data.status_code === 200) {
          window.localStorage.setItem('auth_token', res.data.access_token);
          // window.location.href = '/'
          router.back();
        }
      })
      .catch(err => {
        console.log(err);
        if(err.response.status === 422) {
          if(err.response.data.error) {
            toast.error(err.response.data.error)
          }
        }else{
          toast.error('Tài khoản hoặc mật khẩu không chính xác!')
        }
        
      });
  };

  return (

    <>
      <Header title="Đăng Nhập" />
      <Toaster toastOptions={{
        className: '',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
          fontSize: '12px'
        },
      }} />
      <section className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full lg:w-4/12  px-4 mx-auto pt-6">
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
            <h1 className="text-2xl text-center mb-3 font-bold text-gray-800">Đăng Nhập</h1>
            <div className="flex-auto px-4 lg:px-10 pt-3 pb-8">
              <Form
                onSubmit={handleLogin}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="phone"
                      validate={composeValidators(required)}
                    >
                      {({ input, meta }) => (
                        <div className="w-full mb-3">
                          <TextField
                            {...input}
                            error={meta.error && meta.touched}
                            label="Số Điện Thoại"
                            className="w-full"
                            variant="outlined"
                            helperText={
                              meta.error && meta.touched && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <Field
                      name="password"
                      validate={composeValidators(required)}
                    >
                      {({ input, meta }) => (
                        <div className="mb-2 w-full">
                          <FormControl className="w-full" variant="standard">
                            <TextField
                              {...input}
                              type="password"
                              error={meta.error && meta.touched}
                              className="w-full"
                              label="Mật Khẩu"
                              variant="outlined"
                              helperText={
                                meta.error && meta.touched && meta.error
                              }

                            />
                          </FormControl>
                        </div>
                      )}
                    </Field>
                    <div className="flex flex-wrap -mx-4 mb-6 items-center justify-end">
                      <div className="w-full lg:w-auto px-4">
                        <a
                          className="inline-block font-normal hover:underline"
                          href="#"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={submitting}
                        className={classNames(
                          buttonDisable ? "bg-red-400" : "bg-red-600",
                          "px-4 py-2 w-full rounded-md text-base text-white "
                        )}
                      >
                        Đăng nhập
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
            <div className="option-sep mb-6">hoặc</div>
            <div className="px-6 pb-8">
              <div className="text-center text-gray-600">Bạn chưa có tài khoản? <Link href={"/dangky"}><a className="font-medium text-red-500 hover:underline">Đăng ký</a></Link></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
