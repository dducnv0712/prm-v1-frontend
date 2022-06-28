import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import { Form, Field } from "react-final-form";
import { TextField } from "@mui/material";
import customerApi from "../../api/customerApi";
import toast, { Toaster } from "react-hot-toast";
const Nguoidung = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const patternPhone = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/);
  const patternEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const required = (value) => (value ? undefined : "Vui lòng nhập thông tin");
  const ValidPhoneNumber = (value) =>
    !patternPhone.test(value) ? "Số Điện Thoại Không Hợp Lệ" : undefined;
  const emailValid = (value) =>
    patternEmail.test(value) ? undefined : "Email Không Hợp Lệ";
  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
  const fetchData = async () => {
    try {
      await customerApi.getByID(1).then((res) => {
        if (res.status === 200) {
          setCustomerInfo(res.data);
        }
      });
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  const changeInfo = async (value) => {
    var data = {
      name: value.fullName,
      phone: value.phone,
      address: value.address,
      email: value.email,
    };
    await customerApi
      .updateCustomet(1, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          fetchData();
          toast.success("Đổi Thông Tin Thành Công!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đổi Thông Tin Thất Bại!");
      });
  };
  return (
    <Layout>
      <Toaster/>
      <div className="pt-36 pb-20 max-w-7xl m-auto  m">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Thay Đổi Thông Tin
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Form
              onSubmit={changeInfo}
              initialValues={{
                phone: customerInfo && customerInfo.phone,
                fullName: customerInfo && customerInfo.name,

                email: customerInfo && customerInfo.email,
                address: customerInfo && customerInfo.address,
              }}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6">
                          <Field
                            name="fullName"
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
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <Field
                            name="phone"
                            validate={composeValidators(
                              required,
                              ValidPhoneNumber
                            )}
                          >
                            {({ input, meta }) => (
                              <div className="mb-3 w-full">
                                <TextField
                                  {...input}
                                  error={meta.error && meta.touched}
                                  className="w-full"
                                  label="Số Điện Thoại"
                                  inputProps={{
                                    type: "number",
                                    min: "0",
                                  }}
                                  variant="outlined"
                                  helperText={
                                    meta.error && meta.touched && meta.error
                                  }
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <Field
                            name="email"
                            validate={composeValidators(required, emailValid)}
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
                        </div>
                        <div className="col-span-6 sm:col-span-6">
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
                                  label="Address"
                                  variant="outlined"
                                  helperText={
                                    meta.error && meta.touched && meta.error
                                  }
                                />
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Xác Nhận
                      </button>
                    </div>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nguoidung;
