import  { useContext, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Button, TextField, Dialog, DialogContent, FormControl, MenuItem, InputLabel, Alert ,Select} from '@mui/material';
import { Avatar, Chip, Typography, CardActions, CardOverflow,Card,CardContent } from '@mui/joy';
import { toJS } from 'mobx';

import { AlertContext } from '../../App';
import meetingStore from '../../store/meetingStore';
import serviceStore from '../../store/serviceStore';


export default function MadeMetting(props) {
    const data = serviceStore.data;
    let arr = [];
    { data.map((x) => arr.push(toJS(x.name))) }
    const { open, handleClose } = props;
    const { register, handleSubmit, setValue } = useForm();
    const [isDateAvailable, setIsDateAvailable] = useState(true);
    const dateTimeRef = register('dateTime');
    const { bool, setBool } = useContext(AlertContext);

    const onSubmit1 = async (data) => {
        try {
            const status = await meetingStore.addMeeting(data);
            console.log(status);
            if (status === 200) {
                setBool(true);
                handleClose();
            }
        } catch (error) {
            console.log("catch");
            setIsDateAvailable(false);
            setValue('dateTime', '');
            dateTimeRef.current.focus();
        }
    };


    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit1)}>
                        <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg', p: 1 }}>
                            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                <Avatar sx={{ '--Avatar-size': '4rem' }} />
                                <Chip
                                    size="sm"
                                    variant="soft"
                                    color="primary"
                                    sx={{
                                        mt: -1,
                                        mb: 1,
                                        border: '3px solid',
                                        borderColor: 'white',
                                    }}
                                >
                                    Hello
                                </Chip>
                                <Typography level="title-lg">to make an appointment</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">service Name</InputLabel>
                                    <Select {...register("serviceName")}>
                                        {arr.map((x, index) => (
                                            <MenuItem key={index} value={x}>
                                                {x}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                                <TextField
                                    label="name"
                                    variant="outlined"
                                    margin="normal"
                                    type='name'
                                    required
                                    fullWidth
                                    {...register("name")}
                                />
                                <TextField
                                    label="phone"
                                    variant="outlined"
                                    margin="normal"
                                    type='tel'
                                    required
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    fullWidth
                                    {...register("phone")}
                                />
                                <TextField
                                    label="email"
                                    variant="outlined"
                                    margin="normal"
                                    type='email'
                                    required
                                    fullWidth
                                    {...register("email")}
                                />
                                <TextField
                                    label="date&houer"
                                    variant="outlined"
                                    margin="normal"
                                    type="datetime-local"
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    {...register("dateTime")}
                                />
                                {isDateAvailable || (
                                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                                        Appointment is not available! Please choose a different date and time.
                                    </Alert>
                                )}
                            </CardContent>
                            <CardOverflow >
                                <CardActions buttonFlex="1">
                                    <Button type="submit">Made an appointment</Button>

                                </CardActions>
                            </CardOverflow>
                        </Card>

                    </form>
                </DialogContent>

            </Dialog>
        </>

    )
}
