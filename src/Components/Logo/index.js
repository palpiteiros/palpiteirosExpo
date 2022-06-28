import React from 'react';
import { View, Image } from 'react-native';

export default function Logo() {
    return (
        <Image
            style={{ height: 180, width: 300 }}
            source={{ uri: 'https://www.designevo.com/res/templates/thumb_small/green-badge-and-flagged-football.webp' }}
        />
    );
}