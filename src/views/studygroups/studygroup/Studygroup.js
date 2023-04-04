import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetstudygroupQuery,
  useUpdateStudyGroupSubscriptionMutation,
} from "src/features/studygroup/studygroupApi";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CTableDataCell,
  CTable,
  CBadge,
  CRow,
  CCol,
} from "@coreui/react";
import StudyGroupNavigation from "src/components/StudyGroupNavigation";
import axios from "src/lib/axios";
import Loader from "src/components/utils/Loader";

function Studygroup() {
  const { id } = useParams();
  const {
    data: studygroup,
    isLoading,
    error,
    isFetching,
  } = useGetstudygroupQuery(id);
  const [
    updateStudyGroupSubscription,
    {
      data,
      isLoading: updateStudyGroupSubscriptionLoading,
      error: updateError,
    },
  ] = useUpdateStudyGroupSubscriptionMutation();
  const [SubsType, setSubsTYpe] = useState("");

  useEffect(() => {
    if (studygroup) {
      setSubsTYpe(studygroup.subscription_type);
    }
  }, [studygroup]);

  const changeSubscription = (val) => {
    let data = {
      id: studygroup.id,
      subscription_type: val,
    };
    setSubsTYpe(val);
    updateStudyGroupSubscription(data).then((res) => {});
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>Twtor Study Group - {id}</CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={12}>Name : {studygroup?.name}</CCol>
          <CCol md={12}>Description : {studygroup?.description}</CCol>
          <CCol md={12}>
            <span>
              Chapters :{" "}
              <b>
                {studygroup && studygroup.books && studygroup.books.length > 0
                  ? studygroup.books[0].chapter.length
                  : 0}
              </b>
            </span>
            <span className="mx-2">
              Problems :{" "}
              <b>
                {studygroup &&
                studygroup.books &&
                studygroup.books.length > 0 &&
                studygroup.books[0].chapter.length > 0
                  ? studygroup.books[0].chapter.reduce((prev, item) => {
                      return prev + item.problems.length;
                    }, 0)
                  : 0}
              </b>
            </span>
            <span>
              Solutions :{" "}
              <b>
                {studygroup &&
                studygroup.books &&
                studygroup.books.length > 0 &&
                studygroup.books[0].chapter.length > 0
                  ? studygroup.books[0].chapter.reduce((prev, item) => {
                      return (
                        prev +
                        item.problems.reduce((prev, item) => {
                          return prev + item.soluation.length;
                        }, 0)
                      );
                    }, 0)
                  : 0}
              </b>
            </span>
          </CCol>
          {(SubsType == 1 || SubsType == 0) && (
            <CCol md={12}>
              Study Group Type
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={SubsType}
                  onChange={(e) => changeSubscription(e.target.checked)}
                  disabled={updateStudyGroupSubscriptionLoading}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {SubsType == 0 ? "Free Subscription" : "Paid Subscription"}
                </label>
                {updateStudyGroupSubscriptionLoading && (
                  <div className="font-weight-bold text-primary">
                    Changing...
                    <Loader />
                  </div>
                )}
              </div>
            </CCol>
          )}
          <CCol md={12}>
            <StudyGroupNavigation
              studygroup={studygroup}
              isOwner={""}
              isMember={""}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}

export default Studygroup;
