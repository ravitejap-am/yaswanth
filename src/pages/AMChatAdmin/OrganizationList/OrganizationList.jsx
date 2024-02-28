import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Styles from './Organization.module.css';
import profile from '../../../asset/AmChatSuperAdmin/profile.png';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import frame from '../../../asset/AmChatSuperAdmin/plus-sm.png';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import editIcon from '../../../asset/AmChatSuperAdmin/pencil-alt.png';
import deleteIcon from '../../../asset/AmChatSuperAdmin/Frame 2302.png';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../../components/common/search/Search';
import IconButton from '@mui/material/IconButton';
import SerchImages from '../../../asset/AmChatSuperAdmin/Group2305.png';
import { Pagination } from 'antd';
// import "antd/dist/antd.css";

import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  setOrganisationStatus,
  setOrganisationData,
} from '../../../store/authSlice';
import { BASE_API_URL, BASE_ORG_API_URL } from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import CircularProgress from '@mui/material/CircularProgress';
import SuperAdminHeader from '../SuperAdminHeader/SuperAdminHeader';
import Skeleton from '@mui/material/Skeleton';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

function OrganizationList() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const jwt = user.userToken;
  const [rows, setRows] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    page: 0,
    totalCount: null,
    totalPages: null,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [tableloading, setTableLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
  }, []);

  useEffect(() => {
    fetchlist();
  }, [jwt, order, searchValue]);

  const fetchlist = async (page = 0) => {
    // setLoading(true);

    setTableLoading(true);
    try {
      const documentUrl = `${BASE_ORG_API_URL}`;
      const response = await axios.get(documentUrl, {
        params: {
          page: page,
          size: pageInfo?.pageSize,
          sortField: orderBy,
          sortDirection: order,
          organisationName: searchValue,
          isActive: 1,
          version: '',
          // fileSize: "",
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error('Failed to fetch documents');
      }

      console.log('----response', response);
      if (
        response?.data?.message == 'list is empty' ||
        response?.data?.data == null ||
        response?.data?.data.length == 0
      ) {
        setPageInfo({
          ...pageInfo,
          pageSize: 0,
          page: 0,
          totalCount: 0,
          totalPages: 0,
        });
        setRows([]);
        return;
      }
      let organisationData = response?.data?.data;
      let responseData = response?.data;
      setResponseData(organisationData);

      setPageInfo({
        ...pageInfo,
        pageSize: responseData?.pageSize,
        page: responseData?.page,
        totalCount: responseData?.totalCount,
        totalPages: responseData?.totalPages,
      });
      console.log('-----organisationData', organisationData);
      let allOrgansisation = [];
      organisationData?.map((org) => {
        let individuvalOrg = {
          id: org.id,
          name: org.name,
          address: org.address?.address1,
          contactPerson: `${
            org?.contact?.firstName ? org?.contact?.firstName : ''
          }  ${org?.contact?.lastName ? org?.contact?.lastName : ''}`,

          plans: 'Basic',
          status: org?.active ? 'Active' : 'Inactive',
        };
        allOrgansisation.push(individuvalOrg);
      });
      // setLoading(false);
      setRows(allOrgansisation);
      setTableLoading(false);
    } catch (error) {
      setPageInfo({
        ...pageInfo,
        pageSize: 0,
        page: 0,
        totalCount: 0,
        totalPages: 0,
      });
      setRows([]);
      console.error('Error fetching documents:', error.message);
      setTableLoading(false);
    }
  };

  const messageHandler = () => {
    hideNotifyMessage();
  };
  const deleteOrganisation = async (id) => {
    console.log(jwt);
    let body = { orgId: id };
    setTableLoading(true);

    try {
      const response = await axios.delete(`${BASE_ORG_API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(body),
      });
      setLoadingId(null);

      fetchlist();
      showNotifyMessage('success', response?.data?.message, messageHandler);
      console.log('API Response:', response.data);
      // navigate('/dashboardadmin/organizationlist');
      setTableLoading(false);
    } catch (error) {
      console.error('Error occurred:', error);
      if (error?.response?.status == 500 || error?.response?.status == '500') {
        navigate('/internal500');
      }
      setLoadingId(null);
      console.log(error);
      setTableLoading(false);
      showNotifyMessage('error', error?.message, messageHandler);
    }
  };

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handlePreviousPageButtonClick = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPageButtonClick = () => {
    setPage((prevPage) =>
      Math.min(rows.length / rowsPerPage - 1, prevPage + 1)
    );
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

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <SuperAdminHeader
            componentName="Organization List"
            name={firstName || ''}
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
                fontWeight: '500',
                fontSize: '24px',
              },
            }}
          />
        </div>

        <div className={Styles.bannerBtn}>
          <div className={Styles.OrganizationListFilterSerchBox}>
            <Search
              name={'Search name here.'}
              styles={searchStyles}
              searchImage={SerchImages}
              imageHeight={'47px'}
              imageMarginLeft={20}
              searchValue={searchValue}
              handleChangeSearch={handleChangeSearch}
            />
          </div>
          <div className={Styles.bannerButton}>
            <Link
              to="/dashboardadmin/addorganizationadmin"
              style={{ textDecoration: 'none' }}
            >
              <GeneralButton
                name={'Add Organization'}
                type={'submit'}
                color={'#f8fafc'}
                borderRadius={'30px'}
                backgroundColor={'#6366f1'}
                icons={frame}
                width={'158px'}
                height={'45px'}
                buttonHandler={() => {
                  console.log('getting');
                  dispatch(setOrganisationStatus('add'));
                }}
              />
            </Link>
          </div>
        </div>

        <div className={Styles.OrganizationListTable}>
          <Paper>
            <TableContainer>
              <Table
                sx={{ width: '100%' }}
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
                        onClick={(e) => handleRequestSort(e, 'name')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Organization Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Address
                      </Typography>
                      {/* <TableSortLabel
                        active={orderBy === 'address'}
                        direction={orderBy === 'address' ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, 'address')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Address
                        </Typography>
                      </TableSortLabel> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Contact Person
                      </Typography>
                      {/* <TableSortLabel
                        active={orderBy === 'contactPerson'}
                        direction={orderBy === 'contactPerson' ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, 'contactPerson')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Contact Person
                        </Typography>
                      </TableSortLabel> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Plans
                      </Typography>
                      {/* <TableSortLabel
                        active={orderBy === 'plans'}
                        direction={orderBy === 'plans' ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, 'plans')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Plans
                        </Typography>
                      </TableSortLabel> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Status
                      </Typography>
                      {/* <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        onClick={(e) => handleRequestSort(e, 'status')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Status
                        </Typography>
                      </TableSortLabel> */}
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
                  {/* Map through the data and create rows */}
                  {tableloading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Skeleton variant="rectangular" width="100%">
                          <div style={{ paddingTop: '21%' }} />
                        </Skeleton>
                        {/* <CircularProgress /> */}
                      </TableCell>
                    </TableRow>
                  ) : (
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
                              <Checkbox
                                inputProps={{ 'aria-labelledby': row.name }}
                              />
                            </TableCell> */}
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell>{row.address}</TableCell>
                              <TableCell>{row.contactPerson}</TableCell>
                              <TableCell>{row.plans}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              {/* <TableCell>
                          <FormControl style={{ width: '110px' }}>
                            <Select
                              style={{ border: 'none', borderRadius: 'none' }}
                              value={row.status}
                              onChange={(e) => {
                                console.log(e.target.value);
                              }}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell> */}
                              <TableCell>
                                {/* <IconButton aria-label="view">
                            <img
                              src={eyesolid}
                              alt="View"
                              style={{ width: 24, height: 24 }}
                            />
                          </IconButton> */}
                                <Link to="/dashboardadmin/addorganizationadmin">
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => {
                                      console.log('editing');
                                      console.log(row);
                                      const orgObject = responseData.find(
                                        (obj) => obj.id === row.id
                                      );
                                      dispatch(setOrganisationStatus('edit'));
                                      dispatch(setOrganisationData(orgObject));
                                    }}
                                  >
                                    <img src={editIcon} alt="Edit" />
                                  </IconButton>
                                </Link>

                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    deleteOrganisation(row.id);
                                    setLoadingId(row.id);
                                  }}
                                >
                                  {loadingId == rows.id && loadingId != null ? (
                                    <CircularProgress />
                                  ) : (
                                    <img src={deleteIcon} alt="Delete" />
                                  )}
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <h2>No data available</h2>
                          </TableCell>
                          {/* Adjust colSpan based on the number of columns */}
                        </TableRow>
                      )}
                    </>
                  )}

                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )} */}
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
                padding: '15px',
              }}
            >
              <div>Total {pageInfo?.totalCount} items</div>
              <Pagination
                defaultCurrent={1}
                total={pageInfo?.totalPages * 10}
                itemRender={itemRender}
                current={pageInfo?.page + 1}
                onChange={(newPage) => {
                  setPageInfo({ ...pageInfo, page: newPage - 1 });
                  fetchlist(newPage - 1);
                }}
                showSizeChanger={false}
              />

              {/* <Pagination
                total={rows.length}
                itemRender={itemRender}
                pageSize={rowsPerPage}
                current={page}
                onChange={(newPage) => setPage(newPage)}
              /> */}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrganizationList;
