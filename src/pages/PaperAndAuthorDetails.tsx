import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, TouchableHighlight, TextInput, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Box, Center, ScrollView } from 'native-base'
import * as DocumentPicker from 'expo-document-picker';

const PaperAndAuthorDetails = ({ navigation }) => {

    const [titleOfThePaper, setTitleOfThePaper] = useState('');
    const [titleOfThePaperError, setTitleOfThePaperError] = useState('');
    
    const [selectedOption, setSelectedOption] = useState('Oral');
    const [selectedPaperType, setSelectedPaperType] = useState('Abstract');

    const [selectedFullPaperOption, setSelectedFullPaperOption] = useState('Yes');
    const [showChooseFileButton, setShowChooseFileButton] = useState(false);

    const [selectSubmitPaper, setSelectSubmitPaper] = useState('No');

    const [selectedSubjectPaper, setSelectedSubjectPaper] = useState(null);
    const [selectedSubjectPaperError, setSelectedSubjectPaperError] = useState('');
    
    const [authors, setAuthors] = useState([]);
    const [saveCount, setSaveCount] = useState(0);
    const [showAuthorFields, setShowAuthorFields] = useState(false);
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [affiliation, setAffiliation] = useState('');

    const [lastNameError, setLastNameError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [affiliationError, setAffiliationError] = useState(false);

    const [pickedDocument, setPickedDocument] = useState(null);

    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (selectedFullPaperOption === 'Yes') {
            setShowChooseFileButton(true);
        } else {
            setShowChooseFileButton(false);
        }
    }, [selectedFullPaperOption]);

    const pickDocument = async () => {
        try {
            const document = await DocumentPicker.getDocumentAsync();
            if (!document.cancelled) {
                const uri = document.file?.uri;
                const sizeInBytes = document.file?.size;
                const sizeInMB = sizeInBytes / (1024 * 1024); 

                if (sizeInMB <= 20) {
                    const allowedExtensions = ['pdf', 'doc', 'docx'];
                    const fileNameParts = uri?.split('.') ?? [];
                    const fileExtension = fileNameParts.length > 1 ? fileNameParts[fileNameParts.length - 1].toLowerCase() : '';

                    if (allowedExtensions.includes(fileExtension)) {
                        setPickedDocument(document);
                    } else {
                        setPickedDocument(null);
                        Alert.alert('Invalid File Type', 'Please select a PDF, DOC, or DOCX file.');
                    }
                } else {
                    setPickedDocument(null);
                    Alert.alert('File Too Large', 'Please select a file with a maximum size of 20 MB.');
                }
            }
        } catch (error) {
            console.log('Error picking document: ', error);
        }
    };


    const handleGoBack = () => {
        navigation.goBack(); 
    };

    const handleEditAuthor = (index) => {
        const authorToEdit = authors[index];
        setEditMode(true);
        setEditIndex(index);
        setLastName(authorToEdit.lastName);
        setFirstName(authorToEdit.firstName);
        setEmail(authorToEdit.email);
        setAffiliation(authorToEdit.affiliation);
        setShowAuthorFields(true); 
    };

    const addAuthor = () => {
        let isValid = true;

        if (!lastName) {
            setLastNameError(true);
            isValid = false;
        } else {
            setLastNameError(false);
        }

        if (!firstName) {
            setFirstNameError(true);
            isValid = false;
        } else {
            setFirstNameError(false);
        }
    
        if (email.trim() === '') {
            setEmailError(true);
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (!affiliation) {
            setAffiliationError(true);
            isValid = false;
        } else {
            setAffiliationError(false);
        }

        if (!isValid) {
            return;
        }

        const newAuthor = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            affiliation: affiliation
        };

        const updatedAuthors = [...authors];
        if (editMode) {
            updatedAuthors[editIndex] = { lastName, firstName, email, affiliation };
            setEditMode(false);
            setEditIndex(null);
        } else {
            updatedAuthors.push({ lastName, firstName, email, affiliation });
            setSaveCount(saveCount + 1);
        }

        setAuthors(updatedAuthors);
        setLastName('');
        setFirstName('');
        setEmail('');
        setAffiliation('');
        setShowAuthorFields(false);
    };
    
    const toggleAuthorFields = () => {
        setShowAuthorFields(!showAuthorFields);
        if (!showAuthorFields) {
            setEditMode(false);
            setLastName('');
            setFirstName('');
            setEmail('');
            setAffiliation('');

            setLastNameError(false);
            setFirstNameError(false);
            setEmailError(false);
            setAffiliationError(false);
        }
    };
    
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const handleSelectPaperTypeOption = (option) => {
        setSelectedPaperType(option);
    };

    const handleSelectFullPaperOption = (option) => {
        setSelectedFullPaperOption(option);
    };

    const handleSelectSubmitPaper = (option) => {
        setSelectSubmitPaper(option);
    };

    const handleSelectSubjectPaper = (option) => {
        setSelectedSubjectPaper(option);
        setSelectedSubjectPaperError('')
    };
    
    const validateFields = () => {
        let isValid = true;
        
        if (titleOfThePaper.trim() === '') {
            setTitleOfThePaperError('Please enter title of the paper');
            isValid = false;
        } else {
            setTitleOfThePaperError('');
        }

        if (!selectedSubjectPaper) {
            setSelectedSubjectPaperError('Please select a subject before submitting');
            isValid = false;
        } else {
            setSelectedSubjectPaperError('')
        }

        return isValid;
    };
    
    const handleRemoveAuthor = index => {
        const updatedAuthors = [...authors];
        updatedAuthors.splice(index, 1);
        setAuthors(updatedAuthors);
        setSaveCount(saveCount - 1);
    };

    
    const handleNextPage = () => {

        if (validateFields()) {
            //navigation.navigate("PaperAndAuthorDetails");
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false} >

            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.contain}>
                    <View style={styles.paper}>
                        <Text style={{  marginBottom: 20, fontWeight: "500" }}>How do you want your paper to be considered?</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                            onPress={() => handleSelectOption('Oral')}
                        >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedOption === 'Oral' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedOption === 'Oral' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Oral</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleSelectOption('Poster')}
                        >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedOption === 'Poster' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedOption === 'Poster' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                            </View>
                                <Text style={{ marginLeft: 10 }}>Poster</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                   <Text style={{ fontWeight: '500' }}>Title of the Paper <Text style={styles.star}>*</Text></Text>
                    <Box marginBottom={4}>
                        <Input style={styles.input}
                            borderRadius={10}
                            onChangeText={(text) => {
                                setTitleOfThePaper(text);
                                if (text.trim() !== '') {
                                    setTitleOfThePaperError('');
                                }
                            }}
                            value={titleOfThePaper}
                            maxLength={200}
                            multiline={true}
                            placeholder="Title of the Paper (max 200 chars)"
                        />
                        {titleOfThePaperError ? <Text style={styles.error}>{titleOfThePaperError}</Text> : null}
                    </Box>

                    <Box>
                        <Text style={{ fontWeight: '500' }}>Keywords</Text>
                        <Input style={styles.input} borderRadius={10} marginBottom={6}
                            maxLength={300 }
                            placeholder="Keywords (max 300 chars)"
                            multiline={true}
                        >
                        </Input>
                    </Box>

                    <View style={styles.fieldsContainer}>
                        <Text style={styles.headerText}>Details of Authors</Text>
                        <View style={styles.hr} />
                        <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: 'rgba(32, 161, 32, 0.961)' }]}
                            onPress={toggleAuthorFields}
                        >
                            <Text style={styles.addButtonText}>+ Add Author</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10, fontWeight: "500" }}>* Maximum of 4 Authors</Text>
                            <Text style={{ marginLeft: 65, fontWeight: "500", marginBottom: 14 }}>{`Total (${saveCount})`}</Text>
                        </View>
                        <View style={styles.hr} />
                        {showAuthorFields && (
                            <View style={styles.authorForm}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={lastNameError ? "Last name is required" : "Last Name"}
                                    placeholderTextColor={lastNameError ? "red" : "gray"}
                                    value={lastName}
                                    onChangeText={text => {
                                        setLastName(text)
                                        setLastNameError(false)
                                    }}
                                />
                                <View style={styles.hr} />

                                <TextInput
                                    style={styles.input}
                                    placeholder={firstNameError ? "First name is required" : "First Name"}
                                    placeholderTextColor={firstNameError ? "red" : "gray"}
                                    value={firstName}
                                    onChangeText={text => {
                                        setFirstName(text)
                                        setFirstNameError(false)
                                    }}
                                />
                                <View style={styles.hr} />

                                <TextInput
                                    style={styles.input}
                                    placeholder={emailError ? "Email is required" : "Email"}
                                    placeholderTextColor={emailError ? "red" : "gray"}
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        if (text.trim() !== '') {
                                            setEmailError(false);
                                        }
                                    }}
                                />
                                <View style={styles.hr} />

                                <TextInput
                                    style={styles.input}
                                    placeholder={affiliationError ? "Affiliation is required" : "Affiliation"}
                                    placeholderTextColor={affiliationError ? "red" : "gray"}
                                    value={affiliation}
                                    onChangeText={text => {
                                        setAffiliation(text)
                                        setAffiliationError(false);
                                    }}
                                />
                                <View style={styles.hr} />

                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity
                                        style={[styles.addButton, { backgroundColor: 'rgb(0, 149, 182)', marginTop:10 }]}
                                        onPress={addAuthor}
                                    >
                                        <Text style={styles.addButtonText}>{editMode ? 'Save Author' : 'Add Author'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.cancelButton, { backgroundColor: 'rgb(230, 67, 67)', marginTop: 10 }]}
                                        onPress={toggleAuthorFields}
                                    >
                                        <Text style={styles.addButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {authors.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.authorsTable}>
                                    <View style={styles.authorRow}>
                                        <Text style={[styles.authorHeader, styles.borderRight]}>Last Name</Text>
                                        <Text style={[styles.authorHeader, styles.borderRight]}>First Name</Text>
                                        <Text style={[styles.authorHeader, styles.borderRight]}>Email</Text>
                                        <Text style={[styles.authorHeader, styles.borderRight]}>Affiliation</Text>
                                        <Text style={styles.authorHeader}>Actions</Text>
                                    </View>
                                    {authors.map((author, index) => (
                                        <View key={index} style={styles.authorRow}>
                                            <Text style={[styles.borderRight]}>{author.lastName}</Text>
                                            <Text style={[styles.borderRight]}>{author.firstName}</Text>
                                            <Text style={[styles.borderRight]}>{author.email}</Text>
                                            <Text style={[styles.borderRight]}>{author.affiliation}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity onPress={() => handleEditAuthor(index)}>
                                                    <Text style={styles.editButton}>Edit</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleRemoveAuthor(index)}>
                                                    <Text style={styles.removeButton}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        )}
                    </View>

                   
                    <View style={styles.paper}>
                        <Text style={{  marginBottom: 20, fontWeight: "500" }}>Select Paper Submission type</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectPaperTypeOption('Abstract')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedPaperType === 'Abstract' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedPaperType === 'Abstract' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10}}>Abstract</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => handleSelectPaperTypeOption('Full Paper')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedPaperType === 'Full Paper' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedPaperType === 'Full Paper' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10}}>Full Paper</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View >
                        {selectedPaperType === 'Abstract' && (
                            <>
                                <View style={styles.paperType}>
                                    <Text style={{ marginBottom: 15, fontWeight: "500" }}>Enter or upload abstract:</Text>
                                <TextInput
                                    style={styles.inputUpload}
                                    multiline={true}
                                    placeholder="Copy and paste Text abstract (max 2000 chars)"
                                  
                                />
                                    <Text style={{ marginBottom: 15, fontWeight: "500" }}>Or Upload file, only .pdf/.doc/.docx allowed. Maximum file size is 20MB.</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={pickDocument}>
                                        <Text style={{ padding: 10, borderWidth:0.6, backgroundColor: '#dededb', color: 'black', fontWeight: '600', borderRadius: 5 }}>Choose File</Text>
                                        
                                    </TouchableOpacity>
                                    {pickedDocument ? (
                                            <Text style={{ marginTop: 10, marginLeft: 10, fontWeight: '500' }}>{pickedDocument.name}</Text>
                                        ) : (
                                            <Text style={{ marginTop: 10, marginLeft:10, fontWeight: '500' }}>No file chosen</Text>
                                        )}
                                    </View>
                                </View>
                            </>
                        )}
                        {selectedPaperType === 'Full Paper' && (
                            <>
                                <View style={styles.paperType}>
                                    <Text style={{ marginBottom: 15, fontWeight: "500" }}>Do you intend to publish full length paper in book of papers?</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                            onPress={() => handleSelectFullPaperOption('Yes')}
                                        >
                                            <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedFullPaperOption === 'Yes' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                                {selectedFullPaperOption === 'Yes' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                            </View>
                                            <Text style={{ marginLeft: 10,}}>Yes</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                            onPress={() => handleSelectFullPaperOption('No')}
                                        >
                                            <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedFullPaperOption === 'No' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                                {selectedFullPaperOption === 'No' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                            </View>
                                            <Text style={{ marginLeft: 10}}>No</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                            onPress={() => handleSelectFullPaperOption('Not yet decided')}
                                        >
                                            <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedFullPaperOption === 'Not yet decided' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center', marginLeft:20 }}>
                                                {selectedFullPaperOption === 'Not yet decided' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                            </View>
                                            <Text style={{ marginLeft: 8}}>Not yet decided</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                {showChooseFileButton && (
                                    <View style={[styles.paperType, { marginTop: -15 }]}>
                                        <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={pickDocument}>
                                            <Text style={{ padding: 10, borderWidth: 0.6, backgroundColor: '#dededb', color: 'black', fontWeight: '600',  borderRadius: 5 }}>Choose File</Text>
                                        </TouchableOpacity>
                                        {pickedDocument ? (
                                                <Text style={{ marginTop: 10, marginLeft: 10, fontWeight: '500' }}>{pickedDocument.name}</Text>
                                            ) : (
                                                <Text style={{ marginTop:10, marginLeft:10, fontWeight: '500' }}>No file chosen</Text>
                                            )}
                                        </View>
                                        <Text style={{ marginTop: 15, color:'gray' }}>Max 20MB, only .pdf/.doc/.docx allowed</Text>
                                        </View>
                                )}
                                
                            </>
                        )}
                    </View>

                    <View style={styles.paperType}>
                        <Text style={{ fontWeight: "500", marginBottom: 15 }}>Have you submitted this abstract /paper earlier to call to papers WCRC-7?</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubmitPaper('No')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectSubmitPaper === 'No' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectSubmitPaper === 'No' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10}}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => handleSelectSubmitPaper('Yes, it is same paper')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectSubmitPaper === 'Yes, it is same paper' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectSubmitPaper === 'Yes, it is same paper' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Yes, it is same paper</Text>
                            </TouchableOpacity>

                            
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row',}}
                            onPress={() => handleSelectSubmitPaper('Yes, it is updated version')}
                        >
                            <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectSubmitPaper === 'Yes, it is updated version' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                {selectSubmitPaper === 'Yes, it is updated version' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)', }} />}
                            </View>
                            <Text style={{ marginLeft: 8, marginTop: 20 }}>Yes, it is updated version</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.paperType}>
                        <Text style={{  fontWeight: "500", marginBottom: 15 }}>Please select the section best suited to the subject of paper:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Plant breeding and genetics')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Plant breeding and genetics' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Plant breeding and genetics' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10}}>Plant breeding and genetics</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Molecular biology, biotechnology and genomics')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Molecular biology, biotechnology and genomics' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Molecular biology, biotechnology and genomics' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Molecular biology, biotechnology and genomics</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Biochemistry and physiology')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Biochemistry and physiology' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Biochemistry and physiology' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10}}>Biochemistry and physiology</Text>
                            </TouchableOpacity> 



                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Crop protection, entomology, pathology and nematology')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Crop protection, entomology, pathology and nematology' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Crop protection, entomology, pathology and nematology' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Crop protection, entomology, pathology and nematology</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Agronomy, soil science and sustainability')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Agronomy, soil science and sustainability' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Agronomy, soil science and sustainability' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Agronomy, soil science and sustainability</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Agro meteorology, climate change and crop modeling')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Agro meteorology, climate change and crop modeling' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Agro meteorology, climate change and crop modeling' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Agro meteorology, climate change and crop modeling</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Economics, social sciences and technology transfer')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Economics, social sciences and technology transfer' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Economics, social sciences and technology transfer' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Economics, social sciences and technology transfer</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Agricultural engineering, robotics & artificial intelligence')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Agricultural engineering, robotics & artificial intelligence' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Agricultural engineering, robotics & artificial intelligence' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Agricultural engineering, robotics & artificial intelligence</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Cotton by-products and their utilization')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Cotton by-products and their utilization' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Cotton by-products and their utilization' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Cotton by-products and their utilization</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
                                onPress={() => handleSelectSubjectPaper('Spinning, fibre processing and textile technologies')}
                            >
                                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: selectedSubjectPaper === 'Spinning, fibre processing and textile technologies' ? 'rgb(0, 149, 182)' : 'black', justifyContent: 'center', alignItems: 'center' }}>
                                    {selectedSubjectPaper === 'Spinning, fibre processing and textile technologies' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'rgb(0, 149, 182)' }} />}
                                </View>
                                <Text style={{ marginLeft: 10 }}>Spinning, fibre processing and textile technologies</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {selectedSubjectPaperError ? <Text style={[styles.error, { position: 'relative', top: -20 }]}>{selectedSubjectPaperError}</Text> : null}

                    <View style={styles.btn}>
                        <TouchableOpacity
                            style={[styles.backButton, { backgroundColor: '#dededb', }]}
                            onPress={handleGoBack}
                        >
                            <Text style={styles.backButtonText}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.nextButton, { backgroundColor: 'rgb(0, 149, 182)', marginLeft: 206 }]}
                            onPress={handleNextPage}
                        >
                            <Text style={styles.addButtonText}>SUBMIT</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        padding: 20,
        paddingHorizontal: 30,
        marginTop: '-10%'
    },
    star: {
        color: 'red',
    },
   
    error: {
        color: 'red',
    },
    btn: {
        marginBottom: 50,
        flexDirection: 'row'
    },
    
    paper: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 15,
        borderColor: "rgba(0,0,0,0.1)",
        marginBottom: 20
    },
    paperType: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 15,
        borderColor: "rgba(0,0,0,0.1)",
        marginBottom: 25
    },
   
    input: {
        fontSize: 14,
        height: 40,
        borderColor: 'gray',
        borderRadius: 22,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    inputUpload: {
        fontSize: 14,
        paddingTop:15,
        paddingBottom: 40,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        borderWidth: 1,
    },

    fieldsContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 25,
        borderRadius:10
    },
    headerText: {
        fontWeight: '500',
        marginBottom: 14,
    },
    addButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 'auto',
    },
    cancelButton: {
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 'auto',
    },
    addButtonText: {
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
    authorForm: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius:10
    },
    authorsTable: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderBottomEndRadius: 10
    },
    authorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    authorHeader: {
        fontWeight: '500',
    },
    hr: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    removeButton: {
        color: 'red', 
        marginLeft: 10
    },
    editButton: {
        color: 'rgb(0, 149, 182)',
        marginLeft: 10
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: 'gray', 
        paddingRight: 50
    },
    backButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
})

export default PaperAndAuthorDetails;