import React, { useState } from 'react'
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
} from '@coreui/react'
import { useGetLanguageQuery } from 'src/features/language/languageApi'

const Language = () => {
  const { data: language, isLoading, error } = useGetLanguageQuery()
  const [addLanguage, setAddLanguage] = useState(false)

  const toggleAddLanguage = () => {
    setAddLanguage((prev) => !prev)
  }

  const submitForm = async (event) => {
    event.preventDefault()
  }

  return (
    <>
      {addLanguage && (
        <CCard className="mb-4">
          <CCardHeader>Add Language</CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder="Short Name"
                      //   value={email}
                      //   onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormInput
                      type="text"
                      placeholder="Language Name"
                      //   value={password}
                      //   onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  {error && <div className="mb-2 text-danger">{error?.data?.message}</div>}
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" type="submit">
                        Add{' '}
                        {isLoading && (
                          <div className="spinner-border spinner-grow-sm text-light " role="status">
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
          Twtor Languages
          <div className="d-flex justify-content-end">
            <CButton className="" color="primary" onClick={toggleAddLanguage}>
              Add Language
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Short Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Language</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {language?.map((item) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                  <CTableDataCell>{item.short_name}</CTableDataCell>
                  <CTableDataCell>{item.languages}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="warning">Edit</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Language
