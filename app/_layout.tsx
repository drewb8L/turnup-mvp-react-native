import {Platform} from 'react-native';
const SHOW_STORYBOOK = false;

import React from 'react';
import StorybookUIRoot from '../.storybook';

export default function RootLayoutWrapper() {
  if (__DEV__ && SHOW_STORYBOOK && Platform.OS === 'ios') {
    const StorybookUIRoot = require('../.storybook/index').default;
    return <StorybookUIRoot />;
  } else {
    const { Stack } = require('expo-router');
    return <Stack />;
  }
}
