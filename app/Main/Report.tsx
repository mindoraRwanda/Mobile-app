import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import {
    LineChart,
    PieChart,
    ProgressChart,
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native';



export default function Report() {
    const line = {
        labels: ['Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'sat', 'sun'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 50, 10, 40, 95, -4, -24, 85, 91],
                strokeWidth: 2,
            },
        ],
    };
    const data = [50, 10, 40, 95, -4, -24, 85, 91];
    const pieData = [
        {
            name: 'hrs Job',
            population: 12,
            color: '#27ae60',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'hrs Sport',
            population: 2,
            color: '#2980b9',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'hrs Study',
            population: 5,
            color: '#f39c12',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'hrs Sleep',
            population: 8,
            color: '#8e44ad',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'hrs other',
            population: 3,
            color: 'rgb(0, 0, 255)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(74, 8, 135, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const data1 = {
        labels: ["sport", "Reading", "Run"], // optional
        data: [0.4, 0.6, 0.8]
    };
    return (
        <SafeAreaView style={styles.container}>
           
            <View style={styles.header} >
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/user.jpg')}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Welcome, Mike John</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.textHeader}>Your Daily progress</Text>
                <View style={styles.bodyNav}>
                    {/* <ProgressChart
                        data={data1}
                        width={Dimensions.get('window').width - 30} // from react-native
                        height={100}
                        strokeWidth={10}
                        radius={15}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    /> */}

                    <Image
                        style={{ width: '100%' }}
                        source={require('../../assets/stat1.jpg')}
                    />
                </View>
                <Text style={styles.textHeader}>Dialy Activity</Text>
                <View style={styles.bodyAvatar}>
                    {/* <PieChart
                        data={pieData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    /> */}
                    <Image
                        style={{ width: '100%' }}
                        source={require('../../assets/stat2.jpg')}
                    />

                </View>
                <View>
                    <Text style={styles.textHeader}>
                        Your Weekly progress
                    </Text>
                    <View>
                        {/* <LineChart
                            data={line}
                            width={Dimensions.get('window').width - 30} // from react-native
                            height={220}
                            yAxisLabel={''}
                            chartConfig={{
                                backgroundColor: '#003f5c',
                                backgroundGradientFrom: '#003f5c',
                                backgroundGradientTo: '#7a5195',
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: '0', // this will make dots invisible
                                },
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        /> */}
                        <Image
                            style={{ width: 400 }}
                            source={require('../../assets/stat3.jpg')}
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        flex: 1,
        backgroundColor: '#4b08893f',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        padding: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    body: {
        flex: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    bodyNav: {
        flex: 1,
        backgroundColor: '#4b08893f',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        margin: 1,
        alignItems: 'center',
    },
    bodyAvatar: {
        flex: 2,
        backgroundColor: '#4b08893f',
        width: '100%',
        borderRadius: 10,
        paddingBottom: 40,
        margin: 10,
    },
    bodyGraph: {
        flex: 3,
        backgroundColor: '#4b08893f',
        width: '100%',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b0889',
        textAlign: 'center',
    },

});
