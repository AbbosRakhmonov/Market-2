import React, {useState} from 'react'
import Stepper from '../../Components/Stepper/Stepper'
import CreateDirector from '../steps/CreateDirector'
import CreateShop from '../steps/CreateShop'
import ImageCrop from '../../Components/ImageCrop/ImageCrop'
import {useDispatch, useSelector} from 'react-redux'
import {
    successAddUnitMessage,
    successDeleteUnitMessage,
    successUpdateUnitMessage,
    universalToast,
    warningEmptyInput,
} from '../../Components/ToastMessages/ToastMessages.js'
import {
    clearErrorStepper,
    clearSuccessAddShop,
    clearSuccessAddDirector,
    sendCropImg,
    addShop,
    addDirector,
} from './stepperSlice'
import UniversalModal from '../../Components/Modal/UniversalModal.js'
import Spinner from '../../Components/Spinner/SmallLoader.js'

function StepperPage() {
    const dispatch = useDispatch()
    const {
        stepImgName,
        steppers,
        stepLoading,
        errorStepper,
        successAddShop,
        successAddDirector,
    } = useSelector((state) => state.steppers)

    const [currentStep, setCurrentStep] = useState(1)

    const [bgActive, setBgActive] = useState(false)

    const steps = [
        {title: "Do'kon yaratish", stepIndex: 1},
        {title: 'Direktor yaratish', stepIndex: 2},
    ]

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <CreateShop handleClickNext={handleClickNext} />
            case 2:
                return <CreateDirector handleClickBack={handleClickBack} />
            default:
        }
    }

    const handleClickBack = () => {
        if (currentStep > 1 && currentStep <= steps.length) {
            setCurrentStep(currentStep - 1)
            setBgActive(false)
        }
    }

    const handleClickNext = (e, shopData) => {
        const body = {
            name: shopData.shopName,
            organitionName: shopData.organizationName,
            image: 'sadgadfg',
            phone1: shopData.phoneNumber1,
            phone2: shopData.phoneNumber2,
            phone3: shopData.phoneNumber3,
            bank: shopData.bankName,
            bankNumber: '8678796',
            inn: Number(shopData.innName),
            address: shopData.addressName,
            orientation: shopData.orientation,
        }

        e.preventDefault()
        console.log('Shop data: ', shopData)
        dispatch(addShop(body)).then(({error}) => {
            if (!error) {
                setCurrentStep(currentStep + 1)
                setBgActive(true)
            }
        })
    }

    return (
        <div className='mainPadding w-full overflow-hidden'>
            <Stepper
                steps={steps}
                currentStep={currentStep}
                bgActive={bgActive}
            />
            <ImageCrop />
            {displayStep(currentStep)}
        </div>
    )
}

export default StepperPage
