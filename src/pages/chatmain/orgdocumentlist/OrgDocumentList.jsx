import React, { useState, useEffect } from 'react';
import Styles from './OrgDocument.module.css';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import frame from '../../../asset/AmChatSuperAdmin/plus-sm.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import editIcon from '../../../asset/AmChatSuperAdmin/pencil-alt.png';
import deleteIcon from '../../../asset/AmChatSuperAdmin/Frame 2302.png';
import { Link } from 'react-router-dom';
import Search from '../../../components/common/search/Search';
import SerchImages from '../../../asset/AmChatSuperAdmin/Group2305.png';
import Select from '@mui/material/Select';
import { FormControl, MenuItem } from '@mui/material';
import { setUser, selectUser } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as constants from '../../../constants/Constant';
import axios from 'axios';
import { toast } from 'react-toastify';
import NotifyMessage from '../../../components/common/toastMessages/NotifyMessage';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
// import Pagination from "@mui/material/Pagination"; // Import MUI Pagination
import OrganizationAdminHeader from '../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader';
import Skeleton from '@mui/material/Skeleton';
import { Pagination, Popconfirm, message } from 'antd';
import PageLoader from '../../../components/loader/loader';

function OrgDocumentList(props) {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();
  console.log('user props----->', props);
  const navigationRoute = props.navigationRoute;
  console.log('navigationRoute---->', navigationRoute);

  const searchStyles = {
    width: '300px',
    height: '45px',
    borderRadius: '42px',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#EEF2FF',
    display: 'flex',
    alignItems: 'center',
    marginRight: '18px',
  };

  // const [filters, setFilters] = useState({
  //   page: 0,
  //   size: "",
  //   sortField: "createdAt",
  //   sortDirection: "desc",
  //   email: "",
  //   active: true,
  //   name:""
  // });

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [firstName, setFirstName] = useState('');
  const profileSrc = localStorage.getItem('profileImage');
  const [fullName, setFullName] = useState('');
  const [tableloading, setTableLoading] = useState(false);

  const [pageInfo, setPageInfo] = useState({
    pageSize: 10,
    page: 0,
    totalCount: null,
    totalPages: null,
  });

  const [filters, setFilters] = useState({
    page: page,
    size: pageInfo?.pageSize,
    sortField: 'createdAt',
    sortDirection: 'desc',
    email: '',
    active: true,
    name: '',
  });

  console.log(' rows ', rows);

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    setFullName(storedFullName);
  }, []);

  // const filteredRows = rows.filter(
  //   (row) =>
  //     (row.firstName &&
  //       row.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (row.lastName &&
  //       row.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (row.email && row.email.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery?.length >= 3) {
      setLoading(true);
      fetchUserList();
    } else if (searchQuery?.length === 0) {
      setLoading(true);
      fetchUserList();
    }
  }, [searchQuery, order]);

  // useEffect(() => {
  //   setFilters({ ...filters, name: searchQuery,page: page  });
  //  }, [searchQuery , page]);

  const fetchUserList = async (page = 0) => {
    try {
      console.log('filters', filters);
      const queryParams = new URLSearchParams({
        page: page,
        size: pageInfo?.pageSize,
        sortField: orderBy,
        sortDirection: order,
        email: '',
        active: true,
        name: searchQuery,
      });
      setTableLoading(true);
      const response = await fetch(
        `${constants.BASE_API_URL}${constants.USER_LIST_ENDPOINT}?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setTableLoading(false);
      if (!response.ok) {
        if (response.status === 404) {
          console.log('400 error ');
        } else if (response.status === 405) {
          console.log('response 405');
        } else {
          console.log('response 405');
        }
        return;
      }
      const responseData = await response.json();
      console.log('users-------->', responseData);
      setPageInfo({
        ...pageInfo,
        pageSize: responseData?.pageSize,
        page: responseData?.page,
        totalCount: responseData?.totalCount,
        totalPages: responseData?.totalPages,
      });
      const users = responseData.data.users;
      setRows(users);
      setLoading(false);
    } catch (error) {
      setTableLoading(false);
      setLoading(false);
      navigate('/maintenance');
    }
  };

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      setTableLoading(true);
      await axios.delete(`${constants.BASE_API_URL}/user/disable/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setRows(rows.filter((row) => row.id !== userId));
      setTableLoading(false);
      toast.success('User deleted successfully');
    } catch (error) {
      setTableLoading(false);
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleStatusChange = (event, userId) => {
    const updatedRows = rows.map((row) =>
      row.id === userId ? { ...row, status: event.target.value } : row
    );
  };

  const handleCheckboxClick = async (userId, isChecked) => {
    try {
      let roleId = isChecked ? '19' : '17';
      await axios.put(
        `${constants.BASE_API_URL}/user/role`,
        {
          userId: userId,
          roleId: roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the 'active' property of the row in the local state
      setRows(
        rows.map((row) =>
          row.id === userId ? { ...row, active: isChecked } : row
        )
      );

      // Show different messages based on the roleId
      if (roleId === '17') {
        toast.success('Admin role assigned successfully');
      } else if (roleId === '19') {
        toast.success('User role assigned successfully');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Error updating role');
    }
  };

  console.log('pageInfo---->', pageInfo);
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName={'Your Organisation User'}
            name={fullName || ''}
            profileImageSrc={localStorage.getItem('userImageUrl')}
            customStyle={{
              containerStyle: {
                display: 'flex',
                borderRadius: '8px',
              },
              imageStyle: {
                width: '44px',
                height: '44px',
              },
              textStyle: {
                color: 'black',
                fontWeight: '600',
                fontSize: '18px',
              },
            }}
            navigationRoute={navigationRoute}
          />
        </div>
        <div className={Styles.bannerBtn}>
          <div className={Styles.OrganizationListFilterSerchBox}>
            <div className={Styles.OrganizationListFilterSerchBox}>
              <Search
                name={'Search name here.'}
                styles={searchStyles}
                searchImage={SerchImages}
                imageHeight={'46px'}
                imageMarginLeft={20}
                handleChangeSearch={handleSearchChange}
                searchValue={searchQuery}
              />
            </div>
          </div>
          <div className={Styles.bannerButton}>
            <Link to="/user" style={{ textDecoration: 'none' }}>
              <GeneralButton
                name={'Add User'}
                type={'submit'}
                color={'#f8fafc'}
                borderRadius={'30px'}
                backgroundColor={'#6366f1'}
                icons={frame}
                width={'158px'}
                height={'48px'}
              />
            </Link>
          </div>
        </div>
        <div className={Styles.OrganizationListTable}>
          <Paper>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
              >
                <TableHead style={{ borderBottom: '2px solid #0F172A' }}>
                  <TableRow>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={false}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <TableSortLabel
                        onClick={(e) => handleRequestSort(e, 'createdAt')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'email'}
                        direction={orderBy === 'email' ? order : 'asc'}
                        // onClick={(e) => handleRequestSort(e, "email")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Email
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'lastChat'}
                        direction={orderBy === 'lastChat' ? order : 'asc'}
                        // onClick={(e) => handleRequestSort(e, "lastChat")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Last Chat
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'totalChat'}
                        direction={orderBy === 'totalChat' ? order : 'asc'}
                        // onClick={(e) => handleRequestSort(e, "totalChat")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Total Chat
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        // onClick={(e) => handleRequestSort(e, "status")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Status
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {rows.length > 0 ? (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow key={row.id}>
                            {/* <TableCell padding="checkbox">
                                <Checkbox />
                              </TableCell> */}
                            <TableCell component="th" scope="row">
                              <span className={Styles.tableText}>
                                {' '}
                                {`${row.firstName} ${row.lastName}`}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className={Styles.emailWithCheckbox}>
                                <span
                                  style={{ marginTop: '10px' }}
                                  className={Styles.tableText}
                                >
                                  {row.email}
                                </span>
                                <Checkbox
                                  inputProps={{
                                    'aria-labelledby': row.firstName,
                                  }}
                                  onClick={() =>
                                    handleCheckboxClick(row.id, !row.active)
                                  }
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={Styles.tableText}>
                                {row.createdAt}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={Styles.tableText}>
                                {' '}
                                {row.updatedAt}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span>{row.active ? 'Active' : 'Inactive'}</span>
                              {/* <FormControl style={{ width: '110px' }}>
                                  <Select
                                    style={{
                                      border: 'none',
                                      borderRadius: 'none',
                                    }}
                                    value={row.active ? 'Active' : 'Inactive'}
                                    onChange={(e) =>
                                      handleStatusChange(e, row.id)
                                    }
                                  >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">
                                      Inactive
                                    </MenuItem>
                                  </Select>
                                </FormControl>  */}
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(row.id)}
                              >
                                <img src={editIcon} alt="Edit" />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  //  handleDelete(row.id)}}
                                }}
                              >
                                {row?.active === true && (
                                  <Popconfirm
                                    key={row?.id || 'amchat'}
                                    title="Am Chat"
                                    description="Do you Really want to delete this user"
                                    onConfirm={() => {
                                      handleDelete(row.id);
                                      // message.success('Click on Yes');
                                    }}
                                    onCancel={() => {
                                      // message.error('Click on No');
                                    }}
                                    okText="Submit"
                                    cancelText="Close"
                                  >
                                    <img src={deleteIcon} alt="Delete" />
                                  </Popconfirm>
                                )}

                                {/* <img src={deleteIcon} alt="Delete" />   */}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={7} />
                      </TableRow>
                    )}
                  </>
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: '16px',
                gap: '20px',
              }}
            >
              <div>Total {pageInfo?.totalCount} items</div>
              {/* <Pagination
                count={Math.ceil(rows.length / rowsPerPage)}
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
                shape="rounded"
              /> */}

              <Pagination
                defaultCurrent={1}
                total={pageInfo?.totalPages * 10}
                itemRender={itemRender}
                current={pageInfo?.page + 1}
                onChange={(newPage) => {
                  setPageInfo({ ...pageInfo, page: newPage - 1 });
                  fetchUserList(newPage - 1);
                }}
              />
            </div>
          </Paper>
        </div>
        <NotifyMessage messageHandler={toast.dismiss} />
      </div>
    </div>
  );
}

export default OrgDocumentList;
