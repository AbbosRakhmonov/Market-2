import FieldContainer from '../FieldContainer/FieldContainer'
import Button from '../Buttons/BtnAddRemove'

function CreateProductForm({
                               stickyForm,
                               handleChangeCodeOfProduct,
                               codeOfProduct,
                               handleChangeNameOfProduct,
                               nameOfProduct,
                               numberOfProduct,
                               handleChangeNumberOfProduct,
                               unitOfProduct,
                               handleChangeUnitOfProduct,
                               handleChangePriceOfProduct,
                               priceOfProduct,
                               sellingPriceOfProduct,
                               handleChangeSellingPriceOfProduct,
                               handleEdit,
                               addNewProduct,
                               clearForm,
                               pageName,
                               unitOptions,
                               categoryOfProduct,
                               categoryOptions,
                               handleChangeCategoryOfProduct,
                               checkOfProduct,
                               handleChangeCheckOfProduct
                           }) {
    return (
        <form
            className={`flex gap-[1.25rem] bg-background flex-col mainPadding transition ease-linear duration-200 ${
                stickyForm ? 'stickyForm' : ''
            }`}
        >
            <div className={'flex gap-[2.5rem]'}>
                {/* -- maxsulotlar checki -- */}
                <FieldContainer
                    label={'Shtrix kodi'}
                    placeholder={'misol: 123456789'}
                    onChange={handleChangeCheckOfProduct}
                    value={checkOfProduct}
                    maxWidth={'w-[10rem]'}
                />

                {/* -- maxsulot kategoriyasi -- */}
                <FieldContainer
                    value={categoryOfProduct}
                    onChange={handleChangeCategoryOfProduct}
                    label={'Kategoriya nomi'}
                    placeholder={'tanlang...'}
                    select={true}
                    options={categoryOptions}
                    maxWidth={'w-[15rem]'}
                />

                {/* -- maxulot kodi -- */}
                <FieldContainer
                    label={'Maxsulot kodi'}
                    placeholder={'misol: 1234'}
                    onChange={handleChangeCodeOfProduct}
                    value={codeOfProduct}
                    type={'text'}
                    maxWidth={'w-[8.75rem]'}
                />

                {/* -- maxsulotlar nomi -- */}
                <FieldContainer
                    label={'Maxsulot nomi'}
                    placeholder={'misol: Acer'}
                    onChange={handleChangeNameOfProduct}
                    value={nameOfProduct}
                />
            </div>
            <div className={'flex gap-[2.5rem] items-end'}>
                {/* -- o`lchov birligi -- */}
                <FieldContainer
                    value={unitOfProduct}
                    onChange={handleChangeUnitOfProduct}
                    label={'O\'lchov birligi'}
                    placeholder={'tanlang...'}
                    select={true}
                    options={unitOptions}
                />

                {pageName !== 'accept' && (
                    <>
                        {/* -- maxsulotlar soni -- */}
                        <FieldContainer
                            value={numberOfProduct}
                            onChange={handleChangeNumberOfProduct}
                            label={'Maxsulot soni'}
                            placeholder={'misol: 100'}
                            type={'text'}
                        />
                    </>
                )}

                {pageName !== 'accept' && (
                    <>
                        {/* -- keltirilgan narxi -- */}
                        <FieldContainer
                            value={priceOfProduct}
                            onChange={handleChangePriceOfProduct}
                            label={'Keltirilgan narxi'}
                            placeholder={'misol: 100'}
                            type={'text'}
                        />

                        {/* -- sotish narxi -- */}
                        <FieldContainer
                            value={sellingPriceOfProduct}
                            onChange={handleChangeSellingPriceOfProduct}
                            label={'Sotish narxi'}
                            placeholder={'misol: 200'}
                            type={'text'}
                        />
                    </>
                )}
                <div className={'flex gap-[1.25rem] min-w-[20rem]'}>
                    <Button
                        onClick={stickyForm ? handleEdit : addNewProduct}
                        add={!stickyForm}
                        edit={stickyForm}
                        text={
                            stickyForm ? 'Saqlash' : 'Yangi maxsulot qo\'shish'
                        }
                    />
                    <Button onClick={clearForm} text={'Tozalash'} />
                </div>
            </div>
        </form>
    )
}

export default CreateProductForm
