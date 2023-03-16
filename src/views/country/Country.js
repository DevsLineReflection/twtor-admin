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
  useCreateCountryMutation,
  useGetcountryQuery,
} from "src/features/country/countryApi";

const Country = () => {
  const { data: country, isLoading, error } = useGetcountryQuery();
  const [addCountry, setAddCountry] = useState(false);

  const [
    createCountry,
    { data, isLoading: createCountryLoading, error: createError },
  ] = useCreateCountryMutation();

  const [ShortName, setShortName] = useState("");
  const [CountryName, setCountryName] = useState("");

  const toggleAddCountry = () => {
    setAddCountry((prev) => !prev);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    createCountry({
      name: CountryName,
      short_name: ShortName,
    }).then((res) => {
      setAddCountry(false);
      setShortName("");
      setCountryName("");
    });
  };

  return (
    <>
      {addCountry && (
        <CCard className="mb-4">
          <CCardHeader>Add Country</CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder="Short Name"
                      value={ShortName}
                      onChange={(e) => setShortName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormInput
                      type="text"
                      placeholder="Country Name"
                      value={CountryName}
                      onChange={(e) => setCountryName(e.target.value)}
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
                        disabled={createCountryLoading}
                      >
                        Add{" "}
                        {createCountryLoading && (
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
          Twtor Countries
          <div className="d-flex justify-content-end">
            <CButton className="" color="primary" onClick={toggleAddCountry}>
              Add Country
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Short Name</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {country?.map((item) => (
                <CTableRow>
                  <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.short_name}</CTableDataCell>
                  {/* <CTableDataCell>
                    <CButton color="warning">Edit</CButton>
                  </CTableDataCell> */}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Country;
