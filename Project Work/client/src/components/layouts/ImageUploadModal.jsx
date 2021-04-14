import {Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Typography} from '@material-ui/core';

const ImageUploadModal = ({openUpload, setOpenUpload})=>{
    return(
    <Dialog open={openUpload} onClose={()=>setOpenUpload(false)}>
        <DialogTitle id='simple-dialog-title'>
            Upload an image
        </DialogTitle>
        <DialogContent dividers={true}>
            <form>
            <InputBase type='file' label='Choose File' style={{color:'black', backgroundColor:'f7f7f7'}}></InputBase>
                <Button variant='outlined' size='small' color='default'>
                    Upload
                </Button>
            </form>
        </DialogContent>
    </Dialog>
    );
}

export default ImageUploadModal;