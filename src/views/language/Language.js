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
import {
  useCreateLanguageMutation,
  useGetLanguageQuery,
} from "src/features/language/languageApi";
import axios from "../../lib/axios";

const Language = () => {
  const { data: language, isLoading, error } = useGetLanguageQuery();
  const [
    createLanguage,
    { data, isLoading: createLanguageLoading, error: createError },
  ] = useCreateLanguageMutation();

  const [addLanguage, setAddLanguage] = useState(false);
  const [ShortName, setShortName] = useState("");
  const [LanguageName, setLanguageName] = useState("");
  const [ShortNameError, setShortNameError] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    createLanguage({
      languages: LanguageName,
      short_name: ShortName,
    }).then((res) => setAddLanguage(false));
  };

  const shortNameChange = async (val) => {
    setShortName(val);
    axios.get(`/api/admin/check_shortname_language/${val}`).then((res) => {
      debugger;
      if (!(res.data === 0)) {
        setShortNameError("Already Exists");
      } else {
        setShortNameError("");
      }
    });
  };

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleshortNameChange = debounce((value) => shortNameChange(value), 0);

  return (
    <>
      {addLanguage && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Add Language
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="warning"
                onClick={() => setAddLanguage(false)}
              >
                Close
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup>
                    <CFormInput
                      type="text"
                      placeholder="Short Name"
                      defaultValue={ShortName}
                      //   value={email}
                      onChange={(e) => handleshortNameChange(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>
                  {ShortNameError && (
                    <span className="text-danger">{ShortNameError}</span>
                  )}
                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="Language Name"
                      value={LanguageName}
                      onChange={(e) => setLanguageName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  {error && (
                    <div className="mb-2 text-danger">
                      {error?.data?.message}
                    </div>
                  )}
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        color="primary"
                        className="px-4"
                        type="submit"
                        disabled={ShortNameError || createLanguageLoading}
                      >
                        Add{" "}
                        {createLanguageLoading && (
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
          Twtor Languages
          {!addLanguage && (
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="info"
                onClick={() => setAddLanguage(true)}
              >
                Add Language
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Short Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Language</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                language?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.short_name}</CTableDataCell>
                    <CTableDataCell>{item.languages}</CTableDataCell>
                    {/* <CTableDataCell>
                    <CButton color="warning">Edit</CButton>
                  </CTableDataCell> */}
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

export default Language;
