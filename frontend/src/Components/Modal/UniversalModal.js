import Modal from 'react-modal'
import ModalHeader from './ModalHeader'
import Approve from './ModalBodys/Approve'
import UploadExcel from './ModalBodys/UploadExcel'
import Sell from './ModalBodys/Sell.js'
import Complate from './ModalBodys/Complate.js'
import RegisterIncomingModal from './ModalBodys/RegisterIncomingModal'
import Check from './ModalBodys/Check.js'
import AllChecks from './ModalBodys/AllChecks.js'
import StepperPage from './ModalBodys/StepperPage.js'
import AdminMarkets from './ModalBodys/AdminMarkets.js'
import { SavedSalesCheck } from '../SaleCheck/SavedSalesCheck.js'
import { useTranslation } from 'react-i18next';
import SalesList from './ModalBodys/SalesList';

function UniversalModal({
    isOpen,
    toggleModal,
    body,
    approveFunction,
    closeModal,
    excelData,
    headers,
    setCreatedData,
    createdData,
    headerText,
    title,
    product,
    changeProduct,
    currency,
    printedSelling,
    printedInventories,
    payment,
    addMarket
}) {

    const { t } = useTranslation(['common'])

    const customStyles = {
        content: {
            width: '90%',
            height: '85%',
            padding: '1.25rem',
            transform: 'auto'
        }
    }
    const modalFull = {
        content: {
            width: '100%',
            height: '100%',
            padding: '1rem',
            transform: 'auto'
        }
    }
    const switchBody = () => {
        switch (body) {
            case 'approve':
                return (
                    <Approve
                        headerText={headerText}
                        title={title}
                        approveFunction={approveFunction}
                        toggleModal={toggleModal}
                    />
                )
            case 'complete':
                return (
                    <Complate
                        headerText={headerText}
                        title={title}
                        approveFunction={approveFunction}
                        toggleModal={toggleModal}
                    />
                )
            case 'import':
                return (
                    <UploadExcel
                        excelData={excelData}
                        headers={headers}
                        createdData={createdData}
                        setCreatedData={setCreatedData}
                        approveFunction={approveFunction}
                        toggleModal={toggleModal}
                    />
                )
            case 'addPlus':
                return (
                    <SalesList
                        headers={headers}
                        approveFunction={approveFunction}
                        toggleModal={toggleModal}
                    />
                )
            case 'registerincomingbody':
                return (
                    <RegisterIncomingModal
                        product={product}
                        changeProduct={changeProduct}
                        approveFunction={approveFunction}
                        currency={currency}
                    />
                )
            case 'sell':
                return (
                    <Sell
                        toggleModal={toggleModal}
                        product={product}
                        approveFunction={approveFunction}
                        changeProduct={changeProduct}
                    />
                )
            case 'checkSell':
                return <Check returned={false} product={product} />
            case 'checkSellReturn':
                return <Check returned={true} product={product} />
            case 'checkPayment':
                return <Check payment={payment} isPayment={true} />
            case 'allChecks':
                return <AllChecks product={printedSelling} />
            case 'addMarket':
                return <StepperPage addMarket={addMarket} />
            case 'filterBranch':
                return <AdminMarkets product={product} approveFunction={approveFunction} toggleModal={toggleModal} />
            case 'savedsalescheck':
                return <SavedSalesCheck product={printedSelling} />
            // case 'checkInventory':
            //     return <AllCheckInventories product={printedInventories} />
            default:
                return t('Bunday jadval topilmadi')
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            style={
                body === 'checkSell' || body === 'allChecks' || body === 'addMarket' || body === 'filterBranch'
                    ? { ...modalFull }

                    : body === 'approve' || body === 'complete'
                        ? {}
                        : { ...customStyles }
            }
            onRequestClose={closeModal || toggleModal}
            closeTimeoutMS={100}
            contentLabel='Example Modal'
            appElement={document.getElementById('root') || undefined}
        >
            <ModalHeader toggleModal={closeModal || toggleModal} />
            {switchBody()}
        </Modal>
    )
}

export default UniversalModal
