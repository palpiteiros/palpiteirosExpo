import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colorBranco, colorVerde } from '../../Styles/Cores';

export default function Pb({cor}) {

    let color = colorBranco;

    if(cor) {
      color = cor;
    }

    return (
        <View style={{ flex: 1, minHeight: 48 }}>
          <ActivityIndicator color={color} size='large' />
        </View>
    );
}