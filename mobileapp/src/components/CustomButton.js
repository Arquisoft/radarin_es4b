import React, {useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = ({
  action,
  text,
  customContainerStyles,
  customContentStyles,
}) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={customContainerStyles}
      onPress={action}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <Text
        style={{
          ...styles.button,
          ...customContentStyles,
          backgroundColor: pressed ? '#085fbd' : '#007bff',
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 100,
    borderRadius: 4,
    color: 'white',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});

export default CustomButton;
