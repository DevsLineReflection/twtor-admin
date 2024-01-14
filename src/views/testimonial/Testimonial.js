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
  CFormSelect,
  CFormLabel,
  CFormTextarea,
  CFormSwitch,
  CFormCheck,
} from "@coreui/react";
import axios from "src/lib/axios";
import {
  useCreatepagecontentMutation,
  useGetpagecontentQuery,
} from "src/features/pagecontent/pagecontentApi";

function Testimonial() {
  const [WriterName, setWriterName] = useState('')
  const [WriterType, setWriterType] = useState(1)
  const [WriterReview, setWriterReview] = useState('')
  const [WriterImage, setWriterImage] = useState('')
  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between">
        Twtor Testimonial
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CForm>
              <CFormLabel>Writer Name</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Enter Writer Name"
                  value={WriterName}
                  onChange={(e) => setWriterImage(e.target.value)}
                />{" "}
              </CInputGroup>
              <CFormLabel className="mt-2">Writer Type</CFormLabel>
                <CFormCheck type="radio" name="writertype" id="writertype1" label="Twtor" checked={WriterType == 1} onChange={(e) => setWriterType(e.target.checked)}/>{" "}
                <CFormCheck type="radio" name="writertype" id="writertype2" label="Student" checked={WriterType == 0} onChange={(e) => setWriterType(e.target.checked)}/>{" "}
              <CFormLabel className="mt-2">Review</CFormLabel>
              <CInputGroup>
                <CFormTextarea
                  type="text"
                  placeholder="Enter Writer Review"
                 
                />{" "}
              </CInputGroup>
              <CFormLabel className="mt-2">Writer Image</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="file"
                  placeholder="Writer Image"
                 
                />{" "}
              </CInputGroup>
              <CRow className="mt-2 text-end">
                <CCol>
                  <CButton
                    color="primary"
                    className="px-4"
                    type="submit"
                  >
                    Save{" "}{" "}
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}

export default Testimonial;
