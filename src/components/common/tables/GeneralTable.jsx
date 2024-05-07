import React from 'react'
import { Table } from 'antd'

const GeneralTable = (props) => {
    const { headers, tableData, isPagination, border } = props
    return (
        <Table
            dataSource={tableData}
            columns={headers}
            pagination={isPagination}
            bordered={border}
        />
    )
}

export default GeneralTable
