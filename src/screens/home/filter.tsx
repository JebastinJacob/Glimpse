import React, { useEffect, useState } from 'react'
import { Dialog, Text } from '@rneui/themed';
import { useGlobalStore } from '../../store/global';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Chip } from '@rneui/base';
import { primaryColor, secondaryColor } from '../../utils/colors';

    interface filterProps{
        isVisible : boolean
    }

export default function Filter({isVisible}:filterProps) {
    const {openFilter,setFilter,setFilterValues,filterValues} = useGlobalStore()

    const[chipValue,setChipValue] = useState("publishedAt")
    const[fromDate,setFromDate] = useState("")
    const[toDate,setToDate] = useState("")

    useEffect(() => {
            console.log("changed",chipValue)
        // setFilter(openFilter)
    }, [openFilter,chipValue])

    useEffect(() => {
      
        setFilterValues(filterValues)
    }, [filterValues])
    const handleClose = () => {
        
        setFilter(false);
      };
      
      const chipArr = [{name:"publishedAt",title:"published"},{name:"relevancy",title:"Relevance"},{name:"popularity",title:"popular"}]
  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={handleClose}
    >
        <View style={{}}>

        {chipArr.map((item) =>{
            return    <TouchableOpacity
            onPress={()=>setChipValue(item.name)}
            style={{ padding:10 ,width:150,backgroundColor:chipValue===item.title ? primaryColor:secondaryColor}}
            >
                <Text>{item.title}</Text>

            </TouchableOpacity>
        })}
        </View>
          
        
      <Dialog.Actions>
        <Dialog.Button title="Add Filters" onPress={handleClose }/>
      </Dialog.Actions>
    </Dialog>
  )
}


const style =StyleSheet.create({
    BottomSheet:{
        height:"75%",
        backgroundColor:"white"
    }
})
