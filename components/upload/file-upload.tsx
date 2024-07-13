"use-clinet"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";

type FileUploadProps = {
    courseId:string
    onChange: (url: string,name:string,key:string) => void;
}

function FileUpload({courseId,onChange}:FileUploadProps) {
    const fileTypes = ["PDF", "DOC", "DOCX","PPT","PPTX","XLS","XLSX"];
    const formdata = new FormData(); 
    const [isupload,setIsUpload] = useState<boolean>(false);
    const [isFailed,setIsFailed] = useState<boolean>(false);

    const fetchUrl = async (file:File) => {
        try{
            formdata.append("file",file);
            formdata.append("id",courseId);
            formdata.append("name",`${file.name.split(".")[0]}-${Date.now()}.${file.name.split(".")[file.name.split(".").length-1]}`);
            

            const {data} = await axios.post(`/api/attachment`,formdata);
        
            if(!data){
                setIsFailed(true);
                setIsUpload(false);
                return toast.error("Something went wrong");
            }
            
            if(data.status === "success"){
                onChange(data.url,data.name,data.key);
            }
            else{
                toast.error("Something Went Wrong");
            }
        }catch(err){
            console.log(err);
            toast.error("Something Went Wrong");
            setIsFailed(true);
            setIsUpload(false);
        }
    }
    
    const handleChange =(file:File) => {
        console.log(file);
        setIsFailed(false);
        setIsUpload(true);
        fetchUrl(file);
    };
    const onTypeError = ()=>{
        toast.error("pdf, doc, docx, ppt, pptx, xls and xlsx are accepted");
    }
    const onSizeError = ()=>{
        toast.error("Minimum 10mb size accepted");
    }
  return (
    <div>
        {!isupload || isFailed ? <FileUploader 
            handleChange={handleChange} 
            name="file" 
            multiple={true}
            types={fileTypes} 
            onTypeError={onTypeError}
            maxSize={10}
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

export default FileUpload;