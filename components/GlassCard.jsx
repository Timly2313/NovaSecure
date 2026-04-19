// components/GlassCard.jsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../utilities/dimensions';

const GlassCard = ({ children, style, onClick, disabled = false }) => {
  const cardStyles = [styles.card, style];
  
  if (onClick) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onClick}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(26, 31, 46, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(77, 182, 172, 0.2)',
    borderRadius: wp(4),
    shadowColor: '#4DB6AC',
    shadowOffset: {
      width: 0,
      height: hp(0.5),
    },
    shadowOpacity: 0.1,
    shadowRadius: wp(4),
    elevation: 5,
  },
});

export default GlassCard;