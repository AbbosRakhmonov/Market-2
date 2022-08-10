import SearchInput from '../Inputs/SearchInput.js'
import SelectForm from '../Select/SelectForm.js'
import FilterButtons from '../FilterButtons/FilterButtons.js'
import FieldContainer from '../FieldContainer/FieldContainer.js'
import PrintBtn from '../Buttons/PrintBtn.js'
import {ConfirmBtn} from '../Buttons/SaveConfirmBtn.js'
import Dates from '../Dates/Dates.js'

function SearchForm(
    {
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
        barcode,
        filterByBarcode,
        filterByBarcodeWhenPressEnter
    }) {
    const chooseComponent = (key) => {
        switch (key) {
            case 'total':
                return <SelectForm key={'total_1'} onSelect={filterByTotal} />
            case 'category':
                return (
                    <FilterButtons
                        key={'category_1'}
                        label={'Kategoriya'}
                        element={
                            <FieldContainer
                                placeholder={'misol: 101'}
                                type={'text'}
                                value={searchByCategory}
                                onChange={filterByCategory}
                                maxWidth={'w-[6.8125rem]'}
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
                        key={'code_1'}
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
                        key={'id_1'}
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
                        key={'search_1'}
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
                        key={'yetkazuvchi_ismi_1'}
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
                        key={'mijoz_ismi_1'}
                        placeholder={'mijoz ismi...'}
                        someClasses={'grow basis-1/6'}
                        value={searchByClientName}
                        onChange={filterByClientName}
                        onKeyUp={filterByClientNameWhenPressEnter}
                    />
                )
            case 'checks':
                return (
                    <FilterButtons
                        key={'cheklar_soni_1'}
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
                return <PrintBtn key={'print_btn_1'} onClick={clickPrintBtn} />
            case 'startDate':
                return (
                    <FilterButtons
                        key={'start_date_1'}
                        label={'Boshlang\'ich sana'}
                        element={
                            <Dates
                                value={startDate}
                                onChange={setStartDate}
                                placeholder={'01.01.2021'}
                                maxWidth={'w-[6.625rem]'}
                            />
                        }
                    />
                )
            case 'endDate':
                return (
                    <FilterButtons
                        key={'end_date_1'}
                        label={'Tugash sana'}
                        element={
                            <Dates
                                value={endDate}
                                onChange={setEndDate}
                                placeholder={'05.06.2022'}
                                maxWidth={'w-[6.625rem]'}
                            />
                        }
                    />
                )
            case 'singleDate':
                return (
                    <FilterButtons
                        key={'single_date_1'}
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
                        key={'confirm_btn_1'}
                        text={'Yakunlash'}
                        onClick={clickConfirmBtn}
                    />
                )
            case 'barcode':
                return (<FilterButtons
                    key={'barcode_1'}
                    label={'Shtrix kodi'}
                    element={
                        <FieldContainer
                            placeholder={'misol: 10156678'}
                            type={'text'}
                            value={barcode}
                            onChange={filterByBarcode}
                            maxWidth={'w-[10rem]'}
                            onKeyUp={
                                filterByBarcodeWhenPressEnter
                            }
                        />
                    }
                />)
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
