import React from 'react'
import { Table, Icon, Tag } from 'antd'
import { getRecordClass } from '@/untils'
import DetailTable from './DetailTable'
import ErrorButton from './ErrorButton'

export const file = '/Users/harry.hou/Desktop/harry/salesforce/salesforce-cti-widget/'

const renderStatus = ({
  numPassingTests,
  numFailingTests,
  numPendingTests,
}) => {
  let tagsInfo
  if (numFailingTests === 0 && numPendingTests === 0) {
    tagsInfo = <span style={{ color: '#52c41a' }}>
      <Tag color='#52c41a' className='one_tag'>
        All Passd
        <span>{numPassingTests}</span>
        <Icon type='check-circle' theme='outlined' />
      </Tag>
    </span>
  } else {
    tagsInfo = <span>
      <Tag color='#52c41a'>{numPassingTests}</Tag>
      {!!numFailingTests && <Tag color='#cf1322'>{numFailingTests}</Tag>}
      {!!numPendingTests && <Tag color='#faad14'>{numPendingTests}</Tag>}
    </span>
  }

  return (
    <div className='mian_table_tags'>
      {tagsInfo}
    </div>
  )
}

const columns = [
  {
    title: 'File',
    dataIndex: 'testFilePath',
    key: 'name',
    render: text => {
      const relativePath = text.replace(new RegExp('^' + file), '')
      return <span>
        <Icon type='file' theme='twoTone' />
        <span className='path_text'> {relativePath}</span>
      </span>
    }
  },
  { title: 'Status', key: 'status', render: renderStatus, width: '150px' },
  {
    width: '100px',
    title: 'Action',
    key: 'operation',
    render: ({ failureMessage }) => <ErrorButton failureMessage={failureMessage} />
  },
]

const TableItem = ({ data }) =>
  <Table
    size='small'
    pagination={false}
    rowKey='testFilePath'
    rowClassName={({ numFailingTests, numPendingTests }, index) => {
      let status = ''
      if (numFailingTests) status = 'failed'
      if (numPendingTests) status = 'pending'
      return getRecordClass(status, index)
    }}
    expandedRowRender={
      ({ testResults }) => <DetailTable data={testResults} />
    }
    columns={columns}
    dataSource={data} />

export default TableItem