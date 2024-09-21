import React, { useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Switch, Image, Modal, Pressable, } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/Slices/authSlice';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { getUserById } from '@/redux/Slices/userSlice';
import LanguageSelectionModal from './LanguageSelectionModal';

const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Still Under Development');
  const [selectedLocation, setSelectedLocation] = useState('Still Under Development');

  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState('Still Under Development');
  const [languageItems, setLanguageItems] = useState([
    { label: 'Still Under Developement', value: 'Still Under Development' },
  ]);

  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState('Los Angeles, CA');
  const [locationItems, setLocationItems] = useState([
    { label: 'Still Under Development', value: 'Still Under Development' },
  ]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserById(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Settings
          </Text>
          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => {
                router.push('../Dashboard/ProgressTracking');
              }}>
              <FeatherIcon color="#000" name="more-vertical" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.section, { paddingTop: 4 }]}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionBody}>
              <TouchableOpacity
                onPress={() => {
                  router.push("../../Main/Account/EditProfile");
                }}
                style={styles.profile}>
                <Image
                  alt=""
                  source={{ uri: user?.profileImage || 'default_image_url_here' }}
                  style={styles.profileAvatar}
                />
                <View style={styles.profileBody}>
                  <Text style={styles.profileName}>{`${user?.firstName} ${user?.lastName}` }</Text>
                  <Text style={styles.profileHandle}>{user?.email || 'john@example.com'}</Text>
                  <Text style={styles.profileHandle}>ID: {user?.id || 'JCJ-4140'}</Text>
                </View>
                <FeatherIcon color="#bcbcbc" name="chevron-right" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => setLanguageModalVisible(true)}
                style={styles.row}>
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{selectedLanguage}</Text>
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => setLocationModalVisible(true)}
                style={styles.row}>
                <Text style={styles.rowLabel}>Location</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>{selectedLocation}</Text>
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={emailNotifications =>
                    setForm({ ...form, emailNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.emailNotifications} />
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch
                  onValueChange={pushNotifications =>
                    setForm({ ...form, pushNotifications })
                  }
                  style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                  value={form.pushNotifications} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  router.push('../../Main/Account/ContactUs');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  router.push('../../Main/Report');
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Report Bug</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  router.push('../../Main/Account/Rate')
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Rate in App Store</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  router.push('../../Main/Account/TermsAndConditions')
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Terms and Privacy</Text>
                <View style={styles.rowSpacer} />
                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <View
              style={[
                styles.rowWrapper,
                styles.rowFirst,
                styles.rowLast,
                { alignItems: 'center' },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.contentFooter}>App Version 1.00 #Alpha</Text>
      </ScrollView>
    </View>

    {/* Language Modal */}
    {languageModalVisible && (
      <View style={styles.modalBackdrop}>
        <LanguageSelectionModal
      visible={languageModalVisible}
      setVisible={setLanguageModalVisible}
      languageOpen={languageOpen}
      languageValue={languageValue}
      languageItems={languageItems}
      setLanguageOpen={setLanguageOpen}
      setLanguageValue={setLanguageValue}
      setLanguageItems={setLanguageItems}
      setSelectedLanguage={setSelectedLanguage}
    />
      </View>
    )}

    {/* Location Modal */}
    {locationModalVisible && (
      <View style={styles.modalBackdrop}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locationModalVisible}
          onRequestClose={() => {
            setLocationModalVisible(!locationModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => setLocationModalVisible(false)}
                style={styles.modalCloseButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Location</Text>
              <DropDownPicker
                open={locationOpen}
                value={locationValue}
                items={locationItems}
                setOpen={setLocationOpen}
                setValue={setLocationValue}
                setItems={setLocationItems}
                onChangeValue={(value) => setSelectedLocation(value)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setLocationModalVisible(false)}>
                <Text style={styles.textStyle}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )}
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 90,
    height: 90,
    borderRadius: 9999,
    marginRight: 8,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#4A0887',
  },

  /** Modal */
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    marginTop: 20,
    backgroundColor: '#4A0887',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    width: 300,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pickerContainer: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  modalCloseButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
});

export default Account;
