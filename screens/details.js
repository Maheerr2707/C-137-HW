import React, { Component } from "react"
import { StyleSheet, Text, View, FlatList, Alert, SafeAreaView } from 'react-native';
import axios from "axios"
import { Card, Icon } from 'react-native-elements'

export default class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      details: {},
      imagePath: "",
      URL: `https://2645-106-214-190-252.ngrok.io/stars?name=${this.props.navigation.getParam("stars_name")}`
    }
  }
  componentDidMount() {
    this.getDetails()
  }

  getDetails = () => {
    const { URL } = this.state
    axios.get(URL).then((response) => {
      this.setDetails(response.data.data)
    })
      .catch((error) => {
        Alert.alert(error.message())
      })
  }

  setDetails = (starsDetails) => {
    const stars_type = starsDetails.stars_type
    let imagePath = ""
    switch (stars_type) {
      case "Gas Giant":
        imagePath = require("../assets/gas_giant.png")
        break;

      case "Terrestrial":
        imagePath = require("../assets/terrestrial.png")
        break;

      case "Super Earth":
        imagePath = require("../assets/super_earth.png")
        break;

      case "Neptune Like":
        imagePath = require("../assets/neptune_like.png")
        break;

    }
    this.setState({ details: starsDetails, imagePath: imagePath })
  }
  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={styles.cardItem}
              >{`stars Mass : ${details.stars_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`stars Radius : ${details.stars_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`stars Type : ${details.stars_type}`}</Text>
            </View>
            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});