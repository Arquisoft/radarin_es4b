import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import getText from '../i18n.js';

const CustomLoadingButton = ({
  action,
  text,
  customContainerStyles,
  customContentStyles,
}) => {
  const [pressed, setPressed] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (isLoading) {
      action().then(() => {
        if (mounted) setLoading(false);
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [action, isLoading]);

  const onPress = () => setLoading(true);

  return (
    <Pressable
      style={customContainerStyles}
      onPress={!isLoading ? onPress : null}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      <Text
        style={{
          ...styles.button,
          ...customContentStyles,
          backgroundColor: isLoading? '#808080' :pressed ? '#085fbd' : '#007bff',
        }}>
        {isLoading ? getText('loading') : text}
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

export default CustomLoadingButton;
