/* eslint-disable react/prop-types */
import { Dropdown, MenuProps, Table, TableProps } from 'antd'
import ButtonOutlined from '../button-custom/ButtonOutlined'
import CustomInput from '../Input'
// import { ReactComponent as FilterIcon } from 'assets/icons/common/filter.svg'
// import { ReactComponent as SearchIcon } from 'assets/icons/meeting/search.svg'
import ButtonGroup from 'antd/es/button/button-group'
import CustomEmpty from '../empty'
import styles from './style.module.scss'
export enum MeetingTimeFilter {
  ALL = '',
  LASTWEEK = 'LAST_WEEK',
  LASTMONTH = 'LAST_MONTH'
}

interface ITable extends TableProps<any> {
  placeholder?: string
  hiddenFilter?: boolean
  hiddenFilterDate?: boolean
  hiddenPagination?: boolean
  hiddenFilterBtn?: boolean
  paginate?: {
    curPage: number
    totalPages: number
    setPage: React.Dispatch<React.SetStateAction<number>>
  }
  timeFilter?: MeetingTimeFilter
  setTimeFilter?: React.Dispatch<React.SetStateAction<MeetingTimeFilter>>
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>
  filterOptions?: MenuProps['items']
  onSearch?: (val: string) => void
}

const TableCustom: React.FC<ITable> = ({
  placeholder = 'Search',
  hiddenFilter,
  hiddenFilterDate,
  hiddenPagination,
  hiddenFilterBtn,
  paginate,
  filterOptions,
  timeFilter,
  setTimeFilter,
  setCurrentPage,
  onSearch,
  ...props
}) => {
  const getStateBtn = (value: MeetingTimeFilter) => {
    if (value === timeFilter) return 'btn-selected'
    return ''
  }

  const onChangeTimeFilter = (value: MeetingTimeFilter) => {
    setTimeFilter?.(value)
    setCurrentPage?.(1)
  }

  return (
    <div className={styles['table-custom-container']}>
      {!hiddenFilter && (
        <div className={styles['table-custom-filter']}>
          {!hiddenFilterDate && (
            <ButtonGroup className={styles['filter-btn-group']}>
              <ButtonOutlined
                btnType="base"
                height={40}
                className={getStateBtn(MeetingTimeFilter.ALL)}
                onClick={() => onChangeTimeFilter(MeetingTimeFilter.ALL)}
              >
                All
              </ButtonOutlined>
              <ButtonOutlined
                btnType="base"
                height={40}
                className={getStateBtn(MeetingTimeFilter.LASTWEEK)}
                onClick={() => onChangeTimeFilter(MeetingTimeFilter.LASTWEEK)}
              >
                Last Week
              </ButtonOutlined>
              <ButtonOutlined
                btnType="base"
                height={40}
                className={getStateBtn(MeetingTimeFilter.LASTMONTH)}
                onClick={() => onChangeTimeFilter(MeetingTimeFilter.LASTMONTH)}
              >
                Last Month
              </ButtonOutlined>
            </ButtonGroup>
          )}
          <div className={styles[`search-filer-wrap ${hiddenFilterDate ? 'w-full gap-20' : ''}`]}>
            <CustomInput
              className={styles['search-input']}
              // prefix={<SearchIcon />}
              placeholder={placeholder}
              onChange={e => {
                console.log(e.target.value)
                onSearch && onSearch(e.target.value)
              }}
            />
            {!hiddenFilterBtn && (
              <Dropdown
                menu={{ items: filterOptions || [] }}
                placement="bottomRight"
                overlayClassName={styles['dropdown-filter']}
              >
                <ButtonOutlined
                  className={styles['filter-btn']}
                  btnType="base"
                  height={40}
                  // icon={<FilterIcon />}
                >
                  Filters
                </ButtonOutlined>
              </Dropdown>
            )}
          </div>
        </div>
      )}
      <Table
        className={styles['table-custom-content']}
        scroll={{ x: '100%' }}
        pagination={false}
        locale={{ emptyText: <CustomEmpty /> }}
        {...props}
      />

      {!hiddenPagination && (
        <div className={styles['meetings-pagination']}>
          <span className={styles['current-page']}>
            Page {paginate?.curPage} of {paginate?.totalPages}
          </span>
          <span className={styles['pagination-action']}>
            <ButtonOutlined
              className={styles['btn']}
              btnType="text-dark"
              height={36}
              disabled={paginate?.curPage === 1}
              onClick={() => paginate?.setPage(paginate.curPage - 1)}
            >
              Previous
            </ButtonOutlined>
            <ButtonOutlined
              className={styles['btn']}
              btnType="text-dark"
              height={36}
              disabled={paginate?.curPage === paginate?.totalPages}
              onClick={() => paginate?.setPage(paginate.curPage + 1)}
            >
              Next
            </ButtonOutlined>
          </span>
        </div>
      )}
    </div>
  )
}

export default TableCustom
