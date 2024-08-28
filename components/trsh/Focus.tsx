// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import React from 'react';

// export default function Focus() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Focus</Text>
//       </View>

//       <Image
//         source={require('../../../assets/ImgForScreen/docRep.jpg')} // Replace with an appropriate image
//         style={styles.image}
//       />

//       <View style={styles.content}>
//         <Text style={styles.description}>
//           Maintaining focus can significantly improve productivity and overall well-being. Explore the following techniques and resources to enhance your focus and concentration.
//         </Text>

//         <Text style={styles.instruction}>
//           Techniques for Enhancing Focus:
//         </Text>

//         {/* Example techniques */}
//         <View style={styles.techniquesContainer}>
//           <Text style={styles.technique}>1. Set clear and specific goals.</Text>
//           <Text style={styles.technique}>2. Break tasks into smaller, manageable steps.</Text>
//           <Text style={styles.technique}>3. Minimize distractions in your environment.</Text>
//           <Text style={styles.technique}>4. Use the Pomodoro Technique for time management.</Text>
//           <Text style={styles.technique}>5. Take regular breaks to rest and recharge.</Text>
//         </View>

//         <TouchableOpacity style={styles.startButton}>
//           <Text style={styles.startButtonText}>Start Focus Exercise</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#e0f7fa', // Light teal background for a calming effect
//     padding: 20,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#004d40', // Dark teal for title
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   content: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 3,
//   },
//   description: {
//     fontSize: 16,
//     color: '#004d40', // Dark teal for text
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   instruction: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#00796b', // Medium teal for instructions
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   techniquesContainer: {
//     marginBottom: 20,
//   },
//   technique: {
//     fontSize: 16,
//     color: '#004d40', // Dark teal for techniques
//     marginVertical: 5,
//   },
//   startButton: {
//     backgroundColor: '#00796b', // Medium teal for start button
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   startButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
