import React, { useState, useEffect } from 'react';
import Styles from './OrgUserList.module.css';
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
import IconButton from '@mui/material/IconButton';
import editIcon from '../../../asset/AmChatSuperAdmin/pencil-alt.png';
import deleteIcon from '../../../asset/AmChatSuperAdmin/Frame 2302.png';
import { Link } from 'react-router-dom';
import styles from '../../../pages/AMChatAdmin/OrganizationList/Organization.module.css';
import Search from '../../../components/common/search/Search';
import SerchImages from '../../../asset/AmChatSuperAdmin/Group2305.png';
import { FormControl, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { setUser, selectUser } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import upload from '../../../asset/uploadlatesticon.png';
import axios from 'axios';
import * as constants from '../../../constants/Constant';
import {
  BASE_API_URL,
  DOCUMENT_ENDPOINT,
  BASE_DOC_API_URL,
} from '../../../constants/Constant';
import { Spin } from 'antd';
import { useMessageState } from '../../../hooks/useapp-message';
import AMChatHeader from '../../AMChatAdmin/AMChatHeader/AMChatHeader';
// import Pagination from "@mui/material/Pagination";
import { Pagination } from 'antd';
import OrganizationAdminHeader from '../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader';

function OrgUserList() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();

  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('uploadDate');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    page: 0,
    totalCount: null,
    totalPages: null,
  });

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [firstName, setFirstName] = useState('');
  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem('firstNameOrganisation');
    setFirstName(storedFirstName);
  }, []);

  const filterDocuments = () => {
    return documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   setFilteredDocuments(filterDocuments());
  // }, [searchQuery, documents]);

  const fetchDocuments = async (page = 0) => {
    setLoading(true);
    try {
      console.log('api called');
      const organizationId = decodeJWT(jwt).organisationId;
      const documentUrl = `${constants.BASE_DOC_API_URL}/getAllByOrg/${organizationId}`;
      const response = await axios.get(documentUrl, {
        params: {
          page: page,
          size: pageInfo?.pageSize,
          sortField: orderBy,
          sortDirection: order,
          name: searchQuery,
          isActive: 1,
          version: 1,
          fileSize: '',
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error('Failed to fetch documents');
      }
      console.log('response----->', response);
      setDocuments(response.data.data);
      setPageInfo({
        ...pageInfo,
        pageSize: response?.data?.pageSize,
        page: response?.data?.page,
        totalCount: response?.data?.totalCount,
        totalPages: response?.data?.totalPages,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error.message);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [jwt, searchQuery, order]);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     setLoading(true);
  //     try {
  //       const organizationId = decodeJWT(jwt).organisationId;
  //       const documentUrl = `${constants.BASE_DOC_API_URL}/getAllByOrg/${organizationId}`;
  //       const response = await axios.get(documentUrl, {
  //         params: {
  //           page: 0,
  //           size: 10,
  //           sortField: "uploadDate",
  //           sortDirection: "desc",
  //           name: "",
  //           isActive: 1,
  //           version: 1,
  //           fileSize: "",
  //         },
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       });

  //       if (!response.data || !response.data.data) {
  //         throw new Error("Failed to fetch documents");
  //       }
  //       setDocuments(response.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching documents:", error.message);
  //     }
  //   };

  //   fetchDocuments();
  // }, [jwt, searchQuery]);

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

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const handleDelete = async (documentId) => {
    try {
      const response = await axios.put(
        `${BASE_DOC_API_URL}/${documentId}/status`,
        { isActive: false },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setDocuments(documents.filter((doc) => doc.id !== documentId));
        showNotifyMessage('success', response?.data?.message, messageHandler);
      } else {
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error.message);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, documents.length - page * rowsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('searchQuery', e.target.value);
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

  console.log('pageInfo---->', pageInfo);

  console.log('documents---->', documents);
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName={`Welcome ${firstName || ''}`}
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
              imageHeight={'46px'}
              imageMarginLeft={20}
              handleChangeSearch={handleSearch}
              searchValue={searchQuery}
            />
          </div>
          <div className={Styles.bannerButton}>
            <Link to="/orgadddocument" style={{ textDecoration: 'none' }}>
              <GeneralButton
                name={'Add Document'}
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={false}
                        inputProps={{ 'aria-label': 'select all documents' }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        onClick={(e) => handleRequestSort(e, 'uploadDate')}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                        >
                          Document Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Size
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Version
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                      >
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold', marginLeft: '20px' }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents?.length > 0 ? (
                    documents
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              inputProps={{ 'aria-labelledby': row.name }}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell>{row.fileSize} MB</TableCell>
                          <TableCell>{row.version}</TableCell>
                          <TableCell>
                            <FormControl style={{ width: '110px' }}>
                              <Select
                                style={{ border: 'none', borderRadius: 'none' }}
                                value={row.active ? 'Active' : 'Inactive'}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                }}
                              >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <Link to={`/editdocument/${row.id}`}>
                              <IconButton aria-label="edit">
                                <img src={editIcon} alt="Edit" />
                              </IconButton>
                            </Link>
                            <Link to={`/updatedocument/${row.id}`}>
                              <IconButton aria-label="Upload">
                                <img
                                  className={Styles.uploadicon}
                                  src={upload}
                                  alt="Uploaddocument"
                                />
                              </IconButton>
                            </Link>

                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(row.id)}
                            >
                              <img src={deleteIcon} alt="Delete" />
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
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
                count={Math.ceil(filteredDocuments.length / rowsPerPage)}
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
                variant="outlined"
                shape="rounded"
              /> */}

              <Pagination
                defaultCurrent={1}
                total={pageInfo?.totalPages * 10}
                itemRender={itemRender}
                current={pageInfo?.page + 1}
                onChange={(newPage) => {
                  setPageInfo({ ...pageInfo, page: newPage - 1 });
                  fetchDocuments(newPage - 1);
                }}
              />
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrgUserList;
