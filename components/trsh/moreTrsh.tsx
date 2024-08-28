{/* <View style={styles.exercisesSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Mental Health Checkups</Text>
          </View>

          <ScrollView contentContainerStyle={styles.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.exercisesList}>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Test' as never)}>
                <Image source={require('../../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Beck's Depression Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Resources' as never)}>
                <Image source={require('../../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Resource</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxietys' as never)}>
                <Image source={require('../../../assets/ImgForScreen/analysis.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Take Test</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Suicide' as never)}>
                <Image source={require('../../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Suicide Behaviors Questionnaire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Questionnaire' as never)}>
                <Image source={require('../../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Alcohol Use Disorders Identification Test</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View> */}

        {/* <View style={styles.exercisesSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Exercise</Text>
          </View>

          <ScrollView contentContainerStyle={styles.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.exercisesList}>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Meditation' as never)}>
                <Image source={require('../../../assets/ImgForScreen/med.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Meditation</Text>
                <Text style={styles.exerciseSubtext}>Meditate with Melody</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Breathing' as never)}>
                <Image source={require('../../../assets/ImgForScreen/Breathing.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Breathing</Text>
                <Text style={styles.exerciseSubtext}>Breathe Relax Revive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Better' as never)}>
                <Image source={require('../../../assets/ImgForScreen/med1.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Better Sleep</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxiety' as never)}>
                <Image source={require('../../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Focus' as never)}>
                <Image source={require('../../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Focus</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View> */}


        const therapists: Therapist[] = [
    {
      name: 'Noella Nizigama',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../../../assets/ImgForScreen/team3.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Uwirora Gilbert',
      location: 'Kigali',
      job: 'Clinical Psychologist',
      image: require('../../../../assets/ImgForScreen/team2.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Murenzi Patrick',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../../../assets/ImgForScreen/team5.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Nsengiyumva Athanaze',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../../../assets/ImgForScreen/team6.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
  ];