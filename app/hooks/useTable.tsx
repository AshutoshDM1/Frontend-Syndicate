import { useQuery } from '@tanstack/react-query';
import { GetTables } from '~/services/table.service';
import { useTableStore } from '~/store/tableState/table.state';
import { useEffect } from 'react';

const useTable = () => {
  const { tables, setTables } = useTableStore();
  const { selectedTable, setSelectedTable } = useTableStore();
  const { isPending, isError, isSuccess, data, refetch, error } = useQuery({
    queryKey: ['tables'],
    queryFn: GetTables,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setTables(data.data.tables);
    }
  }, [isSuccess, data, refetch]);

  return { tables, selectedTable, setSelectedTable, isPending, isError, isSuccess, refetch, error };
};

export default useTable;
