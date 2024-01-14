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
import { useCreateTestimonialMutation } from "src/features/testimonial/testimonialApi";

function Testimonial() {
  const [
    createTestimonial,
    { data, isLoading: isLoadingBC, errorBC },
] = useCreateTestimonialMutation()
  const [WriterName, setWriterName] = useState('')
  const [WriterType, setWriterType] = useState(1)
  const [WriterReview, setWriterReview] = useState('')
  const [WriterImage, setWriterImage] = useState('')
  const handleWriterTypeChange = (checked) => {
    if(!checked) {
      return;
    }
    if(WriterType == 1) {
      setWriterType(0)
    } else {
      setWriterType(1)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('writer_name', WriterName)
    formData.append('review', WriterReview)
    formData.append('user_type', WriterType)
    formData.append('image', WriterImage)
    createTestimonial(formData).then(res=> {
      setWriterImage('');
      setWriterReview('');
      setWriterName('');
      setWriterType(1);
    });
  }
  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between">
        Twtor Testimonial
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CForm onSubmit={handleSubmit}>
              <CFormLabel>Writer Name</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="text"
                  placeholder="Enter Writer Name"
                  value={WriterName}
                  onChange={(e) => setWriterName(e.target.value)}
                  required
                />{" "}
              </CInputGroup>
              <CFormLabel className="mt-2">Writer Type</CFormLabel>
                <CFormCheck type="radio" name="writertype" id="writertype1" label="Twtor" checked={WriterType == 1} onChange={(e) => handleWriterTypeChange(e.target.checked)}/>{" "}
                <CFormCheck type="radio" name="writertype" id="writertype2" label="Student" checked={WriterType == 0} onChange={(e) => handleWriterTypeChange(e.target.checked)}/>{" "}
              <CFormLabel className="mt-2">Review</CFormLabel>
              <CInputGroup>
                <CFormTextarea
                  type="text"
                  placeholder="Enter Writer Review"
                  value={WriterReview}
                  onChange={(e) => setWriterReview(e.target.value)}
                  required
                />{" "}
              </CInputGroup>
              <CFormLabel className="mt-2">Writer Image</CFormLabel>
              <CInputGroup>
                <CFormInput
                  type="file"
                  placeholder="Writer Image"
                  onChange={(e) => setWriterImage(e.target.files[0])}
                />{" "}
              </CInputGroup>
              <CRow className="mt-2 text-end">
                <CCol>
                  <CButton
                    color="primary"
                    className="px-4"
                    type="submit"
                    disabled={isLoadingBC}
                  >
                    Save {isLoadingBC && (
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
  );
}

export default Testimonial;
