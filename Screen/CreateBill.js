import { StyleSheet, Text, View , ScrollView , TextInput, Button} from 'react-native'
import React,{useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import dateFormat from 'dateformat';
import { PdfCode } from './pdfCode';

export default function CreateBill() {
  const [name, set_Name] = useState("");
  const [Address, Set_Address] = useState("");
  const [Mobile_No, Set_Mobile_No] = useState("");
  const [Product, Set_Product] = useState("मुरुम");
  const [Quantity,setQuantity] = useState('');
  const now = new Date();
  const [Invoice,setInvoice] = useState(dateFormat(now, "ddmmyyhhMss")) 
  const [Total,setTotal] = useState('');
  const [ReceivedBalance,SetReceivedBalance] = useState('');
  const [PaymentType,setPaymentType] = useState('Credit');
  const [RemaningBalance, setRemaningBalance] = useState('Paid');
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  }

  const printToFile = async () => {
    let html = PdfCode(name,Address,Mobile_No,Quantity,Invoice,Product,Total,ReceivedBalance,PaymentType,RemaningBalance);
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    try{
      const { uri } = await Print.printToFileAsync({
        html
      });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });

      set_Name('');
      setInvoice(dateFormat(now, "ddmmyyhhMss"));
      setTotal('');
      setQuantity('');
      SetReceivedBalance('');
      Set_Address('');
      Set_Mobile_No('');
      

    }catch(err){
        Alert.alert("Make shure You have Internet Connection or contact @+91 XXXXXXXXXX");
    }


  }

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  }
  return (
    <View style= {styles.container}>
      <ScrollView >

        <View style = {styles.InputContainer}>
          <Text>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => set_Name(text)}
            style={styles.textInput}
            placeholder="Full Name"
          />
        </View>

        <View style = {styles.InputContainer}>
          <Text>Address</Text>
          <TextInput
            value={Address}
            onChangeText={(text) => Set_Address(text)}
            style={styles.textInput}
            placeholder="Adress"
          />
        </View>

        <View style = {styles.InputContainer}>
          <Text>Mobile Number</Text>
          <TextInput
            value={Mobile_No}
            keyboardType = "phone-pad"
            onChangeText={(text) => Set_Mobile_No(text)}
            style={styles.textInput}
            placeholder="Mobile Number"
          />
        </View>

        <View style={styles.InputContainer}>
          <Text>Product : </Text>
          <View style={styles.PickerContainer}>
          <Picker
            selectedValue={Product}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) => Set_Product(itemValue)}
          >
            {/* 'ग्रिट (Grit)','दगड','Crash Sand','Plaster Sand' */}
            <Picker.Item label="jeans" value="jeans" />
            <Picker.Item label="shirt" value="shirt" />
            <Picker.Item label="tshirt" value="tshirt" />
          </Picker>
        </View>
        </View>

        <View style={styles.InputContainer}>
          <Text>Quantity : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(text)}
            value={Quantity}
            placeholder="Quantity"
          />
        </View>
        <View style={styles.InputContainer}>
          <Text>Invoice No : </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setInvoice(text)}
            value={Invoice}
            placeholder="Invoice No"
          />
        </View>
        {/* Total  */}
        <View style={styles.InputContainer}>
          <Text>Total : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setTotal(text)}
            value={Total}
            placeholder="Total ₹"
          />
        </View>

        {/* ReceivedBalance  */}
        <View style={styles.InputContainer}>
          <Text>Received Amount : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => SetReceivedBalance(text)}
            value={ReceivedBalance}
            placeholder="Received Amount ₹"
          />
        </View>
        {/* Remaining Balance  */}
        <View style={styles.InputContainer}>
          <Text>Remaining Balance : </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(text) => setRemaningBalance(text)}
            value={RemaningBalance}
            placeholder="Remaining Balance ₹"
          />
        </View>
        {/* Payment Method  */}
        <View style={styles.InputContainer}>
            <Text>Payment Method : </Text>
           <View style={styles.PickerContainer}>
          <Picker
            selectedValue={PaymentType}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) => setPaymentType(itemValue)}
          >
            {/* 'ग्रिट (Grit)','दगड','Crash Sand','Plaster Sand' */}
            <Picker.Item label="Credit" value="Credit" />
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
        <View style={styles.CreateInvoiceButton}>
        <Button 
        title="Create Invoice"
        onPress={() => console.log("Running")}
        />
        </View>
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingTop : 25,  
    paddingBottom : 25
    

  },
  InputContainer : {
    marginTop : 15,
    marginLeft : 15,
    marginLeft : 15
  }, 
  textInput : {
    marginTop : 4,
    height : 40,
    borderColor : "#000",
    borderWidth:  1 ,
    borderRadius : 4,
    padding : 4,
    marginBottom : 6
  }, 
  PickerContainer:{
    marginTop:10,
    borderWidth:1,
    borderRadius:4,
    height:50
  },
  CreateInvoiceButton : {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom : 15
  }
})