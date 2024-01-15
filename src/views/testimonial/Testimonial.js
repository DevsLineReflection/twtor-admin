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
  CFormCheck,
  CFormTextarea,
  CFormSwitch,
} from "@coreui/react";
import {
  useCreateLanguageMutation,
  useGetLanguageQuery,
} from "src/features/language/languageApi";
import axios from "../../lib/axios";
import { useCreateTestimonialMutation, useGetTestimonialsQuery } from "src/features/testimonial/testimonialApi";

const Testimonial = () => {
  const { data: testimonial, isLoading, error } = useGetTestimonialsQuery();
  const [
    createTestimonial,
    { data, isLoading: isLoadingBC, errorBC },
  ] = useCreateTestimonialMutation()
  const [addTestimonial, setAddTestimonial] = useState(false);
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
    <>
      {addTestimonial && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Add Testimonial
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="warning"
                onClick={() => setAddTestimonial(false)}
              >
                Close
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody className="justify-content-center">
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
      )}
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          Twtor Testimonials
          {!addTestimonial && (
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="info"
                onClick={() => setAddTestimonial(true)}
              >
                Add Testimonial
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Writer Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                <CTableHeaderCell scope="col">Writer Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                testimonial?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.writer_name}</CTableHeaderCell>
                    <CTableDataCell>{item.review}</CTableDataCell>
                    <CTableDataCell>{item.writer_type ? 'Twtor' : 'Student'}</CTableDataCell>
                    <CTableDataCell>
                    <CFormSwitch label="Publish Testimonial" id={item.id} defaultChecked={item.status} />
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Testimonial;
