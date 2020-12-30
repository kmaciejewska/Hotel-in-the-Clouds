
import ReactDataGrid from 'react-data-grid';
import React, { useState, useCallback } from 'react';
import { Editors, Toolbar, Data, Filters } from "react-data-grid-addons";
import Title from "./Title";

import {FaCheck, FaTimes, FaBreadSlice, FaRegFilePowerpoint} from "react-icons/fa";
import {GiVacuumCleaner} from "react-icons/gi";
import {MdDoNotDisturb} from "react-icons/md";

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  fontSize: '12pt',
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

const iconVacuumStyles = {
    padding: '10px',
    color: '#2046CC'
}

const iconCookStyles = {
    padding: '10px',
    color: '#D5D0AD'
}

const iconDisturbStyles = {
    padding: '10px',
    color: '#FFB83D'
}

const { DropDownEditor } = Editors;

const cleanStatus = [
  { id: "clean", value: "Clean" },
  { id: "dirty", value: "Dirty" },
  { id: "cleanProgress", value: "Cleaning in progress"},
  { id: "notDisturb", value: "Do not disturb"}
];

const CleanStatusEditor = <DropDownEditor options={cleanStatus} />;


const roomStatus = [
    { id: "occupied", value: "Occupied" },
    { id: "reserved", value: "Reserved for today" },
    { id: "vacant", value: "Vacant"}
  ];
  
 const RoomStatusEditor = <DropDownEditor options={roomStatus} />;


const defaultColumnProperties = {
   
    filterable: true,
    sortable: true
  };

const selectors = Data.Selectors;

const {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter
  } = Filters;


  const columns = [
    { key: 'roomId', name: 'ROOM', editable: false, filterRenderer: MultiSelectFilter},
    { key: 'status', name: 'STATUS', editable: true, editor: RoomStatusEditor, filterRenderer: MultiSelectFilter},
    { key: 'clean', name: 'CLEANLINESS', editable: true, editor: CleanStatusEditor, filterRenderer: MultiSelectFilter},
    { key: 'food', name: 'RESTAURANT', editable: true, filterRenderer: SingleSelectFilter},
  ].map(c => ({ ...c, ...defaultColumnProperties }));

  const initialDataRows = [
    {roomId: "101", status: "Occupied", clean: "Do not disturb", food: "breakfast, lunch & dinner"},
    {roomId: "102", status: "Vacant", clean: "Dirty", food: "-"},
    {roomId: "103", status: "Reserved for today", clean: "Dirty", food: "breakfast, lunch & dinner"},
    {roomId: "104", status: "Vacant", clean: "Clean", food: "-"},
    {roomId: "105", status: "Occupied", clean: "Clean", food: "breakfast & dinner"},
    {roomId: "106", status: "Vacant", clean: "Dirty", food: "-"},
    {roomId: "107", status: "Reserved for today", clean: "Cleaning in progress", food: "breakfast"},
    {roomId: "108", status: "Occupied", clean: "Dirty", food: "breakfast"},
    {roomId: "201", status: "Vacant", clean: "Dirty", food: "-"},
    {roomId: "202", status: "Occupied", clean: "Do not disturb", food: "breakfast & dinner"},
    {roomId: "203", status: "Vacant", clean: "Clean", food: "-"},
  ];

  const RowRenderer = ({ renderBaseRow, ...props }) => {
    const color = "black";
    return <div style={{ color }}>{renderBaseRow(props)}</div>;
};

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


const cleanStatusActions = [
    {
      icon: <div style={iconYesStyles}> <FaCheck /></div>
    }  
];

const dirtyStatusActions = [
    {
      icon: <div style={iconNoStyles}> <FaTimes /></div>
    }  
];

const cleanProgressStatusActions = [
    {
      icon: <div style={iconVacuumStyles}> <GiVacuumCleaner /></div>
    }  
];

const notDisturbStatusActions = [
    {
        icon: <div style={iconDisturbStyles}> <MdDoNotDisturb/></div>
    }
];
const orderedFoodActions = [
    {
        icon: <div style={iconCookStyles}> <FaBreadSlice /></div>
    }
];

function getCellActions(column, row) {
    const cellDirtyActions = {
        clean: dirtyStatusActions
    };
    const cellCleanActions = {
        clean: cleanStatusActions
    };

    const cellProgressActions = {
        clean: cleanProgressStatusActions
    };

    const cellDisturbActions = {
        clean: notDisturbStatusActions
    };

    const cellRestaurantActions = {
        food: orderedFoodActions
    };

    if (row.clean === "Dirty")
        return cellDirtyActions[column.key];
    if (row.clean === "Clean")
        return cellCleanActions[column.key];
    if (row.clean === "Cleaning in progress")
        return cellProgressActions[column.key];
    if (row.clean === "Do not disturb")
        return cellDisturbActions[column.key];
    return null;
}


const RoomsStatus = ({ initialData }) => {
   
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
        <Title title="Room status"/>
        <div className="component" style={styles}>
            <ReactDataGrid
                columns={columns}
                rowGetter={i => filteredRows[i]}
                rowsCount={filteredRows.length}
                minHeight={475}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={filter => setFilters(handleFilterChange(filter))}
                onClearFilters={() => setFilters({})}               
                getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
                onGridSort={(sortColumn, sortDirection) => setRows(sortRows(initialData, sortColumn, sortDirection))}
                onGridRowsUpdated={onGridRowsUpdated}
                enableCellSelect={true}
                rowRenderer={RowRenderer}
                getCellActions={getCellActions}
            />
        </div>
    </section>
    );
  };
  

  const HotelRoomsStatus = () => {
    const gridColumns = columns.map(column => ({ ...column, ...defaultColumnProperties }));
    return <RoomsStatus columns={gridColumns} initialData={initialDataRows} />;
  };
  
  export default HotelRoomsStatus;

