import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colorBranco, colorVerde } from '../../Styles/Cores';

export default function Pb({cor, style}) {

    let color = colorBranco;

    if(cor) {
      color = cor;
    }

    return (
        <View style={[{ flex: 1, minHeight: 48, marginTop: 6 }, style]}>
          <ActivityIndicator color={color} size='large' />
        </View>
    );
}