import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colorBranco, colorVerde } from '../../Styles/Cores';

export default function Pb() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <ActivityIndicator color={colorBranco} size='large' />
        </View>
    );
}