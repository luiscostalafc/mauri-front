import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ReactTable } from '../../../components/ReactTable/ReactTable';
import api from '../../../services/api';

const moduleName = '/api/products';

export default function Index(): JSX.Element {
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await api.get(moduleName);
    console.log({ data });
    setProducts(data);
  }, []);

  useEffect(() => {
    async function getData() {
      fetchData();
    }
    getData();
  }, []);

  return (
    <div>{products.length ? <ReactTable products={products} /> : null}</div>
  );
}
