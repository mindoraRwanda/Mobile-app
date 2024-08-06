import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Report() {
    const line = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 50],
                strokeWidth: 2,
            },
        ],
    };

    const pieData = [
        { name: 'hrs Job', population: 12, color: '#27ae60', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Sport', population: 2, color: '#2980b9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Study', population: 5, color: '#f39c12', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Sleep', population: 8, color: '#8e44ad', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Other', population: 3, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };

    const progressData = {
        labels: ['Sport', 'Reading', 'Run'],
        data: [0.4, 0.6, 0.8],
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            router.push(`../Main`);
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>
                        Report
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }}
                    >
                        <FeatherIcon
                            color="#fff"
                            name="more-vertical"
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Text style={styles.textHeader}>Your Daily Progress</Text>
                    <ProgressChart
                        data={progressData}
                        width={Dimensions.get('window').width - 30}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                    <Text style={styles.textHeader}>Daily Activity</Text>
                    <PieChart
                        data={pieData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />
                    <Text style={styles.textHeader}>Your Weekly Progress</Text>
                    <LineChart
                        data={line}
                        width={Dimensions.get('window').width - 30}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#4b0889',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4, 
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    headerAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b0889',
        textAlign: 'center',
        marginVertical: 10,
    },
});
