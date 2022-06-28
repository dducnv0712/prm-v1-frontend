import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useFetch = (props) => {
    const { url, method, body, params } = props;

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isSubscribe = true;

        (async function fetchData() {
            try {
                const response = await axios({
                    method: method,
                    url: url,
                    data: body,
                    params: params
                });
                if (isSubscribe && response.status === 200) {
                    setData(response.data || null);
                }
            } catch (error) {
                console.log(error);
            } finally {
                isSubscribe && setIsLoading(false);
            }
        })();

        return () => (isSubscribe = false);
    }, [body, method, params, url]);

    return { isLoading, data };
}

export default useFetch