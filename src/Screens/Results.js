import React, {Component} from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native'
import {LineChart} from "react-native-chart-kit";
import UserAvatar from "react-native-user-avatar";
import moment from "moment";

export default class Results extends Component {
    state = {
        results: [],
        uid: '',
        accessToken: '',
        client: '',
    };

    componentWillMount() {
        AsyncStorage.getItem('userLogin', (err, value) => {
            if (value !== null) {
                this.setState({...JSON.parse(value)}, () => this.getResults());
            }
        });
    }

    getResults() {
        fetch('https://secret-inlet-80309.herokuapp.com/api/v1/results', {
            method: 'GET',
            headers: {
                'access-token': this.state.accessToken,
                'uid': this.state.uid,
                'client': this.state.client
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                Alert.alert('Oops!', response.status.toString())
            }
        }).then(json => {
            // Alert.alert(JSON.stringify(json));
            // Alert.alert('results length:', this.state.results[0].bilirubin.toString());
            //this.setState({results: json}, () => Alert.alert('results length:', (this.state.results && this.state.results.length > 0) ? this.getDates()[0] : 'false'));
            this.setState({results: json});
        });
    }

    getDates() {
        let index, len;
        let output = [];
        let res = this.state.results;
        for (index = 0, len = res.length; index < len; ++index) {
            //let created_at = new Date(res[index].created_at).toISOString().substring(0, 10);
            let d = new Date(res[index].created_at);
            output.push(moment(d).format("MM/YY"));
        }

        if (output.length < 6) {
            for (index = 0, len = 6 - (output.length); index < len; ++index) {
                output.push('-');
            }
        }

        return output;
    }

    getPH() {
        let index, len;
        let output = [];
        let res = this.state.results;
        for (index = 0, len = res.length; index < len; ++index) {
            let ph = res[index].ph;
            output.push(ph);
        }

        if (output.length < 6) {
            for (index = 0, len = 6 - (output.length); index < len; ++index) {
                output.push(0);
            }
        }

        return output;
    }

    getKetones() {
        let index, len;
        let output = [];
        let res = this.state.results;
        for (index = 0, len = res.length; index < len; ++index) {
            let ket = res[index].ketones;
            output.push(ket);
        }

        if (output.length < 6) {
            for (index = 0, len = 6 - (output.length); index < len; ++index) {
                output.push(0);
            }
        }

        return output;
    }

    getBilirubin() {
        let index, len;
        let output = [];
        let res = this.state.results;
        for (index = 0, len = res.length; index < len; ++index) {
            let bil = res[index].bilirubin;
            output.push(bil);
        }

        if (output.length < 6) {
            for (index = 0, len = 6 - (output.length); index < len; ++index) {
                output.push(0);
            }
        }

        return output;
    }

    getGlucose() {
        let index, len;
        let output = [];
        let res = this.state.results;
        for (index = 0, len = res.length; index < len; ++index) {
            let glu = res[index].glucose;
            output.push(glu);
        }

        if (output.length < 6) {
            for (index = 0, len = 6 - (output.length); index < len; ++index) {
                output.push(0);
            }
        }

        return output;
    }

    render() {
        return (
            <View style={styles.container}>
                {(this.state.results && this.state.results.length > 0)
                    ?
                    <View>
                        <ScrollView>
                            <View style={{ bottom: 4, top: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.labelText}>PH</Text>
                            </View>
                            <LineChart
                                data={{
                                    labels: this.getDates().slice(0, 6),
                                    //labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: this.getPH(),
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                            <View style={{ bottom: 4, top: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.labelText}>KETONES</Text>
                            </View>
                            <LineChart
                                data={{
                                    labels: this.getDates().slice(0, 6),
                                    //labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: this.getKetones(),
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                            <View style={{ bottom: 4, top: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.labelText}>BILIRUBIN</Text>
                            </View>
                            <LineChart
                                data={{
                                    labels: this.getDates().slice(0, 6),
                                    //labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: this.getBilirubin(),
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                            <View style={{ bottom: 4, top: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.labelText}>GLUCOSE</Text>
                            </View>
                            <LineChart
                                data={{
                                    labels: this.getDates().slice(0, 6),
                                    //labels: ["January", "February", "March", "April", "May", "June"],
                                    datasets: [
                                        {
                                            data: this.getGlucose(),
                                        }
                                    ]
                                }}
                                width={Dimensions.get("window").width} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#ffa726"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </ScrollView>
                    </View>
                    :
                    <Text style={{color: "white", fontWeight: "bold", fontSize: 16}}>Oops!, there is no results yet!</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D0C9D6',
    },
    labelText:{
        color:"white",
        fontWeight: "bold",
        fontSize:16,
        height: 30
    },
});
