import { useState } from 'react';
import SelectTable from './components/SelectTable';
import { AnimatePresence, motion } from 'framer-motion';
import { useTableStore } from '~/store/tableState/table.state';
import DoOrder from './components/DoOrder';

const QuickOrder = () => {
  const [showTable, setShowTable] = useState(true);
  const { selectedTable } = useTableStore();

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {showTable ? (
          <motion.div
            key="select-table"
            className="w-full h-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <SelectTable setShowTable={setShowTable} />
          </motion.div>
        ) : (
          <motion.div
            key="do-order"
            className="w-full h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <DoOrder
              selectedTable={selectedTable}
              onBack={() => setShowTable(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickOrder;
