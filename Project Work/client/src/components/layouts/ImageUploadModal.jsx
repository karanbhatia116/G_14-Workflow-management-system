import {Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Typography} from '@material-ui/core';
import {useState} from 'react';
import axios from 'axios';
const ImageUploadModal = ({openUpload, setOpenUpload, setImage})=>{

    const [Img, setImg] = useState(null);
    const [dialogTitle, setDialogTitle] = useState('Change Project Image')
    const [greaterThan2, setGreaterThan2] = useState(false);
    const handleImageChange = (e)=>{
        if(Math.floor(e.target.files[0].size/1024) > 2048)
        {
            setDialogTitle('Please choose image with size less than 2MB!');
            setGreaterThan2(true);
        }
        else
        {
            setDialogTitle('Change Project Image');
            setGreaterThan2(false);
            setImg(e.target.files[0]);
        }
    }
    const handleUploadImage = ()=>{
        const formData = new FormData();
        if(Img!==null)
        {
            formData.append(
            "img",
            Img,
            Img.name
            );
            axios.post('/uploadImg', formData).then((res)=>{
                if(res.data.uploadStatus !== "successful")
                {
                    setDialogTitle('Image change unsucessful');
                }
                else
                {
                    console.log('SuccessFul Image Change');
                    setImage(res.data.result.url);
                    //axios.post('/update img url');
                    setOpenUpload(false);
                }
            });
        }
        else if(Img===null &&  !greaterThan2){
            setDialogTitle("Choose an image before uploading!!");
        }
        else if(greaterThan2){
            setDialogTitle('Please choose image with size less than 2MB!');
        }
    }
    return(
    <Dialog open={openUpload} onClose={()=>setOpenUpload(false)}>
        <DialogTitle id='simple-dialog-title'>
            {dialogTitle}
        </DialogTitle>
        <DialogContent dividers={true}>
            <form action='/uploadImg' encType='multipart/form-data' method='POST'>
            <InputBase type='file' label='Choose File' name = 'img' inputProps={{ accept: 'image/*' }} style={{color:'black', backgroundColor:'f7f7f7'}} onChange={handleImageChange}></InputBase>
                <Button variant='outlined' size='small' color='default' onClick={handleUploadImage}>
                    Upload
                </Button>
            </form>
        </DialogContent>
    </Dialog>
    );
}

export default ImageUploadModal;