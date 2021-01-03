import ReactDataGrid from 'react-data-grid';
import React, { useState,useCallback } from 'react';
import { Editors, Toolbar, Data, Filters } from "react-data-grid-addons";
import Title from "./Title";
import {FaCheck, FaTimes} from "react-icons/fa";

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  fontSize: '10pt',
  margin: '30px'
};

const iconYesStyles = {
    padding: '10px',
    color: '#6ED65F'
};

const iconNoStyles = {
    padding: '10px',
    color: '#DE4B4B'
};


const { DropDownEditor } = Editors;

const paymentStatus = [
  { id: "paid", value: "paid" },
  { id: "unpaid", value: "pending payment" }
];

const PaymentStatusEditor = <DropDownEditor options={paymentStatus} />;


const defaultColumnProperties = {
    sortable: true,
    filterable: true
  };

const selectors = Data.Selectors;

const {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter
  } = Filters;

const columns = [
    { key: 'customer', name: 'CLIENT', editable: true},
    { key: 'phoneNum', name: 'PHONE', editable: true},
    { key: 'roomId', name: 'ROOM', editable: false, filterRenderer: NumericFilter},
    { key: 'time', name: 'TIME OF VISIT', editable: true},
    { key: 'bill', name: 'AMOUNT DUE', editable: true},
    { key: 'invoice', name: 'INVOICE NO', editable: true},
    { key: 'paymentStatus', name: 'PAYMENT STATUS', editor: PaymentStatusEditor, filterRenderer: AutoCompleteFilter}
  ].map(c => ({ ...c, ...defaultColumnProperties }));


const initialDataRows = [
    {customer: "Ann Sccot", phoneNum: "678-943-234", roomId: "101", time: '24.12.2020-27.12.2020', bill: "$350.23", invoice: '3525223', paymentStatus: "pending payment"},
    {customer: "Random Names", phoneNum: "678-943-234", roomId: "102",  time: '24.12.2020-27.12.2020', bill: "$250.23", invoice: '35234423', paymentStatus: "pending payment"},
    {customer: "Chiara Gibson", phoneNum: "123-456-234", roomId: "103", time: '24.12.2020-27.12.2020', bill: "$150.23", invoice: '567093', paymentStatus: "paid"},
    {customer: "Corrina Workman", phoneNum: "643-223-134", roomId: "104", time: '24.12.2020-27.12.2020', bill: "$560.23", invoice: '3525223', paymentStatus: "paid"},
    {customer: "Millie-Mae Vazquez", phoneNum: "123-876-234", roomId: "105", time: '24.12.2020-27.12.2020', bill: "$120.23", invoice: '3525223', paymentStatus: "pending payment"},
    {customer: "Matei Allison", phoneNum: "678-943-234", roomId: "106", time: '24.12.2020-27.12.2020', bill: "$350.23", invoice: '3525223', paymentStatus: "pending payment"},
    {customer: "Muna Shields", phoneNum: "678-943-234", roomId: "106", time: '24.12.2020-27.12.2020', bill: "$350.23", invoice: '3525223', paymentStatus: "pending payment"},
    {customer: "Zofia Duke", phoneNum: "678-943-234", roomId: "108", time: '24.12.2020-27.12.2020',  bill: "$350.23", invoice: '3525223', paymentStatus: "pending payment"},
    {customer: "Tianna Lindsey", phoneNum: "678-943-234", roomId: "201", time: '24.12.2020-27.12.2020', bill: "$120.23", invoice: '3525223', paymentStatus: "paid"},
    {customer: "Huda Whiteley", phoneNum: "678-943-234", roomId: "202", time: '24.12.2020-27.12.2020', bill: "$320.23", invoice: '3525223', paymentStatus: "paid"},
    {customer: "Syed Irwin", phoneNum: "678-943-234", roomId: "203", time: '24.12.2020-27.12.2020', bill: "$250.23", invoice: '3525223', paymentStatus: "paid"},
  ];


const sortRows = (_initialRows, sortColumn, sortDirection) => _rows => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === 'NONE' ? _initialRows : [..._rows].sort(comparer);
};

  
const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getValidFilterValues(rows, columnId) {
    return rows
      .map(r => r[columnId])
      .filter((item, i, a) => {
        return i === a.indexOf(item);
      });
  }
  
function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
}





const paymentPaidStatusActions = [
    {
      icon: <div style={iconYesStyles}> <FaCheck /></div>,
      callback: () => {
        alert("The entire amount due has been paid.");
      }
    }  
];

const paymentUnPaidStatusActions = [
    {
      icon: <div style={iconNoStyles}> <FaTimes /></div>,
      callback: () => {
        alert("The customer has not paid for the stay in hotel yet.");
      }
    }  
];


function getCellActions(column, row) {
    const cellPaidActions = {
      paymentStatus: paymentPaidStatusActions
    };
    const cellUnPaidActions = {
        paymentStatus: paymentUnPaidStatusActions
    };
    return row.paymentStatus==="paid" ? cellPaidActions[column.key] : cellUnPaidActions[column.key];
}


  const Payment = ({ initialData }) => {
   
    const [rows, setRows] = useState(initialData);
    const [filters, setFilters] = useState({});
    const [editedRows, setEditedRows] = useState(rows);

    const onGridRowsUpdated = useCallback(({ fromRow, toRow, updated }) => {
      setEditedRows((rows) => {
        const withEdited = [...rows];
        for (let i = fromRow; i <= toRow; i++) {
          withEdited[i] = { ...withEdited[i], ...updated };
        }
        return withEdited;
      });
    }, []);

    
    const filteredRows = getRows(editedRows, filters);


    return (
    <section className="bgComponent">
        <Title title="Current Payments"/>
        <div className="component" style={styles}>
            <ReactDataGrid className="payments"
                columns={columns}
                rowGetter={i => filteredRows[i]}
                rowsCount={filteredRows.length}
                minHeight={480}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={filter => setFilters(handleFilterChange(filter))}
                onClearFilters={() => setFilters({})}

                
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}

                onGridSort={(sortColumn, sortDirection) => setRows(sortRows(initialData, sortColumn, sortDirection))}
                getCellActions={getCellActions}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}
            />
        </div>
    </section>
    );
  };
  

  const PaymentGrid = () => {
    const gridColumns = columns.map(column => ({ ...column, ...defaultColumnProperties }));
    return <Payment columns={gridColumns} initialData={initialDataRows} />;
  };
  
  export default PaymentGrid;

