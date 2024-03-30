import React, {useEffect, useState} from 'react';
import {Dialog, Input, Text} from '@rneui/themed';
import {useGlobalStore} from '../../store/global';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/base';
import {primaryColor, secondaryColor} from '../../utils/colors';
import {formatDate} from '../../utils/date';
import CustomDatePicker from '../../components/datepicker';
import CustomText from '../../components/text';

interface filterProps {
  isVisible: boolean;
}

export default function Filter({isVisible}: filterProps) {
  const {openFilter, setFilter, setFilterValues, filterValues} =
    useGlobalStore();

  const [chipValue, setChipValue] = useState('');
  const [fromDate, setFromDate] = useState(formatDate(new Date()));
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const handleAddFilters = () => {
    setFilterValues({
      fromDate: fromDate.toString(),
      toDate: toDate.toString(),
      type: chipValue,
    });
    setFilter(false);
  };

  const handleClose = () => {
    setFilterValues({
      fromDate: '',
      toDate: '',
      type: '',
    });
    setFromOpen(false);
    setToOpen(false);
    setFilter(false);
    setChipValue('');
    setFromDate(formatDate(new Date()));
    setToDate(formatDate(new Date()));
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => setChipValue(item.name)}
      style={{
        padding: 10,
        margin: 5,
        borderRadius: 8,
        backgroundColor:
          chipValue === item.name ? primaryColor : secondaryColor,
      }}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const chipArr = [
    {name: 'publishedAt', title: 'published'},
    {name: 'relevancy', title: 'Relevance'},
    {name: 'popularity', title: 'popular'},
  ];

  return (
    <>
      <Dialog isVisible={isVisible} onBackdropPress={handleClose}>
        <CustomText text="Category" />
        <View style={{}}>
          <FlatList
            data={chipArr}
            renderItem={renderItem}
            horizontal
            scrollEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <CustomText text="From Date" />
        <TouchableOpacity onPress={() => setFromOpen(true)}>
          <Input
            leftIcon={
              <Icon
                name={'calendar'}
                type="font-awesome"
                color={primaryColor}
              />
            }
            value={fromDate.toString()}
            underlineColorAndroid="transparent"
            // style={{fontSize: 14, borderWidth: 1, color: 'black'}}
            disabled
          />
        </TouchableOpacity>
        <CustomText text="To Date" />
        <TouchableOpacity onPress={() => setToOpen(true)}>
          <Input
            leftIcon={
              <Icon
                name={'calendar'}
                type="font-awesome"
                color={primaryColor}
              />
            }
            value={toDate.toString()}
            underlineColorAndroid="transparent"
            // style={{fontSize: 14, borderWidth: 1, color: 'black'}}
            disabled
          />
        </TouchableOpacity>
        <Dialog.Actions>
          <Dialog.Button
            buttonStyle={style.button}
            titleStyle={style.buttonTitle}
            title="Add Filters"
            onPress={handleAddFilters}
          />
          <View style={{width: 20}} />
          <Dialog.Button
            buttonStyle={style.button}
            titleStyle={style.buttonTitle}
            title="Clear"
            onPress={handleClose}
          />
        </Dialog.Actions>
      </Dialog>
      <CustomDatePicker
        open={fromOpen}
        date={fromDate}
        confirm={(date: Date) => {
          setFromOpen(false);
          setFromDate(formatDate(date));
        }}
        cancel={() => setFromOpen(false)}
      />
      <CustomDatePicker
        open={toOpen}
        date={toDate}
        confirm={(date: Date) => {
          setToOpen(false);
          setToDate(formatDate(date));
        }}
        cancel={() => setToOpen(false)}
      />
    </>
  );
}

const style = StyleSheet.create({
  BottomSheet: {
    height: '75%',
    backgroundColor: 'white',
  },
  button: {backgroundColor: primaryColor, borderRadius: 8},
  buttonTitle: {color: 'white'},
  rowContainer: {},
  icon: {
    paddingBottom: 20,
  },
});
