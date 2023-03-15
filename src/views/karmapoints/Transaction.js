import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
  CCardGroup,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";

import axios from "../../lib/axios";
import { useGetKarmaPointHistoryQuery } from "src/features/karmapoint/karmapointApi";
import Moment from "react-moment";

function Transaction() {
  const {
    data: karmaPointHistory,
    isLoading: karmaPointHistoryLoading,
    error: karmaPointHistoryError,
  } = useGetKarmaPointHistoryQuery();
  const [karmapointInHistory, setkarmapointInHistory] = useState([]);

  useEffect(() => {
    if (karmaPointHistory && karmaPointHistory.length > 0) {
      setkarmapointInHistory(karmaPointHistory);
    }
  }, [karmaPointHistory]);

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between">
        Twtor Karma Points Transaction
      </CCardHeader>
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
              <CTableHeaderCell scope="col">Transaction Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Karma Points</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">By</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">At</CTableHeaderCell>
              {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {karmapointInHistory?.map((item) => (
              <CTableRow>
                <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                <CTableHeaderCell scope="row">
                  {item.transaction_id}
                </CTableHeaderCell>
                <CTableDataCell
                  className={`${item.Type != "admin" && "text-danger"}`}
                >
                  {item.point_in}
                </CTableDataCell>
                <CTableDataCell
                  className={`${item.Type != "admin" && "text-danger"}`}
                >
                  {item.Type == "admin" ? "In" : "Out"}
                </CTableDataCell>
                <CTableDataCell>
                  {item.created_at ? (
                    <Moment format="DD-MMM-YYYY LT">{item.created_at}</Moment>
                  ) : (
                    ""
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
}

export default Transaction;
