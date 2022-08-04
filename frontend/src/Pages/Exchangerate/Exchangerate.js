import React from 'react'
import FieldContainer from '../../Components/FieldContainer/FieldContainer'
import Button from '../../Components/Buttons/BtnAddRemove'
import Table from '../../Components/Table/Table'

const Exchangerate = () => {
    const data = [
        {
            _id: 1,
            createdAt: new Date(),
            exchangenerate: '11 000',
        },
        {
            _id: 2,
            createdAt: new Date(),
            exchangenerate: '11 000',
        },
        {
            _id: 3,
            createdAt: new Date(),
            exchangenerate: '11 000',
        },
    ]
    const headers = [
        {title: '№', styles: 'w-[8%] text-left'},
        {title: 'Sana', styles: 'w-[17%] text-center'},
        {title: 'Kurs', styles: 'w-[67%] text-center'},
        {title: '', styles: 'w-[8%] text-center'},
    ]

    return (
        <section>
            <form
                className={
                    'flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200'
                }
            >
                <div className='exchangerate-style'>
                    <FieldContainer
                        value={''}
                        onChange={() => {}}
                        label={'Kurs narxi'}
                        placeholder={'misol: 11 000 UZS'}
                        maxWidth={'w-[30.75rem]'}
                        type={'number'}
                        border={true}
                    />
                    <div
                        className={'w-full flex gap-[1.25rem] grow w-[33.2rem]'}
                    >
                        <Button
                            onClick={() => {}}
                            add={true}
                            edit={false}
                            text={'Yangi valyuta qo`shish'}
                        />
                        <Button onClick={() => {}} text={'Tozalash'} />
                    </div>
                </div>
            </form>

            <div className='tableContainerPadding'>
                <Table
                    page={'exchange'}
                    data={data}
                    currentPage={0}
                    countPage={10}
                    headers={headers}
                    Edit={() => {}}
                    Delete={() => {}}
                />
            </div>
        </section>
    )
}

export default Exchangerate
