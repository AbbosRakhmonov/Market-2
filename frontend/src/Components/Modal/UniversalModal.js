import Modal from 'react-modal'
import ModalHeader from './ModalHeader'
import Approve from './ModalBodys/Approve'

function UniversalModal({
    isOpen,
    toggleModal,
    body,
    approveFunction,
    closeModal,
}) {
    const switchBody = () => {
        switch (body) {
            case 'approve':
                return (
                    <Approve
                        approveFunction={approveFunction}
                        toggleModal={toggleModal}
                    />
                )
            default:
                return 'Bunday jadval topilmadi'
        }
    }
    return (
        <Modal
            isOpen={isOpen}
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