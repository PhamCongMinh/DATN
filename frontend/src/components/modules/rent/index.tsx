import Image from 'next/image'
import { Button, Divider, Input, Select, Space, Typography } from 'antd'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import produce from 'immer'

import { FilterText } from '../../../constants/rent.constants'
import SearchIcon from '../../../assets/images/search_icon.png'
import House from '../../elements/house'
import SubContent from './components/subcontent'
import { RentNews, RentNewsType } from '../../../types'

import styles from './style.module.scss'
import DetailHouseContent from '../detail-house'

const { Text } = Typography

interface IProps {
  data: RentNews[]
  handleSearch: (searchData: TSearch) => void
  appliedFilter: TSearch
  setReload: () => void
}

enum inputType {
  CITY = 'city',
  DISTRICT = 'district',
  COMMUNE = 'commune',
  MINAREA = 'minArea',
  MAXAREA = 'maxArea',
  MINPRICE = 'minPricePerMonth',
  MAXPRICE = 'maxPricePerMonth'
}

export type TSearch = {
  city?: string
  district?: string
  commune?: string
  minArea?: number
  maxArea?: number
  minPricePerMonth?: number
  maxPricePerMonth?: number
  rentNewsType?: RentNewsType
}

const initialState: TSearch = {}

const RentContent: React.FC<IProps> = (props): JSX.Element => {
  const [extendedFilter, setExtendedFilter] = useState<boolean>(false)
  const [state, setState] = useState<TSearch>(initialState)
  const [isOpenDetailHouse, setIsOpenDetailHouse] = useState<boolean>(false)
  const [detailHouse, setDetailHouse] = useState<RentNews>({} as RentNews)

  useEffect(() => {
    setState(props.appliedFilter)
    const newDataOfDetailHouse = props.data.find(rentNew => rentNew._id === detailHouse._id)
    if (!newDataOfDetailHouse) return
    setDetailHouse(newDataOfDetailHouse)
  }, [props.appliedFilter, detailHouse, props.data])

  const handleClickMoreOptions = useCallback(() => {
    setExtendedFilter(!extendedFilter)
  }, [extendedFilter])

  const handleChangeInput = useCallback((type: inputType, e: ChangeEvent<HTMLInputElement>) => {
    setState(prev =>
      produce(prev, draft => {
        // @ts-ignore
        // eslint-disable-next-line
        draft[type] = e.target.value
      })
    )
  }, [])

  const handleSelectRentNewsType = (value: string) => {
    setState(prev =>
      produce(prev, draft => {
        // @ts-ignore
        draft['rentNewsType'] = value
      })
    )
  }

  const handleClickSearch = useCallback(() => {
    props.handleSearch(state)
  }, [state])

  const handleClickHouseDetail = useCallback((rentNews: RentNews) => {
    setDetailHouse(rentNews)
    setIsOpenDetailHouse(true)
    console.log('rentNews', rentNews)
  }, [])

  const handleClickBack = useCallback(() => {
    setIsOpenDetailHouse(false)
  }, [])

  return (
    <div>
      {isOpenDetailHouse === false && (
        <div className={styles.container}>
          <Space className={styles.filter}>
            <Input
              placeholder={FilterText.CITY}
              className={styles.input}
              value={state?.city}
              onChange={e => handleChangeInput(inputType.CITY, e)}
            />
            <Input
              placeholder={FilterText.DISTRICT}
              className={styles.input}
              value={state?.district}
              onChange={e => handleChangeInput(inputType.DISTRICT, e)}
            />
            <Input
              placeholder={FilterText.COMMUNE}
              className={styles.input}
              value={state?.commune}
              onChange={e => handleChangeInput(inputType.COMMUNE, e)}
            />
            <Input
              placeholder={FilterText.MINPRICE}
              className={styles.input}
              value={state?.minPricePerMonth}
              onChange={e => handleChangeInput(inputType.MINPRICE, e)}
            />
            <Button className={styles.button_option} onClick={handleClickMoreOptions}>
              More Options
            </Button>
            <Button
              icon={<Image src={SearchIcon} alt="search" style={{ width: 45, height: 45 }} />}
              className={styles.button}
              onClick={handleClickSearch}
            />
          </Space>

          {extendedFilter === true && (
            <Space className={styles.filter}>
              <Input
                placeholder={FilterText.MAXPRICE}
                className={styles.input}
                value={state?.maxPricePerMonth}
                onChange={e => handleChangeInput(inputType.MAXPRICE, e)}
              />
              <Input
                placeholder={FilterText.MINAREA}
                className={styles.input}
                value={state?.minArea}
                onChange={e => handleChangeInput(inputType.MINAREA, e)}
              />
              <Input
                placeholder={FilterText.MAXAREA}
                className={styles.input}
                value={state?.maxArea}
                onChange={e => handleChangeInput(inputType.MAXAREA, e)}
              />
              <Select
                defaultValue=""
                className={styles.select}
                onChange={handleSelectRentNewsType}
                value={state?.rentNewsType}
                options={[
                  { value: '', label: 'Tất cả' },
                  { value: RentNewsType.TYPE1, label: 'Phòng trọ' },
                  { value: RentNewsType.TYPE2, label: 'Nhà thuê nguyên căn' },
                  { value: RentNewsType.TYPE3, label: 'Căn hộ mini' },
                  { value: RentNewsType.TYPE4, label: 'Homestay' }
                ]}
              />
            </Space>
          )}

          <Divider style={{ marginTop: 10 }} />

          <Space className={styles.content}>
            <div style={{ minWidth: 1008, textAlign: 'center' }}>
              {props.data.length !== 0 ? (
                props.data.map(rentNews => (
                  <House
                    key={rentNews._id}
                    title={rentNews.title}
                    price={rentNews.pricePerMonth.toString()}
                    description={rentNews.description}
                    onClick={() => handleClickHouseDetail(rentNews)}
                  />
                ))
              ) : (
                <Text className={styles.text}>{'Dữ liệu không tồn tại'}</Text>
              )}
            </div>
            <div style={{ width: 550, display: 'flex', justifyContent: 'center' }}>
              <SubContent />
            </div>
          </Space>
        </div>
      )}
      {isOpenDetailHouse === true && (
        <DetailHouseContent rentNews={detailHouse} handleClickBack={handleClickBack} setReload={props.setReload} />
      )}
    </div>
  )
}

export default RentContent
