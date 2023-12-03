import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CTableDataCell,
  CTable,
  CBadge,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from "@coreui/react";
import Moment from "react-moment";
import { useNavigate, useLocation, Link } from "react-router-dom";

import GetBadge from "src/lib/GetBadge";
import { useDispatch } from "react-redux";
import { useGetUsersQuery, userApi } from "src/features/user/userApi";
import { cilList } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const UserList = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();
  const { data: users, isLoading, error, isFetching } = useGetUsersQuery(page);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page > 1) {
      dispatch(userApi.endpoints.getUsers.initiate(page));
    }
  }, [page, dispatch]);

  const pageChange = (url) => {
    let checkPage = url.match(/page=([0-9]+)/, "");
    if (checkPage && checkPage[1]) {
      setPage(parseInt(checkPage[1]));
      navigate(`/users?page=${parseInt(checkPage[1])}`);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Twtor User List</CCardHeader>
        <CCardBody>
          <div className="row my-2 mx-0">
            <div className="col-sm-12 form-inline p-0 c-datatable-filter">
              {/* <label className="mfe-2">Search</label> */}
              <input
                className="form-control"
                type="text"
                placeholder="Search here ..."
                // value={GlobalSearch}
                // onChange={(e) => globalSearch(e.target.value)}
              />
            </div>
          </div>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created By</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Joined On</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading || isFetching ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={7}>
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                </>
              ) : (
                users?.data?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    {/* <CTableDataCell>
                      <CBadge color={GetBadge(item.is_multiple)}>
                        {item.is_multiple ? "Allowed" : "Not Allowed"}
                      </CBadge>
                    </CTableDataCell> */}
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={GetBadge(item.user_type)}>
                        {item.user_type ? "Admin" : "User"}
                      </CBadge>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <CBadge color={GetBadge(item.is_active)}>
                        {item.is_active ? "Active" : "Inactive"}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{item.owner.email}</CTableDataCell> */}
                    <CTableDataCell>
                      {item.created_at ? (
                        <Moment format="DD-MMM-YYYY LT">
                          {item.created_at}
                        </Moment>
                      ) : (
                        ""
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">
                          <CIcon icon={cilList} size="xl" />
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>
                            <Link
                              to={`/users/${item.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div>Details</div>
                            </Link>
                          </CDropdownItem>
                          <CDropdownItem
                          // onClick={() => changeStudyGroupStatus(item)}
                          >
                            {item.is_active == 1 ? "Deactivate" : "Activate"}
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
          {users?.data?.length > 0 ? (
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {users?.links?.map((item) => (
                    <li
                      className={`page-item ${item.label == page && "active"} ${
                        !item.url && "disabled"
                      }`}
                      style={{ cursor: item.url ? "pointer" : "not-allowed" }}
                      isLoading={isFetching}
                    >
                      <a
                        className="page-link"
                        onClick={() => pageChange(item.url)}
                        aria-label={item.label}
                      >
                        <span
                          className="sr-only"
                          dangerouslySetInnerHTML={{
                            __html: item.label,
                          }}
                        ></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : (
            <>
              {isLoading || isFetching ? (
                ""
              ) : (
                <div className="text-center">No Data</div>
              )}
            </>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default UserList;
