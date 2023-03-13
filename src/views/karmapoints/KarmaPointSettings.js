import React, { useEffect, useState } from "react";
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
} from "@coreui/react";

import axios from "../../lib/axios";
import {
  useCreateKarmaPointsSettingsMutation,
  useGetKarmapointsSettingsQuery,
} from "src/features/karmapoint/karmapointApi";
import CIcon from "@coreui/icons-react";
import { cilDollar } from "@coreui/icons";
import Moment from "react-moment";

function KarmaPointSettings() {
  const {
    data: karmaPointSettings,
    isLoading,
    error,
    isFetching,
  } = useGetKarmapointsSettingsQuery();

  const [
    createKarmaPointsSettings,
    { data, isLoading: isloadingCreat, error: createError },
  ] = useCreateKarmaPointsSettingsMutation();

  const [ExchangeRate, setExchangeRate] = useState("");
  const [TwtorRegistration, setTwtorRegistration] = useState("");
  const [PerStudyGroupCreation, setPerStudyGroupCreation] = useState("");
  const [PerStudyGroupSubscription, setPerStudyGroupSubscription] =
    useState("");
  const [RewardJoinAsEditor, setRewardJoinAsEditor] = useState("");
  const [PerSolution, setPerSolution] = useState("");
  const [PerSuccessfulInvitation, setPerSuccessfulInvitation] = useState("");
  const [PerSuccessfulReferral, setPerSuccessfulReferral] = useState("");
  const [PerStudyGroupGift, setPerStudyGroupGift] = useState("");
  const [PerLiveTwtor, setPerLiveTwtor] = useState("");
  const [PerLike, setPerLike] = useState("");
  const [PerComment, setPerComment] = useState("");
  const [PerShare, setPerShare] = useState("");
  const [PerLikeReceive, setPerLikeReceive] = useState("");
  const [PerCommentReceive, setPerCommentReceive] = useState("");
  const [PerShareReceive, setPerShareReceive] = useState("");
  const [ExchangeHistory, setExchangeHistory] = useState([]);

  useEffect(() => {
    if (karmaPointSettings && karmaPointSettings.length > 0) {
      setPerStudyGroupCreation(karmaPointSettings[0].book_club_create);
      setPerSolution(karmaPointSettings[0].soluation);
      setTwtorRegistration(karmaPointSettings[0].twtor_registration);
      setPerStudyGroupSubscription(
        karmaPointSettings[0].per_study_group_subscription
      );
      setPerSuccessfulInvitation(
        karmaPointSettings[0].per_successful_invitation
      );
      setRewardJoinAsEditor(karmaPointSettings[0].reward_join_as_moderator);
      setPerSuccessfulReferral(karmaPointSettings[0].per_successful_refeeral);
      setPerStudyGroupGift(karmaPointSettings[0].per_study_group_gift);
      setPerLiveTwtor(karmaPointSettings[0].per_live_twtor);
      setPerLike(karmaPointSettings[0].per_like);
      setPerComment(karmaPointSettings[0].per_comment);
      setPerShare(karmaPointSettings[0].per_share);
      setPerLikeReceive(karmaPointSettings[0].per_like_receive);
      setPerCommentReceive(karmaPointSettings[0].per_comment_receive);
      setPerShareReceive(karmaPointSettings[0].per_share_receive);
      setExchangeRate(karmaPointSettings[0].price);
      setExchangeHistory(karmaPointSettings);
    }
  }, [karmaPointSettings]);

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      book_club_create: PerStudyGroupCreation,
      soluation: PerSolution,
      twtor_registration: TwtorRegistration,
      per_study_group_subscription: PerStudyGroupSubscription,
      per_successful_invitation: PerSuccessfulInvitation,
      reward_join_as_moderator: RewardJoinAsEditor,
      per_successful_refeeral: PerSuccessfulReferral,
      per_study_group_gift: PerStudyGroupGift,
      per_live_twtor: PerLiveTwtor,
      per_like: PerLike,
      per_comment: PerComment,
      per_share: PerShare,
      per_like_receive: PerLikeReceive,
      per_comment_receive: PerCommentReceive,
      per_share_receive: PerShareReceive,
      price: ExchangeRate,
    };
    createKarmaPointsSettings(data);
  };

  return (
    <>
      {ExchangeHistory && (
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Karma Point Exchange Rate
          </CCardHeader>
          <CCardBody>
            <CRow className="justify-content-center">
              <CCol md={5}>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Rate</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Added At</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {ExchangeHistory?.length > 0 &&
                      ExchangeHistory.map((item, key) => (
                        <CTableRow>
                          <CTableDataCell>{key + 1}</CTableDataCell>
                          <CTableDataCell>
                            {" "}
                            <CIcon icon={cilDollar} className="" />
                            {item.price}
                          </CTableDataCell>
                          <CTableDataCell>
                            {" "}
                            {item.created_at ? (
                              <Moment format="DD-MMM-YYYY LT">
                                {item.created_at}
                              </Moment>
                            ) : (
                              ""
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      )}
      <CForm onSubmit={submitForm}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between">
            Twtor Karma Points Settings
          </CCardHeader>
          <CRow className="justify-content-center mt-2">
            <CCol md={5}>
              <CInputGroup className="mb-3">
                <CFormLabel>Karma Point Exchange Rate</CFormLabel>
                <CIcon icon={cilDollar} className="me-2 mt-2" />
                <CFormInput
                  type="number"
                  placeholder="Per Karma Point Exchange Rate"
                  // min="1"
                  //   defaultValue={ShortName}
                  value={ExchangeRate}
                  onChange={(e) => setExchangeRate(e.target.value)}
                  required
                />{" "}
              </CInputGroup>
            </CCol>
          </CRow>
          <CCardBody>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Action Head</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Number of Karma Points
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col">Action Head</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Number of Karma Points
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Twtor Registration</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        //   defaultValue={ShortName}
                        value={TwtorRegistration}
                        onChange={(e) => setTwtorRegistration(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>

                  <CTableDataCell>Per Study Group Creation</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        //   defaultValue={ShortName}
                        value={PerStudyGroupCreation}
                        onChange={(e) =>
                          setPerStudyGroupCreation(e.target.value)
                        }
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>

                <CTableRow>
                  <CTableDataCell>Per Study Group Subscription</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerStudyGroupSubscription}
                        onChange={(e) =>
                          setPerStudyGroupSubscription(e.target.value)
                        }
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                  {/* <CTableDataCell>
                <CButton className="" color="warning">
                  Save
                </CButton>
              </CTableDataCell> */}

                  <CTableDataCell>Reward Join as Moderator</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={RewardJoinAsEditor}
                        onChange={(e) => setRewardJoinAsEditor(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Per Solution</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerSolution}
                        onChange={(e) => setPerSolution(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                  <CTableDataCell>Per Successful Invitation</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerSuccessfulInvitation}
                        onChange={(e) =>
                          setPerSuccessfulInvitation(e.target.value)
                        }
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>
                    Per Successful Referral - Referrer
                  </CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerSuccessfulReferral}
                        onChange={(e) =>
                          setPerSuccessfulReferral(e.target.value)
                        }
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                  <CTableDataCell>Per Study Group Gift</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerStudyGroupGift}
                        onChange={(e) => setPerStudyGroupGift(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Per Live twtor</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerLiveTwtor}
                        onChange={(e) => setPerLiveTwtor(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                  <CTableDataCell>Per Like</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerLike}
                        onChange={(e) => setPerLike(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Per Comment</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerComment}
                        onChange={(e) => setPerComment(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                  <CTableDataCell>Per Share</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerShare}
                        onChange={(e) => setPerShare(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Per Like Receive</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerLikeReceive}
                        onChange={(e) => setPerLikeReceive(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>

                  <CTableDataCell>Per Comment Receive</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerCommentReceive}
                        onChange={(e) => setPerCommentReceive(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Per Share Receive</CTableDataCell>
                  <CTableDataCell>
                    <CInputGroup className="mb-3">
                      <CFormInput
                        type="number"
                        placeholder="Karma Point"
                        // min="1"
                        value={PerShareReceive}
                        onChange={(e) => setPerShareReceive(e.target.value)}
                        required
                      />{" "}
                    </CInputGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell colspan="4" className="text-center">
                    <CButton className="" color="primary" type="submit">
                      Save{" "}
                      {isloadingCreat && (
                        <div
                          className="spinner-border spinner-grow-sm text-light "
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CForm>
    </>
  );
}

export default KarmaPointSettings;
