import React from 'react'
import SearchInput from '../../Components/Inputs/SearchInput'
import Button from '../../Components/Buttons/BtnAddRemove'
import Table from '../../Components/Table/Table'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'

function Unit() {
    const data = [{name: 'Militsiya'}, {name: 'Militsiya2'}]

    const headers = [
        {styles: 'w-[10%] text-start', filter: '', title: '№'},
        {
            styles: 'w-[80%] text-start',
            filter: '',
            title: "O'lchov birligi nomi",
        },
        {styles: 'w-[10%]', filter: '', title: ' '},
    ]

    return (
        <section>
            <form className='unitFormStyle'>
                <FieldContainer
                    label={'Olchov birligini kiriting'}
                    placeholder={'misol: kg'}
                    maxWidth={'w-[43.75rem]'}
                />

                <div className={'flex gap-[1.25rem] grow items-end'}>
                    <Button add={true} text={`Yangi o'lchov qo'shish`} />
                    <Button text={'Tozalash'} />
                </div>
            </form>

            <div className='mainPadding text-[1.25rem] text-blue-900'>
                {' '}
                O'lchov birliklari
            </div>

            <div className='mainPadding'>
                <SearchInput placeholder={`qidirish...`} />
            </div>

            <div className='tableContainerPadding'>
                <Table
                    page='unit'
                    currentPage={3}
                    countPage={3}
                    data={data}
                    headers={headers}
                />
            </div>
        </section>
    )
}

export default Unit