import React, { useState } from "react";
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
function Karmapoint() {
  const [karmaPoints, setAddKarmaPoints] = useState(false);
  const submitForm = async (event) => {
    event.preventDefault();
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
                      //   defaultValue={ShortName}
                      //   //   value={email}
                      //   onChange={(e) => handleshortNameChange(e.target.value)}
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
                        {/* {isLoading && (
                          <div
                            className="spinner-border spinner-grow-sm text-light "
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )} */}
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
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Karma Points</CTableHeaderCell>
                <CTableHeaderCell scope="col">By</CTableHeaderCell>
                <CTableHeaderCell scope="col">At</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {/* {language?.map((item) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                  <CTableDataCell>{item.short_name}</CTableDataCell>
                  <CTableDataCell>{item.languages}</CTableDataCell>
               
                </CTableRow>
              ))} */}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default Karmapoint;
