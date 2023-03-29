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
} from "@coreui/react";
import Moment from "react-moment";
import { useNavigate, useLocation, Link } from "react-router-dom";

import {
  bookclubApi,
  useGetbookclubsQuery,
} from "src/features/bookclub/bookclubApi";
import GetBadge from "src/lib/GetBadge";
import { useDispatch } from "react-redux";
import StudyGroupPrice from "src/components/StudyGroupPrice";

const AllStudyGroups = () => {
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const navigate = useNavigate();
  const {
    data: bookclubs,
    isLoading,
    error,
    isFetching,
  } = useGetbookclubsQuery(page);
  const dispatch = useDispatch();

  const [SubscriptionStudyGroupId, setSubscriptionStudyGroupId] = useState("");

  useEffect(() => {
    if (page > 1) {
      dispatch(bookclubApi.endpoints.getbookclubs.initiate(page));
    }
  }, [page, dispatch]);

  const pageChange = (url) => {
    let checkPage = url.match(/page=([0-9]+)/, "");
    if (checkPage && checkPage[1]) {
      setPage(parseInt(checkPage[1]));
      navigate(`/allstudygroups?page=${parseInt(checkPage[1])}`);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Twtor Study Groups</CCardHeader>
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
                {/* <CTableHeaderCell scope="col">Multiple</CTableHeaderCell> */}
                <CTableHeaderCell scope="col">Access Right</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subscription</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">Income</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created On</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading || isFetching ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={8}>
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                </>
              ) : (
                bookclubs?.data?.map((item) => (
                  <>
                    <CTableRow>
                      <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      {/* <CTableDataCell>
                      <CBadge color={GetBadge(item.is_multiple)}>
                        {item.is_multiple ? "Allowed" : "Not Allowed"}
                      </CBadge>
                    </CTableDataCell> */}
                      <CTableDataCell>
                        <CBadge color={GetBadge(item.public_or_private)}>
                          {item.public_or_private ? "Private" : "Public"}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={GetBadge(item.subscription_type)}>
                          {item.subscription_type ? "Paid" : "Free"}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={GetBadge(item.is_active)}>
                          {item.is_active ? "Active" : "Inactive"}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>${item.payments_sum_amount? item.payments_sum_amount : 0}</CTableDataCell>
                      <CTableDataCell>{item.owner.email}</CTableDataCell>
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
                        <Link to={`/allstudygroups/${item.id}`}>
                          <CButton color="info">Details</CButton>
                        </Link>
                        <div className="d-flex my-2">
                          {SubscriptionStudyGroupId == item.id ? (
                            <CButton
                              color="warning"
                              onClick={() => setSubscriptionStudyGroupId("")}
                            >
                              Hide
                            </CButton>
                          ) : (
                            <CButton
                              color="success"
                              onClick={() =>
                                setSubscriptionStudyGroupId(item.id)
                              }
                            >
                              Add Subscription
                            </CButton>
                          )}
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell colSpan={8}>
                        {SubscriptionStudyGroupId == item.id && (
                          <StudyGroupPrice studygroup={item.id} />
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  </>
                ))
              )}
            </CTableBody>
          </CTable>
          {bookclubs?.data?.length > 0 ? (
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {bookclubs?.links?.map((item) => (
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

export default AllStudyGroups;
