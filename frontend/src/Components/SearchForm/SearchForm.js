import SearchInput from '../Inputs/SearchInput.js'
import SelectForm from '../Select/SelectForm.js'
import FilterButtons from '../FilterButtons/FilterButtons.js'
import FieldContainer from '../FieldContainer/FieldContainer.js'
import PrintBtn from '../Buttons/PrintBtn.js'
import {ConfirmBtn} from '../Buttons/SaveConfirmBtn.js'
import Dates from '../Dates/Dates.js'
import {uniqueId} from 'lodash'

function SearchForm({
    filterByTotal,
    searchByCode,
    searchById,
    searchByDelivererName,
    filterByDelivererName,
    filterByDelivererNameWhenPressEnter,
    searchByClientName,
    filterByClientName,
    filterByClientNameWhenPressEnter,
    filterById,
    filterByIdWhenPressEnter,
    filterByCode,
    filterByCodeAndNameAndCategoryWhenPressEnter,
    searchByName,
    filterByName,
    filterBy,
    searchByCategory,
    filterByCategory,
    numberOfChecks,
    setNumberOfChecks,
    clickPrintBtn,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    date,
    setDate,
    clickConfirmBtn,
}) {
    const chooseComponent = (key) => {
        switch (key) {
            case 'total':
                return (
                    <SelectForm
                        key={uniqueId('select')}
                        onSelect={filterByTotal}
                    />
                )
            case 'category':
                return (
                    <FilterButtons
                        key={uniqueId('category')}
                        label={'Kategoriya'}
                        element={
                            <FieldContainer
                                placeholder={'misol: 101'}
                                type={'text'}
                                value={searchByCategory}
                                onChange={filterByCategory}
                                onKeyUp={
                                    filterByCodeAndNameAndCategoryWhenPressEnter
                                }
                            />
                        }
                    />
                )
            case 'code':
                return (
                    <FilterButtons
                        key={uniqueId('code')}
                        label={'Maxsulot kodi'}
                        element={
                            <FieldContainer
                                placeholder={'misol: 1234'}
                                type={'text'}
                                maxWidth={'w-[6.8125rem]'}
                                value={searchByCode}
                                onChange={filterByCode}
                                onKeyUp={
                                    filterByCodeAndNameAndCategoryWhenPressEnter
                                }
                            />
                        }
                    />
                )
            case 'id':
                return (
                    <FilterButtons
                        key={uniqueId('id')}
                        label={'ID'}
                        element={
                            <FieldContainer
                                placeholder={'misol: 1234'}
                                type={'text'}
                                maxWidth={'w-[6.8125rem]'}
                                value={searchById}
                                onChange={filterById}
                                onKeyUp={filterByIdWhenPressEnter}
                            />
                        }
                    />
                )
            case 'name':
                return (
                    <SearchInput
                        key={uniqueId('qidirish')}
                        placeholder={'qidirish...'}
                        someClasses={'grow'}
                        value={searchByName}
                        onChange={filterByName}
                        onKeyUp={filterByCodeAndNameAndCategoryWhenPressEnter}
                    />
                )
            case 'delivererName':
                return (
                    <SearchInput
                        key={uniqueId('yetkazuvchi-ismi')}
                        placeholder={'yetkazuchi ismi...'}
                        someClasses={'grow'}
                        value={searchByDelivererName}
                        onChange={filterByDelivererName}
                        onKeyUp={filterByDelivererNameWhenPressEnter}
                    />
                )
            case 'clientName':
                return (
                    <SearchInput
                        key={uniqueId('mijoz-ismi')}
                        placeholder={'mijoz ismi...'}
                        someClasses={'grow'}
                        value={searchByClientName}
                        onChange={filterByClientName}
                        onKeyUp={filterByClientNameWhenPressEnter}
                    />
                )
            case 'checks':
                return (
                    <FilterButtons
                        key={uniqueId('cheklar-soni')}
                        label={'Cheklar soni'}
                        element={
                            <FieldContainer
                                placeholder={'misol: 10'}
                                type={'text'}
                                maxWidth={'w-[4.8125rem]'}
                                value={numberOfChecks}
                                onChange={setNumberOfChecks}
                            />
                        }
                    />
                )
            case 'printBtn':
                return (
                    <PrintBtn
                        key={uniqueId('print-btn')}
                        onClick={clickPrintBtn}
                    />
                )
            case 'startDate':
                return (
                    <FilterButtons
                        key={uniqueId('start-date')}
                        label={"Boshlang'ich sana"}
                        element={
                            <Dates
                                value={startDate}
                                onChange={setStartDate}
                                placeholder={'misol: 01.01.2021'}
                                maxWidth={'w-[9.6875rem]'}
                            />
                        }
                    />
                )
            case 'endDate':
                return (
                    <FilterButtons
                        label={'Tugash sana'}
                        element={
                            <Dates
                                value={endDate}
                                onChange={setEndDate}
                                placeholder={'misol: 05.06.2022'}
                                maxWidth={'w-[9.6875rem]'}
                            />
                        }
                    />
                )
            case 'singleDate':
                return (
                    <FilterButtons
                        key={uniqueId('single-date')}
                        label={'Sanani tanlang'}
                        element={
                            <Dates
                                value={date}
                                onChange={setDate}
                                placeholder={'misol: 02.02.2022'}
                                maxWidth={'w-[9.6875rem]'}
                            />
                        }
                    />
                )
            case 'confirmBtn':
                return (
                    <ConfirmBtn
                        key={uniqueId('confirm')}
                        text={'Yakunlash'}
                        onClick={clickConfirmBtn}
                    />
                )
            default:
                return null
        }
    }
    return (
        <div className='flex items-end gap-[1.875rem] mainPadding'>
            {filterBy.map((key) => chooseComponent(key))}
        </div>
    )
}

export default SearchForm
