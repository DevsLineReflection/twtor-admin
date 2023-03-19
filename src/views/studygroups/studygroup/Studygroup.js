import React from "react";
import { useParams } from "react-router-dom";
import { useGetbookclubQuery } from "src/features/bookclub/bookclubApi";
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

function Studygroup() {
  const { id } = useParams();
  const {
    data: bookclub,
    isLoading,
    error,
    isFetching,
  } = useGetbookclubQuery(id);

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
