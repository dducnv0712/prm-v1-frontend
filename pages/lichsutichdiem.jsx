import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layouts/Layout";
import Desktop from "../components/HoadonComponent/Desktop";
import Mobile from "../components/HoadonComponent/Mobile";
import Header from "../components/Layouts/Header";
import { useRouter } from "next/router";
import customerApi from "../api/customerApi";
import _ from "lodash";

const Hoadon = () => {
  // const router = useRouter();
  // React.useEffect(() => {
  //   return router.push("https://sukien.doppelherz.vn/dangky");
  // },[])

  const router = useRouter();
  const dispatch = useDispatch();

  // const [customerInfo, setCustomerInfo] = useState({});
  const [historyExchanges, setHistoryExchanges] = useState([])
  const [historyScans, setHistoryScans] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const getLocalStorageItem = (key) => {
  //     return (typeof window !== undefined || typeof window !== 'undefined')
  //       ? window.localStorage.getItem(key)
  //       : null;
  //   };

  //   const token = getLocalStorageItem('auth_token')
  //   if(!token) {
  //     router.push('/dangnhap')
  //   }
  //   console.log(token);

  // }, [router])

  const customerInfo = useSelector(state => state.auth.auth)

  useEffect(() => {
    if (_.isEmpty(customerInfo)) {
      router.push('/dangnhap')
    } else {
      // router.push('/lichsutichdiem')
    }
  }, [customerInfo, router])


  useEffect(() => {
    if (!_.isEmpty(customerInfo)) {
      const historyScans = customerApi.getHistoryScans();
      const historyExchanges = customerApi.getHistoryExchanges();
      Promise.all([historyScans, historyExchanges])
        .then((res) => {
          setIsLoading(false);
          setHistoryScans(res[0]?.data?.history.sort((a, b) => b.created_at.localeCompare(a.created_at)));
          setHistoryExchanges(res[1]?.data?.order.sort((a, b) => b.created_at.localeCompare(a.created_at)));
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err);
        })
    }
  }, [customerInfo])

  return (
    <>
      <Header title="Hóa Đơn" />
      <Layout>
        <div className="hidden md:block">
          <Desktop customerInfo={customerInfo} isLoading={isLoading} historyExchanges={historyExchanges} historyScans={historyScans} />
        </div>
        <div className="block md:hidden">
          <Mobile customerInfo={customerInfo} isLoading={isLoading} historyExchanges={historyExchanges} historyScans={historyScans} />
        </div>
      </Layout>
    </>
  );
};

export default Hoadon;