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
} from "@coreui/react";
import {
  useCreateGradeMutation,
  useGetgradeQuery,
} from "src/features/grade/gradeApi";
import Moment from "react-moment";
import { useGetcountryQuery } from "src/features/country/countryApi";

const AllClassLabel = () => {
  const { data: classlabel, isLoading, error } = useGetgradeQuery();
  const [
    createGrade,
    { data, isLoading: createGradeLoading, error: createError },
  ] = useCreateGradeMutation();
  const {
    data: country,
    isLoading: isCountryLoading,
    error: countryError,
  } = useGetcountryQuery();
  const [addClassLabel, setAddClassLabel] = useState(false);
  const [Name, setName] = useState("");
  const [Country_id, setCountry_id] = useState("");

  const toggleAddClassLabel = () => {
    setAddClassLabel((prev) => !prev);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    createGrade({
      name: Name,
      country_id: Country_id,
    }).then((res) => {
      setAddClassLabel(false);
      setName("");
      setCountry_id("");
    });
  };

  return (
    <>
      {addClassLabel && (
        <CCard className="mb-4">
          <CCardHeader>Add Class Label</CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder="Name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CFormSelect
                    className="mb-2"
                    aria-label="Default select example"
                    value={Country_id}
                    onChange={(e) => setCountry_id(e.target.value)}
                    required
                  >
                    <option>Select Country</option>
                    {country?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </CFormSelect>
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
                        disabled={createGradeLoading}
                      >
                        Add{" "}
                        {createGradeLoading && (
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
          Twtor Class Labels
          <div className="d-flex justify-content-end">
            <CButton className="" color="primary" onClick={toggleAddClassLabel}>
              Add Class Label
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created On</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={4}>
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                </>
              ) : (
                classlabel?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.country.name}</CTableDataCell>
                    <CTableDataCell>
                      {item.created_at ? (
                        <Moment format="DD-MMM-YYYY LT">
                          {item.created_at}
                        </Moment>
                      ) : (
                        "N/A"
                      )}
                    </CTableDataCell>
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

export default AllClassLabel;
