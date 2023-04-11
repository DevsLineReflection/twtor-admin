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
  const [SubscriptionOption, setSubscriptionOption] = useState(0);
  const [NumberOfLiveSession, setNumberOfLiveSession] = useState("");
  const [Band_Default_Price, setBand_Default_Price] = useState("");

  const Subscription_Option_Type = {
    0: "Platform",
    1: "Live Session",
    2: "Combine",
  };

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
      subscription_option: SubscriptionOption,
      number_of_live_session: NumberOfLiveSession,
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
                  <div className="mb-3">
                    <label>Select Subscription for -</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        // value={0}
                        onChange={() => {
                          setSubscriptionOption(0);
                        }}
                        checked={SubscriptionOption == 0}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Platform
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        // value={1}
                        onChange={() => {
                          setSubscriptionOption(1);
                        }}
                        checked={SubscriptionOption == 1}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Live Session
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        // value={2}
                        onChange={() => {
                          setSubscriptionOption(2);
                        }}
                        checked={SubscriptionOption == 2}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Combine
                      </label>
                    </div>
                  </div>
                  {SubscriptionOption != 0 && (
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Number of Live Session"
                        min="1"
                        value={NumberOfLiveSession}
                        onChange={(e) => setNumberOfLiveSession(e.target.value)}
                        required={SubscriptionOption != 0}
                      />{" "}
                    </CInputGroup>
                  )}

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
                <CTableHeaderCell scope="col">
                  Subscription Option
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Live Session</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created At</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={8}>
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
                      {Subscription_Option_Type[item.subscription_option]}
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.number_of_live_session
                        ? item.number_of_live_session
                        : "N/A"}
                    </CTableDataCell>
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
