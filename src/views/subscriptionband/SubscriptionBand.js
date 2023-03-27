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

import axios from "../../lib/axios";
import {
  useCreateSubscriptionbandMutation,
  useGetSubscriptionbandQuery,
} from "src/features/subscriptionband/subscriptionbandApi";
import Moment from "react-moment";
import CIcon from "@coreui/icons-react";
import { cilDollar } from "@coreui/icons";
function SubscriptionBand() {
  const [subscriptionBand, setAddsubscriptionBand] = useState(false);
  const [Band_Name, setBand_Name] = useState("");
  const [Band_Type, setBand_Type] = useState("");
  const [Band_Range, setBand_Range] = useState("");
  const [Band_Default_Price, setBand_Default_Price] = useState("");

  const {
    data: Subscriptionband,
    isLoading,
    error,
  } = useGetSubscriptionbandQuery();
  const [
    createSubscriptionband,
    { data, isLoading: createSubscriptionbandLoading, error: createError },
  ] = useCreateSubscriptionbandMutation();

  const submitForm = async (event) => {
    event.preventDefault();
    createSubscriptionband({
      band_name: Band_Name,
      band_type: Band_Type,
      band_range: Band_Range,
      band_default_price: Band_Default_Price,
    }).then((res) => {
      setAddsubscriptionBand(false);
      setBand_Name("");
      setBand_Type("");
      setBand_Range("");
    });
  };

  return (
    <>
      {subscriptionBand && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Add Subscription Band
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="warning"
                onClick={() => setAddsubscriptionBand(false)}
              >
                Close
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody className="justify-content-center">
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CForm onSubmit={submitForm}>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="text"
                      placeholder="Band Name"
                      min="1"
                      //   defaultValue={ShortName}
                      value={Band_Name}
                      onChange={(e) => setBand_Name(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>
                  <CFormSelect
                    className="mb-3"
                    aria-label="Default select example"
                    value={Band_Type}
                    onChange={(e) => setBand_Type(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value="Days">Days</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </CFormSelect>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="number"
                      placeholder="Band Range"
                      min="1"
                      value={Band_Range}
                      onChange={(e) => setBand_Range(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="number"
                      placeholder="Band Deafult Price"
                      min="1"
                      value={Band_Default_Price}
                      onChange={(e) => setBand_Default_Price(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton
                        color="primary"
                        className="px-4"
                        type="submit"
                        disabled={createSubscriptionbandLoading}
                      >
                        Add{" "}
                        {createSubscriptionbandLoading && (
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
          Twtor Subscription Band
          {!subscriptionBand && (
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="info"
                onClick={() => setAddsubscriptionBand(true)}
              >
                Add Subscription Band
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Range</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={5}>
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                </>
              ) : (
                Subscriptionband?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.band_name}</CTableDataCell>
                    <CTableDataCell>{item.band_type}</CTableDataCell>
                    <CTableDataCell>{item.band_range}</CTableDataCell>
                    <CTableDataCell>
                      {" "}
                      <CIcon icon={cilDollar} className="" />
                      {item.band_price}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.created_at ? (
                        <Moment format="DD-MMM-YYYY LT">
                          {item.created_at}
                        </Moment>
                      ) : (
                        "N/A"
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
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
    </>
  );
}

export default SubscriptionBand;
