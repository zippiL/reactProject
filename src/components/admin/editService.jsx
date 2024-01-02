import {useState,useContext} from 'react';

import { Card, CardActions, CardContent, Divider, FormControl, FormLabel, Input, Typography, Button } from '@mui/joy';
import { Dialog, DialogContent ,Alert} from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useForm } from 'react-hook-form';

import serviceStore from '../../store/serviceStore';
import { AlertContext } from '../../App';

export default function EditService(props) {
  const { handleClose, open } = props;
  const { register, handleSubmit, setValue } = useForm();
  const nameRef = register("name");

  const [isDateAvailable, setIsDateAvailable] = useState(true);
  const { bool, setBool } = useContext(AlertContext);

  const onSubmit1 = async (data) => {
    try {
      const status = await serviceStore.addService(data);
      console.log(status);
      if (status === 200) {
        setBool(true);
        handleClose();
      }
    } catch (error) {
      setIsDateAvailable(false);
      setValue("name", "");
      if (nameRef) {
        nameRef.current.focus();
      }
    }
  };
  return (<>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit1)}>
          <Card
            variant="outlined"
            sx={{
              maxHeight: 'max-content',
              maxWidth: '100%',
              mx: 'auto',
              overflow: 'auto',
              resize: 'horizontal',
            }}
          >
            <Typography level="title-lg" startDecorator={<ContentPasteIcon />}>
              Add new service
            </Typography>
            <Divider inset="none" />
            <CardContent
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                gap: 1.5,
              }}
            >

              <FormControl sx={{ gridColumn: '1/-1' }} >
                <FormLabel>name</FormLabel>
                <Input  {...register("name")} />
              </FormControl>
              {isDateAvailable || (
                <Alert severity="error" sx={{ marginBottom: 2, gridColumn: '1/-1' }}>
                  We have exactly such a service
                </Alert>
              )}
              <FormControl>
                <FormLabel>duration</FormLabel>
                <Input type='Time'  {...register("duration")} />
              </FormControl>
              <FormControl>
                <FormLabel>price</FormLabel>
                <Input type='number' endDecorator={<AttachMoneyIcon />} {...register("price")} />
              </FormControl>
              <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>description</FormLabel>
                <Input {...register("description")} />
              </FormControl>
              <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>image</FormLabel>
                <Input endDecorator={<ImageOutlinedIcon />} {...register("img")} />
              </FormControl>
              <CardActions sx={{ gridColumn: '1/-1' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="solid"
                  color="primary"
                >
                  Add service
                </Button>
              </CardActions>
            </CardContent>

          </Card>
        </form>
      </DialogContent>
    </Dialog>
  </>
  );
}
