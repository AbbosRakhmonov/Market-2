import Modal from 'react-modal'
import ModalHeader from './ModalHeader'
import Approve from './ModalBodys/Approve'
import UploadExcel from './ModalBodys/UploadExcel'
import Complate from './ModalBodys/Complate.js'
import RegisterIncomingModal from './ModalBodys/RegisterIncomingModal'

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
}) {
    const customStyles = {
        content: {
            width: '90%',
            height: '85%',
            padding: '1.25rem',
            transform: 'auto',
        },
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
            case 'registerincomingbody':
                return (
                    <RegisterIncomingModal
                        product={product}
                        changeProduct={changeProduct}
                        approveFunction={approveFunction}
                        currency={currency}
                    />
                )
            default:
                return 'Bunday jadval topilmadi'
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            style={body !== 'approve' ? {...customStyles} : {}}
            onRequestClose={closeModal || toggleModal}
            closeTimeoutMS={200}
            contentLabel='Example Modal'
            appElement={document.getElementById('root') || undefined}
        >
            <ModalHeader toggleModal={closeModal || toggleModal} />
            {switchBody()}
        </Modal>
    )
}

export default UniversalModal
