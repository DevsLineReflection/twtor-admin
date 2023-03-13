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
import {
  useCreateInKarmaPointsMutation,
  useGetKarmaPointHistoryQuery,
} from "src/features/karmapoint/karmapointApi";
import Moment from "react-moment";
function Karmapoint() {
  const {
    data: karmaPointHistory,
    isLoading: karmaPointHistoryLoading,
    error: karmaPointHistoryError,
  } = useGetKarmaPointHistoryQuery();

  const [createInKarmaPoints, { data, isLoading, error }] =
    useCreateInKarmaPointsMutation();

  const [karmaPoints, setAddKarmaPoints] = useState(false);
  const [amount, setAmount] = useState("");
  const [karmapointInHistory, setkarmapointInHistory] = useState([]);

  useEffect(() => {
    if (karmaPointHistory && karmaPointHistory.length > 0) {
      let balance_in = karmaPointHistory.filter((item) => item.point_in > 0);
      setkarmapointInHistory(balance_in);
    }
  }, [karmaPointHistory]);

  const submitForm = async (event) => {
    event.preventDefault();
    createInKarmaPoints({ amount: amount }).then((res) => {
      setAddKarmaPoints(false);
      setAmount("");
    });
  };

  return (
    <>
      {karmaPoints && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Add Karma Point
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="warning"
                onClick={() => setAddKarmaPoints(false)}
              >
                Close
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="number"
                      placeholder="Karma Point"
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>
                  {/* {ShortNameError && (
                    <span className="text-danger">{ShortNameError}</span>
                  )} */}
                  {/* {error && (
                    <div className="mb-2 text-danger">
                      {error?.data?.message}
                    </div>
                  )} */}
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        color="primary"
                        className="px-4"
                        type="submit"
                        // disabled={ShortNameError}
                      >
                        Add{" "}
                        {isLoading && (
                          <div
                            className="spinner-border spinner-grow-sm text-light "
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          Twtor Karma Points
          {!karmaPoints && (
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="info"
                onClick={() => setAddKarmaPoints(true)}
              >
                Add Karma Points
              </CButton>
            </div>
          )}
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
                  <CTableDataCell>{item.point_in}</CTableDataCell>
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
    </>
  );
}

export default Karmapoint;
