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

function Transaction() {
  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between">
        Twtor Karma Points Transaction
      </CCardHeader>
      <CCardBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Karma Points</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
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
  );
}

export default Transaction;
