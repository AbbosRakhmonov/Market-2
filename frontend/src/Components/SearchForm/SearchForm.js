import SelectForm from '../Select/SelectForm'
import FilterButtons from '../FilterButtons/FilterButtons'
import SearchInput from '../Inputs/SearchInput'
import FieldContainer from '../FieldContainer/FieldContainer'

function SearchForm({
    filterByTotal,
    searchByCode,
    filterByCode,
    filterByCodeAndNameWhenPressEnter,
    searchByName,
    filterByName,
    filterBy,
    searchByCategory,
    filterByCategory,
}) {
    return (
        <div className='flex items-stretch gap-[1.875rem] mainPadding'>
            {/* filter by total dropdown*/}
            {filterBy.includes('total') && (
                <SelectForm onSelect={filterByTotal} />
            )}

            {/* maxsulot kodi bo`yicha qidirish */}
            {filterBy.includes('code') && (
                <FilterButtons
                    label={'Maxsulot kodi'}
                    element={
                        <FieldContainer
                            placeholder={'misol: 000000'}
                            type={'text'}
                            maxWidth={'w-[7.4375rem]'}
                            value={searchByCode}
                            onChange={filterByCode}
                            onKeyUp={filterByCodeAndNameWhenPressEnter}
                        />
                    }
                />
            )}

            {/* maxsulot kategoriyasi bo`yicha qidirish */}
            {filterBy.includes('category') && (
                <SearchInput
                    placeholder={'kategoriya nomi...'}
                    someClasses={'grow'}
                    value={searchByCategory}
                    onChange={filterByCategory}
                    onKeyUp={filterByCodeAndNameWhenPressEnter}
                />
            )}

            {/* maxsulot nomi bo`yicha qidirish */}
            {filterBy.includes('name') && (
                <SearchInput
                    placeholder={'maxsulot nomi...'}
                    someClasses={'grow'}
                    value={searchByName}
                    onChange={filterByName}
                    onKeyUp={filterByCodeAndNameWhenPressEnter}
                />
            )}
        </div>
    )
}

export default SearchForm
