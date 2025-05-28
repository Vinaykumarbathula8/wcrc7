import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, TouchableHighlight, TextInput, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Box, Center, ScrollView } from 'native-base'
import { Dropdown } from 'react-native-element-dropdown';
import CountryPicker from 'react-native-country-picker-modal'

const Profile = ({ navigation }) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [lastNameError, setLastNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');

    const [isMobileEntered, setIsMobileEntered] = useState(false);
    const [prefixValue, setPrefixValue] = useState(null);
    const [selectedPrefix, setSelectedPrefix] = useState('');

    const [countryCode, setCountryCode] = useState('US')

    const onSelectCountry = (country) => {
        setCountryCode(country.cca2);
    };

    const handleGoBack = () => {
        //navigation.goBack();
    };


    const validateFields = () => {
        let isValid = true;

        if (lastName.trim() === '') {
            setLastNameError('Please enter your last name');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (firstName.trim() === '') {
            setFirstNameError('Please enter your first name');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!isMobileEntered || mobileNumber.trim() === '') {
            setMobileNumberError('Please enter your mobile number');
            isValid = false;
        } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
            setMobileNumberError('Please enter a valid 10-digit mobile number');
            isValid = false;
        } else {
            setMobileNumberError('');
        }

        if (email.trim() === '') {
            setEmailError('Please enter your email');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (address.trim() === '') {
            setAddressError('Please enter your address');
            isValid = false;
        } else {
            setAddressError('');
        }

        return isValid;
    };

    const prefixData = [
        { label: 'Dr.', value: '1' },
        { label: 'Mr.', value: '2' },
        { label: 'Mrs.', value: '3' },
        { label: 'Miss.', value: '4' },
        { label: 'Ms.', value: '5' },
        { label: 'Prof.', value: '6' },
    ];

    const handlePreifxSelect = (item) => {
        setSelectedPrefix(item.label);
        setPrefixValue(item.value);
    };
    
    const handleNextPage = () => {

        if (validateFields()) {
            navigation.navigate("PaperAndAuthorDetails");
        }
    };

    
    return (
        <ScrollView showsVerticalScrollIndicator={false} >

        <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.contain}>
                    <Text style={{ fontWeight: '500' }}>Last Name <Text style={styles.star}>*</Text></Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={prefixData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Prefix"
                        value={prefixValue}
                        onChange={handlePreifxSelect}
                    />
                <Box marginBottom={5} style={styles.nameInput}>
                    <Input 
                        borderRadius={10} style={styles.input}
                        onChangeText={(text) => {
                            setLastName(text);
                            if (text.trim() !== '') {
                                setLastNameError('');
                            }
                        }}
                        value={lastName}
                        placeholder="Enter Last Name"
                    />
                    {lastNameError ? <Text style={styles.nameError}>{lastNameError}</Text> : null}
                </Box>

                    <Text style={{ fontWeight: '500' }}>First Name <Text style={styles.star}>*</Text></Text>
                <Box marginBottom={6}>
                    <Input style={styles.input}
                        borderRadius={10}
                        onChangeText={(text) => {
                            setFirstName(text);
                            if (text.trim() !== '') {
                                setFirstNameError('');
                            }
                        }}
                        value={firstName}
                        placeholder="Enter First Name"
                    />
                    {firstNameError ? <Text style={styles.error}>{firstNameError}</Text> : null}
                </Box>

                <Box>
                <Text style={{ fontWeight: '500' }}>Middle Name</Text>
                        <Input style={styles.input} borderRadius={10} marginBottom={ 6}
                        onChangeText={(text) => {
                            setMiddleName(text);
                            }}
                            value={middleName} placeholder="Enter Middle Name" />
                    </Box>

                    <Box>
                        <Text style={{ fontWeight: '500' }}>Country Code</Text>
                        <View style={styles.countryPickerContainer}>
                    <CountryPicker
                        withFlag
                        withFilter
                        withCallingCode
                        withCountryNameButton
                        withAlphaFilter
                        countryCode={countryCode}
                        onSelect={onSelectCountry}
                            />
                        </View>
                        <Text style={{ fontWeight: '500' }}>Mobile Number <Text style={styles.star}>*</Text></Text>
                        <Input borderRadius={10} fontSize={14} style={styles.input}
                        placeholder="Enter Phone Number"
                        value={mobileNumber}
                        onChangeText={(text) => {
                            setMobileNumber(text);
                            setIsMobileEntered(text.trim() !== '');
                            if (text.trim() !== '') {
                                setMobileNumberError('');
                            }
                        }}
                        maxLength={10 }
                        keyboardType="phone-pad"
                    />
                </Box>
                {mobileNumberError ? <Text style={styles.error}>{mobileNumberError}</Text> : null}

                <Box marginTop={4} marginBottom={5}>
                        <Text style={{ fontWeight: '500' }}>Email <Text style={styles.star}>*</Text></Text>
                    <Input
                    onChangeText={(text) => {
                        setEmail(text);
                        if (text.trim() !== '') {
                            setEmailError('');
                        }
                    }}
                    style={styles.input}
                        borderRadius={10}
                    value={email}
                    keyboardType={'email-address'}
                    placeholder="Enter Email"
                    />
                    {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                </Box>

                <Box>
                        <Text style={{ fontWeight: '500' }}>Address <Text style={styles.star}>*</Text></Text>
                    <Input
                        style={styles.input}
                        borderRadius={8}
                        onChangeText={(text) => {
                            setAddress(text);
                            if (text.trim() !== '') {
                                setAddressError('');
                            }
                        }}
                        value={address}
                        placeholder="Enter Your Address"
                    />
                        {addressError ? < Text style={styles.error}>{addressError}</Text> : null}
                </Box>

                    <View style={styles.btn}>
                        <TouchableOpacity
                            style={[styles.backButton, { backgroundColor: '#dededb', }]}
                            onPress={handleGoBack}
                        >
                            <Text style={styles.backButtonText}>BACK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.nextButton, { backgroundColor: 'rgb(0, 149, 182)',  }]}
                            onPress={handleNextPage}
                        >
                            <Text style={styles.nextButtonText}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex:1,
        padding: 20,
        paddingHorizontal:30,
        marginTop:'-10%'
    },
    star: {
        color: 'red',
    },
    input: {
        fontSize: 14,
        borderColor: 'gray',
        borderRadius: 22,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    nameInput: {
        marginTop: -50,
        marginLeft: 100,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dropdown: {
        margin: 0,
        width: 90,
        height: 49,
        borderBottomColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    countryPickerContainer: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 10,
        marginBottom:20,
        paddingHorizontal: 10,
        padding: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        marginLeft: 10,
        opacity: 0.4,
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 10
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
   
    error: {
        color: 'red',
    },
    nameError: {
        color: 'red',
        marginLeft:-100
    },
    btn: {
        marginTop: 30,
        flexDirection: 'row'
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 'auto',
    },
    nextButton: {
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 'auto',
    },
    backButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
})

export default Profile;