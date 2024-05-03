import { Modal } from 'antd'
// import './DeleteConfirmationPopUp.css'

export const DeleteConfirmationPopUp = (props) => {
    const {
        setOpenDeletePopUp,
        openDeletePopUp,
        handleYes,
        handleNo,
        name,
        deleteType,
        key,
    } = props

    return (
        <Modal
            key={key}
            title={'Confirmation'}
            centered
            open={openDeletePopUp}
            onOk={() => {
                handleYes()
            }}
            okText={'Yes'}
            cancelText={'No'}
            // className="transparent-modal"
            // colorBgMask={"#ffffff"}
            // cancelButtonProps={{ style: { display: 'none' } }}
            onCancel={() => {
                handleNo()
            }}
            // maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            // mask={true}
        >
            <p>{`Are you sure you want to delete "${name}"?`}</p>
        </Modal>
    )
}
