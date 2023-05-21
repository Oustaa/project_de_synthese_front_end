import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = ({ url, method }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await axios({ url, method });
    }
  }, [url]);

  return {};
};

export default useFetch;
