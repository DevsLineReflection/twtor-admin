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
  CBadge,
} from "@coreui/react";
import {
  useCreateLanguageMutation,
  useGetLanguageQuery,
} from "src/features/language/languageApi";
import axios from "../../lib/axios";
import {
  useCreateZoomAccountMutation,
  useGetZoomAccountQuery,
} from "src/features/zoom/zoomApi";
import GetBadge from "src/lib/GetBadge";
import Moment from "react-moment";

const Zoom = () => {
  const { data: zoomAccount, isLoading, error } = useGetZoomAccountQuery();
  const [
    createZoomAccount,
    { data, isLoading: createZoomAccountLoading, error: createError },
  ] = useCreateZoomAccountMutation();

  const [addZoomAccount, setAddZoomAccount] = useState(false);
  const [ZoomAccountEmail, setZoomAccountEmail] = useState("");
  const [ZoomAccountOauthClienId, setZoomAccountOauthClienId] = useState("");
  const [ZoomAccountOauthClienSecret, setZoomAccountOauthClienSecret] =
    useState("");
  const [ZoomAccountSdkClienSecret, setZoomAccountSdkClienSecret] =
    useState("");
  const [WebHookClienSecret, setWebHookClienSecret] = useState("");
  const [ZoomAccountSdkClienId, setZoomAccountSdkClienId] = useState("");
  const [AccountType, setAccountType] = useState(0);

  const submitForm = async (event) => {
    event.preventDefault();
    createZoomAccount({
      account_email: ZoomAccountEmail,
      oauth_client_id: ZoomAccountOauthClienId,
      meeting_sdk_client_id: ZoomAccountSdkClienId,
      oauth_client_secret: ZoomAccountOauthClienSecret,
      meeting_sdk_client_secret: ZoomAccountSdkClienSecret,
      webhook_secret_token: WebHookClienSecret,
      is_premium: AccountType,
    }).then((res) => {
      debugger;
      setAddZoomAccount(false);
      setZoomAccountEmail("");
      setZoomAccountOauthClienIdsetZoomAccountEmail("");
      setZoomAccountSdkClienId("");
      setZoomAccountOauthClienSecretsetZoomAccountEmail("");
      setZoomAccountSdkClienSecretsetZoomAccountEmail("");
      setWebHookClienSecretsetZoomAccountEmail("");
      setAccountTypesetZoomAccountEmail(0);
    });
  };

  const shortNameChange = async (val) => {};

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
      {addZoomAccount && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Add Zoom Account
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="warning"
                onClick={() => setAddZoomAccount(false)}
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
                      type="email"
                      placeholder="Account Email"
                      value={ZoomAccountEmail}
                      onChange={(e) => setZoomAccountEmail(e.target.value)}
                      required
                    />{" "}
                  </CInputGroup>

                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="OAUTH Client Id"
                      value={ZoomAccountOauthClienId}
                      onChange={(e) =>
                        setZoomAccountOauthClienId(e.target.value)
                      }
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="OAUTH Client Secret"
                      value={ZoomAccountOauthClienSecret}
                      onChange={(e) =>
                        setZoomAccountOauthClienSecret(e.target.value)
                      }
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="SDK Client Id"
                      value={ZoomAccountSdkClienId}
                      onChange={(e) => setZoomAccountSdkClienId(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="SDK Client Secret"
                      value={ZoomAccountSdkClienSecret}
                      onChange={(e) =>
                        setZoomAccountSdkClienSecret(e.target.value)
                      }
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="my-2">
                    <CFormInput
                      type="text"
                      placeholder="Web hook Client Secret"
                      value={WebHookClienSecret}
                      onChange={(e) => setWebHookClienSecret(e.target.value)}
                      required
                    />
                  </CInputGroup>
                  <div className="mb-3">
                    <label>Account Type </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value={0}
                        onChange={() => {
                          setAccountType(0);
                        }}
                        checked={AccountType == 0}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Regular
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value={1}
                        onChange={() => {
                          setAccountType(1);
                        }}
                        checked={AccountType == 1}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Premium
                      </label>
                    </div>
                  </div>
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
                        disabled={createZoomAccountLoading}
                      >
                        Add{" "}
                        {createZoomAccountLoading && (
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
          Zoom Accounts
          {!addZoomAccount && (
            <div className="d-flex justify-content-end">
              <CButton
                className=""
                color="info"
                onClick={() => setAddZoomAccount(true)}
              >
                Add New Account
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Account</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created On</CTableHeaderCell>
                {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                zoomAccount?.map((item) => (
                  <CTableRow>
                    <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                    <CTableDataCell>{item.account_email}</CTableDataCell>
                    {/* "Banned" */}
                    <CTableDataCell>
                      <CBadge color={GetBadge(item.on_live ? "Banned" : "")}>
                        {item.on_live ? "On Live" : "Offline"}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={GetBadge(item.is_premium ? "Banned" : "")}>
                        {item.is_premium ? "Premium" : "Regular"}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      {item.updated_at ? (
                        <Moment format="DD-MMM-YYYY LT">
                          {item.updated_at}
                        </Moment>
                      ) : (
                        ""
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {/* <CButton color="warning">Edit</CButton> */}
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

export default Zoom;
