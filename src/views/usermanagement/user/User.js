import React from "react";
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
} from "@coreui/react";
import { useGetUserByIdQuery } from "src/features/user/userApi";
import { Link, useParams } from "react-router-dom";
import {
  useGetmemberstudygroupsQuery,
  useGetuserstudygroupsQuery,
} from "src/features/studygroup/studygroupApi";
import GetBadge from "src/lib/GetBadge";
import Moment from "react-moment";

function User() {
  const { id } = useParams();
  const { data: user, isLoading, error, isFetching } = useGetUserByIdQuery(id);
  const {
    data: studyGroupsOwner,
    isLoading: studyGroupsOwnerLoading,
    error: studyGroupsOwnerError,
  } = useGetuserstudygroupsQuery(id);
  const {
    data: studyGroupsMember,
    isLoading: studyGroupsMemberLoading,
    error: studyGroupsMemberError,
  } = useGetmemberstudygroupsQuery(id);

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Twtor User - {id}</CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  Name : {user?.name}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Email: {user?.email}
                </CTableHeaderCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="col">
                  Study Group Owner :{" "}
                  {!studyGroupsOwnerLoading && studyGroupsOwner ? (
                    <>{studyGroupsOwner.length}</>
                  ) : (
                    <>0</>
                  )}
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <CTableHeaderCell scope="col">
                    Study Group Member :{" "}
                    {!studyGroupsMemberLoading && studyGroupsMember ? (
                      <>{studyGroupsMember.length}</>
                    ) : (
                      <>0</>
                    )}
                  </CTableHeaderCell>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody></CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Study Group </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Access Right</CTableHeaderCell>
                <CTableHeaderCell scope="col">Subscription</CTableHeaderCell>
                <CTableHeaderCell scope="col">Active</CTableHeaderCell>
                <CTableHeaderCell scope="col">User Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created On</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {studyGroupsOwnerLoading ? (
                <>
                  <CTableRow>
                    <CTableDataCell className="text-center" colSpan={9}>
                      Loading...
                    </CTableDataCell>
                  </CTableRow>
                </>
              ) : (
                <>
                  {studyGroupsOwner?.map((item) => (
                    <>
                      <CTableRow>
                        <CTableHeaderCell scope="row">
                          {item.id}
                        </CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>

                        <CTableDataCell>
                          <CBadge color={GetBadge(item.public_or_private)}>
                            {item.public_or_private ? "Private" : "Public"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={GetBadge(item.subscription_type)}>
                            {item.subscription_type ? "Paid" : "Free"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={GetBadge(item.is_active)}>
                            {item.is_active ? "Active" : "Inactive"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>Owner</CTableDataCell>
                        <CTableDataCell>{item.owner.email}</CTableDataCell>
                        <CTableDataCell>
                          {item.created_at ? (
                            <Moment format="DD-MMM-YYYY LT">
                              {item.created_at}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="primary">Details</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
                  {studyGroupsMember?.map((item) => (
                    <>
                      <CTableRow>
                        <CTableHeaderCell scope="row">
                          {item.study_group_id}
                        </CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>

                        <CTableDataCell>
                          <CBadge color={GetBadge(item.public_or_private)}>
                            {item.public_or_private ? "Private" : "Public"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={GetBadge(item.subscription_type)}>
                            {item.subscription_type ? "Paid" : "Free"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CBadge color={GetBadge(item.is_active)}>
                            {item.is_active ? "Active" : "Inactive"}
                          </CBadge>
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.user_type == 1 ? "Moderator" : "Member"}
                        </CTableDataCell>
                        <CTableDataCell>{item.owner.email}</CTableDataCell>
                        <CTableDataCell>
                          {item.created_at ? (
                            <Moment format="DD-MMM-YYYY LT">
                              {item.created_at}
                            </Moment>
                          ) : (
                            ""
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="primary">Details</CButton>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  ))}
                </>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
}

export default User;
