import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetbookclubQuery,
  useUpdateBookClubSubscriptionMutation,
} from "src/features/bookclub/bookclubApi";
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
import BookClubNavigation from "src/components/BookClubNavigation";
import axios from "src/lib/axios";
import Loader from "src/components/utils/Loader";

function Studygroup() {
  const { id } = useParams();
  const {
    data: bookclub,
    isLoading,
    error,
    isFetching,
  } = useGetbookclubQuery(id);
  const [
    updateBookClubSubscription,
    { data, isLoading: updateBookClubSubscriptionLoading, error: updateError },
  ] = useUpdateBookClubSubscriptionMutation();
  const [SubsType, setSubsTYpe] = useState("");

  useEffect(() => {
    if (bookclub) {
      setSubsTYpe(bookclub.subscription_type);
    }
  }, [bookclub]);

  const changeSubscription = (val) => {
    let data = {
      id: bookclub.id,
      subscription_type: val,
    };
    setSubsTYpe(val);
    updateBookClubSubscription(data).then((res) => {});
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>Twtor Study Group - {id}</CCardHeader>
      <CCardBody>
        <CRow className="justify-content-center">
          <CCol md={12}>Name : {bookclub?.name}</CCol>
          <CCol md={12}>Description : {bookclub?.description}</CCol>
          <CCol md={12}>
            <span>
              Chapters :{" "}
              <b>
                {bookclub && bookclub.books && bookclub.books.length > 0
                  ? bookclub.books[0].chapter.length
                  : 0}
              </b>
            </span>
            <span className="mx-2">
              Problems :{" "}
              <b>
                {bookclub &&
                bookclub.books &&
                bookclub.books.length > 0 &&
                bookclub.books[0].chapter.length > 0
                  ? bookclub.books[0].chapter.reduce((prev, item) => {
                      return prev + item.problems.length;
                    }, 0)
                  : 0}
              </b>
            </span>
            <span>
              Solutions :{" "}
              <b>
                {bookclub &&
                bookclub.books &&
                bookclub.books.length > 0 &&
                bookclub.books[0].chapter.length > 0
                  ? bookclub.books[0].chapter.reduce((prev, item) => {
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
                  disabled={updateBookClubSubscriptionLoading}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {SubsType == 0 ? "Free Subscription" : "Paid Subscription"}
                </label>
                {updateBookClubSubscriptionLoading && (
                  <div className="font-weight-bold text-primary">
                    Changing...
                    <Loader />
                  </div>
                )}
              </div>
            </CCol>
          )}
          <CCol md={12}>
            <BookClubNavigation
              bookclub={bookclub}
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
