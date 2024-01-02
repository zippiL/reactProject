import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import businessStore from '../../store/businessStore';

export default function EditBusinessDetails (props){
    const {handleClose,open}=props
    const { register, handleSubmit } = useForm();
   
    const businessDetails = businessStore.data;
   
    function onSubmit1(data) {
        businessStore.editDetail(data);
        handleClose();
    }

    return (
        <>
            <Dialog  onClose={handleClose} open={open}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit1)}>
                        <TextField
                            label="name"
                            defaultValue={businessDetails.name}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("name")}
                        />
                        <TextField
                            label="owner"
                            defaultValue={businessDetails.owner}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("owner")}
                        />
                        <TextField
                            label="description"
                            defaultValue={businessDetails.description}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("description")}
                        />
                        <TextField
                            label="address"
                            defaultValue={businessDetails.address}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("address")}
                        />
                        <TextField
                            label="phone"
                            defaultValue={businessDetails.phone}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("phone")}
                        />
                        <TextField
                            label="logo"
                            defaultValue={businessDetails.logo}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            {...register("logo")}
                        />


                        <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    </form>
                </DialogContent>

            </Dialog>
        </>

    )
}

