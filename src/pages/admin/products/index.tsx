import { Switch } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, useRowSelect } from 'react-table';
import ActionButtons from '../../../components/ActionButtons';
import { ReactTable } from '../../../components/ReactTable/ReactTable';
import api from '../../../services/api';

const moduleName = '/api/products';

export default function Index(): JSX.Element {
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const { data: response } = await api.get(moduleName);
    setProducts(response.data);
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
