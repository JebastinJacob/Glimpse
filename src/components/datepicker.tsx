import React from 'react';
import DatePicker from 'react-native-date-picker';

interface props {
  open: boolean;
  date: string;
  confirm: any;
  cancel: any;
}
export default function CustomDatePicker({open, date, confirm, cancel}: props) {
  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={new Date(date)}
      maximumDate={new Date()}
      onConfirm={confirm}
      onCancel={cancel}
    />
  );
}
