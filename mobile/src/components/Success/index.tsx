import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import successImg from '../../assets/success.png'
import {Copyright} from "../Copyright";

interface Props {
  onsendAnthorFeedback: () => void;
}

export function Success({onsendAnthorFeedback}: Props) {
  return(
    <View style={styles.container}>
      <Image
        source={successImg}
        style={styles.image}
      />

      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onsendAnthorFeedback}
      >
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  )
}