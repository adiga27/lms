"use-clinet"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

type FileUploadProps = {
    courseId:string
    chapterId:string
    onChange: (videoUrl: string,videoKey: string) => void;
}

function VideoUpload({courseId,chapterId,onChange}:FileUploadProps) {
    const fileTypes = ["MP4","MKV","AVI","MOV"];
    const formdata = new FormData(); 
    const [isupload,setIsUpload] = useState<boolean>(false);
    const [isFailed,setIsFailed] = useState<boolean>(false);

    const fetchUrl = async (file:File) => {
        try{
            formdata.append("file",file);
            formdata.append("id",courseId);
            formdata.append("name",chapterId);
            

            const {data} = await axios.post(`/api/chapter`,formdata);
        
            if(!data){
                setIsFailed(true);
                setIsUpload(false);
                return toast.error("Something went wrong");
            }
            
            if(data.status !== "success"){
                toast.error("Something Went Wrong");
            }

            onChange(data.videoUrl,data.videoKey);
        }catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
            setIsFailed(true);
            setIsUpload(false);
        }
    }
    
    const handleChange =(file:File) => {
        setIsFailed(false);
        setIsUpload(true);
        fetchUrl(file);
    };
    const onTypeError = ()=>{
        toast.error("mp4,mkv,avi and mov are accepted");
    }
    const onSizeError = ()=>{
        toast.error("Minimum 500mb size accepted");
    }
  return (
    <div>
        {!isupload || isFailed ? <FileUploader 
            handleChange={handleChange} 
            name="file" 
            types={fileTypes} 
            onTypeError={onTypeError}
            maxSize={500}
            onSizeError={onSizeError}
            label="Upload or drop a file" 
            hoverTitle="Drop here"
        /> : 
        <div className="flex gap-x-2 items-center justify-center text-sm text-sky-700 mt-2">
            <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            Uploading...
        </div>}
    </div>
  );
}

export default VideoUpload;