import React, { useState } from 'react';
import { Text, StyleSheet, } from 'react-native';
import {
    Button,
    Dialog,
    CheckBox,
    ListItem,
    Avatar,
    } from '@rneui/themed';

interface DialogProps {
  title: string;
  content: string;
  onClose?: () => void; // Optional callback function for closing the dialog
}

const ExitDialog: React.FC<DialogProps> = ({ title, content, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={handleClose}
    >
      <Dialog.Title title={title}/>
      <Text>{content}</Text>
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={handleClose }/>
        <Dialog.Button title="Exit" onPress={()=>{handleClose(),onClose}}/>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display:"flex",
    backgroundColor: 'rgba(1, 1, 1)', // Transparent background for the modal
    padding: 20, // Add padding for content within the dialog
  },
  dialogContent: {
    backgroundColor: 'rgba(255,255,255, 0.9);', // White background for the dialog box
    width: '80%', // Set dialog width to 80%
// Set dialog height to 200px
padding:10,
    borderRadius: 5, // Add rounded corners
    shadowColor: '#000', // Add shadow for depth (optional)
    shadowOffset: { width: 0, height: 2 }, // Adjust shadow offset (optional)
    shadowOpacity: 0.25, // Set shadow opacity (optional)
    shadowRadius: 4, // Set shadow blur radius (optional)
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ExitDialog;
