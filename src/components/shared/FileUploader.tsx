import { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([]);
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [file])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept : {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        }
    });

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer' >
            <input {...getInputProps()} className='cursor-pointer' />
            {fileUrl ? (
                <>
                    <div className='flex flex-1 justify-center p-4 w-full'>
                        <img src={fileUrl} alt="image" className='file_uploader-img'/>
                    </div>
                    <p className='file_uploader-label'>Click or drag photo to replace</p>
                </>
            ) : (
                <div className='file_uploader-box'>
                    <img
                        src='/assets/icons/file-upload.png'
                        width={70}
                        height={70}
                        alt='file-upload'
                        className='svg-icon-primary-500 opacity-90'
                    />
                    <h3 className='text-light-2 base-medium mb-2 mt-6'>Drag & drop your images here</h3>
                    <p className='text-light-4 small-regular mb-6 h3-bold'>SVG, PNG, JPEG</p>

                    <Button className='shad-button_dark_2'>
                        Select from your device
                    </Button>
                </div>
            )}
        </div>
    )
}

export default FileUploader
