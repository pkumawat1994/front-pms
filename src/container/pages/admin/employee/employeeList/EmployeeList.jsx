// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { getEmployeeList } from '../../../../../redux/allSlices/employeeService';
// import { DataGrid } from "@mui/x-data-grid";
// const EmployeeList = () => {
//    let dispatch= useDispatch();
//     useEffect(()=>{
// dispatch(getEmployeeList())
//     },[])

//     const columns = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'firstName', headerName: 'First name', width: 130 },
//         { field: 'lastName', headerName: 'Last name', width: 130 },
//         {
//           field: 'age',
//           headerName: 'Age',
//           type: 'number',
//           width: 90,
//         },
//         {
//           field: 'fullName',
//           headerName: 'Full name',
//           description: 'This column has a value getter and is not sortable.',
//           sortable: false,
//           width: 160,
//           valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//         },
//       ];

//     const rows = [
//         { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//         { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//         { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//         { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//         { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//         { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//         { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//         { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//         { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//       ];
//   return (
//     <>

//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}

//       />
//     </div>

//     </>
//   )
// }

// export default EmployeeList

// import React, { useEffect } from 'react'
// import ComponentIndex from '../../../../components/ComponentIndex'
// import { useDispatch } from 'react-redux'
// import { getTaskList } from '../../../../redux';

import { DataGrid } from "@mui/x-data-grid";

// const TaskList = () => {
//   const [taskListData,setTaskListData]=useState([])
// let dispatch=useDispatch();

//     useEffect(()=>{
//         dispatch(getTaskList()).then((res)=>setTaskListData(res.payload.data.data))
//     },[])

//   return (
//     <div>TaskList </div>
//   )
// }

// export default TaskList

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import {
  deleteEmployee,
  getEmployeeList,
  searchEmployee,
} from "../../../../../redux/allSlices/employeeService";
import { Box, Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import "./EmployeeList.css";
import ViewModel from "../../../../../components/common/viewModel/ViewModel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "use-debounce";

const EmployeeList = () => {
  const [employeeListData, setEmployeeListData] = useState([]);
  const [employeeDetail, setEmployeedetail] = useState(false);
  const [searchData, setSearchData] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue] = useDebounce(inputValue, 1000);
  console.log(debouncedInputValue, "debouncedInputValue");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeeList()).then((res) =>
      setEmployeeListData(res?.payload?.data?.data)
    );
  }, []);

  console.log(employeeListData, "employeeListData");
  const handleDelete = (id) => {
    alert(id);
    dispatch(deleteEmployee({ data: id, navigate })).then((res) => {
      console.log(res, "deleteEmployee-response");
      if (res?.payload?.status == 200) {
        toast.error(res?.payload?.data?.message);
        dispatch(getEmployeeList()).then((res) =>
          setEmployeeListData(res?.payload?.data?.data)
        );
      }
    });
  };

  // const handleLogoutClick=()=>{
  //   dispatch(logOut());
  // }
  const handledEmployeeDetail = (data) => {
    handleOpen();
    setEmployeedetail(data);

    console.log(data, "viewSIngleData");
    //   navigate(adminRoutes.TASK_DETAIL,{state:data});
  };
  const handleEdit = (data) => {
    navigate("/admin/dashbaord/add-employee", { state: data });
  };

  const dataWithSerialNumbers =
    employeeListData &&
    employeeListData?.map((task, index) => ({
      ...task,
      serialNumber: index + 1,
    }));
  const columns = [
    { field: "serialNumber", headerName: "ID", width: 70 },
    { field: "name", headerName: "NAME", width: 130 },
    { field: "email", headerName: "EMAIL", width: 150 },

    {
      field: "actions",
      headerName: "EMPLOYEE ACTION",
      width: 230,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => handledEmployeeDetail(params?.row)}
              // onClick={handleOpen}
              color="success"
              variant="contained"
              fullWidth
              type="submit"
            >
              <VisibilityIcon />
            </Button>
            &nbsp;&nbsp;
            <Button
              onClick={() => handleDelete(params?.row?._id)}
              color="error"
              variant="contained"
              fullWidth
              type="submit"
            >
              DELETE
            </Button>
            &nbsp;&nbsp;{" "}
            <Button
              onClick={() => handleEdit(params?.row)}
              color="error"
              variant="contained"
              fullWidth
              type="submit"
            >
              EDIT
            </Button>
          </>
        );
      },
    },
  ];

  const getRowId = (row) => row?._id;

  const handleNavigate = () => {
    navigate("/admin/dashbaord/add-employee");
  };
  const handleChange = (e) => {
    console.log(typeof e.target.value, 46);

    setSearchData(e.target.value);
  };
  useEffect(() => {
    dispatch(searchEmployee(searchData)).then((res) => {
      // console.log(res?.payload?.data?.user,555);
      if (res.payload.status == 200) {
        setEmployeeListData(res?.payload?.data?.user);
      }
    });
  }, [searchData]);
  return (
    <>
      <Box className="buton-box">
        <Box>
          <TextField
            label="Search"
            onChange={(e) => handleChange(e)}
            InputProps={{
              // ...params.InputProps,
              // type: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon sx={{ marginRight: "10px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            style={{ width: 550 }}
          />
        </Box>
        <Box>
          <Button onClick={handleNavigate} variant="contained">
            Add Employee
          </Button>
        </Box>
      </Box>
      <Box className="table-box">
        <DataGrid
          getRowId={getRowId}
          rows={dataWithSerialNumbers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
      <ViewModel
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        employeeData={employeeDetail}
      />
    </>
  );
};

export default EmployeeList;
