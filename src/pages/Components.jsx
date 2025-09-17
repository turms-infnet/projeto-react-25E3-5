import {
  Alert,
  Appbar,
  Avatar,
  Button,
  Card,
  DatePicker,
  DateTimePicker,
  Fab,
  Grid,
  Modal,
  Pagination,
  Rating,
  Searchbar,
  Skeleton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  TimePicker,
  Typography
} from '../components/index';

const Components = () => {
  return (
    <div>
      <Alert title="Título do Alerta" variant="filled" severity="info">Alerta de teste</Alert>
      <br/>
      <Alert variant="filled" severity="info">Alerta de teste sem título</Alert>
      <Appbar />
      <Avatar src="https://avatars.githubusercontent.com/u/8451789?v=4" />
      <Avatar>T</Avatar>
      <Button 
        variant="text"
        color="warning">Texto</Button>
      <Card />
      <DatePicker />
      <DateTimePicker />
      <Fab />
      <Grid />
      <Modal />
      <Pagination />
      <Rating />
      <Searchbar />
      <Skeleton />
      <Snackbar />
      <Stack />
      <Switch />
      <TextField />
      <TimePicker />
      <Typography />
    </div>
  );
};

export default Components;
