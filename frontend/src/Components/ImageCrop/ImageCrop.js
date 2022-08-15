import {useState} from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {IoCamera, IoClose} from 'react-icons/io5'
import Modal from 'react-modal'
import BtnAddRemove from '../Buttons/BtnAddRemove'
import {useDispatch, useSelector} from 'react-redux'
import { sendCropImg } from '../../Pages/StepperPage/stepperSlice'

const customStyles = {
    content: {
        width: '70%',
    },
}


function ImageCrop() {
    const dispatch = useDispatch()

    const [src, setSrc] = useState(null)
    const [crop, setCrop] = useState({ width:100,unit:"%", aspect: 1 / 1})
    const [image, setImage] = useState(null)
    const [output, setOutput] = useState(null)

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
                
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
       console.log(croppedImage);
       const formData = new FormData()
       formData.append("file", croppedImage)
       dispatch(sendCropImg(formData)).then(({error, payload}) => {
         if(!error){
           // setIsOpen(false)
            // setOutput()
            console.log("Payload: ", payload)
         }
       })
       
      }

    const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    
    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
     )

    const reader = new FileReader()
    canvas.toBlob(blob => {
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            dataURLtoFile(reader.result, 'cropped.jpg')
        }
    })


    }

    const handleClickFile = (e) => {
        e.target.value = null
    }

    let subtitle
    const [modalIsOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00'
    }

    function closeModal() {
        setIsOpen(false)
    }

    const handleFile = e => {
        
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            setIsOpen(true)
            setSrc(fileReader.result)
         //   console.log("Ee : ", e.fileReader.result)
          //  this.setState({src: fileReader.result })
        }   
        fileReader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className='w-full mb-[2.5rem]'>
            <center>
                <label
                    htmlFor='fileId'
                    className='relative w-[6.25rem] h-[6.25rem] rounded-full flex justify-center items-center shadow-[0px_5px_5px_rgba(0,0,0,0.15)] bg-white-900 cursor-pointer hover:bg-white-700 duration-200'
                >
                    {output ? (
                        <div className='w-full h-full'>
                            <div className='group w-full h-full rounded-full'>
                                <img
                                    src={output}
                                    className='object-cover w-full h-full rounded-full'
                                />
                                <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full hover:bg-black-500 duration-200 hidden group-hover:block'>
                                    <IoCamera
                                        size={`2.1875rem`}
                                        className='text-black-200 w-[2.1875rem] absolute top-1/3 right-1/3'
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='absolute w-full h-full rounded-full hover:bg-black-500 duration-200'>
                            <IoCamera
                                size={`2.1875rem`}
                                className='text-black-200 w-[2.1875rem] absolute top-1/3 right-1/3'
                            />
                        </div>
                    )}
                </label>
                <input
                    onClick={(e) => handleClickFile(e)}
                    className='hidden'
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleFile(e)}
                    id='fileId'
                />
                <br />
                <br />
            </center>
            {src && (
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel='Example Modal'
                >
                    <div>
                        <div className='flex justify-between'>
                            <h2 className=' font-medium text-[1.5rem] text-blue-800'>
                                Image Cropping
                            </h2>
                            <button
                                onClick={closeModal}
                                className='font-bold text-[2rem] text-blue-800'
                            >
                                <IoClose />
                            </button>
                        </div>

                        <div className='mt-4 w-full h-[25rem]'>
                            <ReactCrop
                                className='object-cover border m-2 h-[25rem] w-full'
                                src={src}
                                onImageLoaded={setImage}
                                crop={crop}
                                onChange={setCrop}
                            />
                            <br />
                        </div>
                        <div className='flex justify-center mt-[2.5rem]'>
                            <div>
                                <BtnAddRemove
                                    text='Yakunlash'
                                    add={true}
                                    edit={true}
                                    onClick={cropImageNow}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ImageCrop
