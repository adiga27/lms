"use-clinet"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

type FileUploadProps = {
    courseId:string
    onChange: (imageUrl?: string,imageKey?: string) => void;
}

function ImageUpload({courseId,onChange}:FileUploadProps) {
    const fileTypes = ["JPG", "PNG", "JPEG","WEBP"];
    const formdata = new FormData(); 
    const [isupload,setIsUpload] = useState<boolean>(false);
    const [isFailed,setIsFailed] = useState<boolean>(false);

    const fetchUrl = async (file:File|string) => {
        try{
            formdata.append("file",file);
            formdata.append("id",courseId);

            const {data} = await axios.post(`/api/image`,formdata);
        
            if(!data){
                setIsFailed(true);
                setIsUpload(false);
                return toast.error("Something went wrong");
            }

            if(data.status === "success"){
                console.log(data);
                onChange(data.url,data.key);
            }
            else{
                toast.error("Something Went Wrong");
            }
        }catch(err){
            console.error(err);
            toast.error("Something Went Wrong");
            setIsFailed(true);
            setIsUpload(false);
        }
    }
    
    const handleChange =(file:File|string) => {
        setIsFailed(false);
        setIsUpload(true);
        fetchUrl(file);
    };
    const onTypeError = ()=>{
        toast.error("jpg, jpeg and png are accepted");
    }
    const onSizeError = ()=>{
        toast.error("Minimum 4mb size accepted");
    }
  return (
    <div >
        {!isupload || isFailed ? <FileUploader 
            handleChange={handleChange} 
            name="file" 
            types={fileTypes} 
            onTypeError={onTypeError}
            maxSize={4}
            onSizeError={onSizeError}
            label="Upload or drop a file" 
            hoverTitle="Drop here"
        /> : 
        <div className="flex gap-x-2 items-center text-base text-sky-700 mt-2">
            <Loader2 className="h-8 w-8 text-sky-700 animate-spin" />
            Uploading...
        </div>}
    </div>
  );
}

export default ImageUpload;