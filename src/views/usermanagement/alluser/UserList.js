import React from 'react'
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
} from '@coreui/react'

const UserList = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Twtor User List</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow active>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">3</CTableHeaderCell>
                <CTableDataCell colSpan={2} active>
                  Larry the Bird
                </CTableDataCell>
                <CTableDataCell>@twitter</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UserList
