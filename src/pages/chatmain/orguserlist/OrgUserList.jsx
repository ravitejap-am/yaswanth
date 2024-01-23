import React from "react";
import Styles from "../../AMChatAdmin/OrganizationAdminList/OrganizationAdminList.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import { Link } from "react-router-dom";

function OrgUserList() {
  const rows = [
    {
      id: 1,
      documentName: "Passbook",
      size: "3 MB",
      version: "v1.0",
      status: "Active",
    },
    {
      id: 2,
      documentName: "Passbook",
      size: "2.5 MB",
      version: "v2.0",
      status: "Inactive",
    },
    {
      id: 3,
      documentName: "Passbook",
      size: "3 MB",
      version: "v1.0",
      status: "Active",
    },
    {
      id: 4,
      documentName: "Passbook",
      size: "2.5 MB",
      version: "v2.0",
      status: "Inactive",
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("documentName");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminProfileName}>Document List</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div>
          <div className={Styles.bannerBtn}>
            <div className={Styles.bannerButton}>
              <Link
                to="/dashboardadmin/addorganizationadmin"
                style={{ textDecoration: "none" }}
              >
                <GeneralButton
                  name={"Add Document"}
                  type={"submit"}
                  color={"#f8fafc"}
                  borderRadius={"30px"}
                  backgroundColor={"#6366f1"}
                  icons={frame}
                  width={"132px"}
                  height={"45px"}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className={Styles.OrganizationListTable}>
          <Paper>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <TableHead style={{ borderBottom: "2px solid #0F172A" }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={false}
                        inputProps={{ "aria-label": "select all documents" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel onClick={(e) => handleRequestSort(e, "documentName")}>
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>
                          Document Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        Size
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        Version
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" style={{ fontWeight: "bold" }}>
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox inputProps={{ "aria-labelledby": row.documentName }} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.documentName}
                        </TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.version}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <IconButton aria-label="edit">
                            <img src={editIcon} alt="Edit" />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <img src={deleteIcon} alt="Delete" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrgUserList;
