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

import Moment from "react-moment";
import {
  useCreateBookClubSubjectsMutation,
  useGetBookClubSubjectsQuery,
} from "src/features/bookclubsubject/bookclubsubjectApi";
import axios from "src/lib/axios";

const Studygroupsubjects = () => {
  const {
    data: bookclubsubjects,
    isLoading,
    error,
  } = useGetBookClubSubjectsQuery();
  const [
    createBookClubSubject,
    { data, isLoading: createBookClubSubjectLoading, error: createError },
  ] = useCreateBookClubSubjectsMutation();

  const [addBookClubSunject, setAddBookClubSunject] = useState(false);
  const [Name, setName] = useState("");
  const [NameError, setNameError] = useState("");
  const toggleAddBookClubSunject = () => {
    setAddBookClubSunject((prev) => !prev);
  };

  const subjectChange = async (val) => {
    setName(val);
    axios.get(`/api/admin/check_study_group_subject/${val}`).then((res) => {
      if (!(res.data === 0)) {
        setNameError("Already Exists");
      } else {
        setNameError("");
      }
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    createBookClubSubject({
      name: Name,
    }).then((res) => {
      setAddBookClubSunject(false);
      setName("");
    });
  };

  return (
    <>
      {addBookClubSunject && (
        <CCard className="mb-4">
          <CCardHeader>Add Study Group Sunjects</CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-2">
                    <CFormInput
                      type="text"
                      placeholder="Name"
                      value={Name}
                      onChange={(e) => subjectChange(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  {NameError && (
                    <span className="text-danger">{NameError}</span>
                  )}
                  <CRow className="mt-1">
                    <CCol xs={6}>
                      <CButton
                        color="info"
                        className="px-4"
                        type="submit"
                        disabled={createBookClubSubjectLoading || NameError}
                      >
                        Add{" "}
                        {createBookClubSubjectLoading && (
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
          Twtor Study Group Sunjects
          <div className="d-flex justify-content-end">
            <CButton
              className=""
              color="primary"
              onClick={toggleAddBookClubSunject}
            >
              Add Study Group Sunjects
            </CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
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
                bookclubsubjects?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
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

export default Studygroupsubjects;
