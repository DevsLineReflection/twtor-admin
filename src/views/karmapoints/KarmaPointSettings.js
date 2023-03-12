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
  CFormLabel,
} from "@coreui/react";

import axios from "../../lib/axios";

function KarmaPointSettings() {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          Twtor Karma Point Exchange Rate
        </CCardHeader>
        <CCardBody>
          <CRow className="justify-content-center mb-5">
            <CCol md={5}>
              <CForm>
                <CInputGroup>
                  <CFormInput
                    type="number"
                    placeholder="Per Karma Point Exchange Rate"
                    min="1"
                    //   defaultValue={ShortName}
                    //   //   value={email}
                    //   onChange={(e) => handleshortNameChange(e.target.value)}
                    required
                  />{" "}
                  <CButton
                    color="primary"
                    className="px-4"
                    type="submit"
                    // disabled={ShortNameError}
                  >
                    Save{" "}
                    {/* {isLoading && (
                          <div
                            className="spinner-border spinner-grow-sm text-light "
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )} */}
                  </CButton>
                </CInputGroup>

                {/* {ShortNameError && (
                    <span className="text-danger">{ShortNameError}</span>
                  )} */}
                {/* {error && (
                    <div className="mb-2 text-danger">
                      {error?.data?.message}
                    </div>
                  )} */}
              </CForm>
            </CCol>
          </CRow>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                <CTableHeaderCell scope="col">Added By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Added At</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          Twtor Karma Points Settings
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Task</CTableHeaderCell>
                <CTableHeaderCell scope="col">Points</CTableHeaderCell>

                <CTableHeaderCell scope="col">Task</CTableHeaderCell>
                <CTableHeaderCell scope="col">Points</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Twtor Registration</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>

                <CTableDataCell>Per Study Group Creation</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>

              <CTableRow>
                <CTableDataCell>Per Study Group Subscription</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
                {/* <CTableDataCell>
                <CButton className="" color="warning">
                  Save
                </CButton>
              </CTableDataCell> */}

                <CTableDataCell>Reward Join as Moderator</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Per Solution</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
                <CTableDataCell>Per Successful Invitation</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>
                  Per Successful Referral - Referrer
                </CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
                <CTableDataCell>Per Study Group Gift</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Per Live twtor</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
                <CTableDataCell>Per Like</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Per Comment</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
                <CTableDataCell>Per Share</CTableDataCell>
                <CTableDataCell>
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
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell colspan="4" className="text-center">
                  <CButton className="" color="warning">
                    Save
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default KarmaPointSettings;
