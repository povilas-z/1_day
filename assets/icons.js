import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const GoogleLogo = () => (
    <Svg width="24" height="24" viewBox="0 0 256 256">
      <Path
        fill="#e24e3c"
        d="M127 0h7c31 1 61 12 84 33l-37 35a73 73 0 0 0-41-18 79 79 0 0 0-84 52L14 70c8-16 20-30 33-41C70 11 98 1 127 0z"
      />
      <Path
        fill="#f7c243"
        d="M0 125c0-19 5-38 14-55l42 32c-5 17-5 35 0 51l-42 32c-9-17-13-36-14-55v-5z"
      />
      <Path
        fill="#4b87f5"
        d="M131 104h122c4 16 3 32 1 48-3 27-16 54-37 72l-41-31c14-9 24-25 27-41h-72v-48z"
      />
      <Path
        fill="#55a85a"
        d="M56 153a78 78 0 0 0 71 53c17 0 35-3 49-13l41 31c-16 14-35 24-56 28a130 130 0 0 1-147-67l42-32z"
      />
    </Svg>
  );

  export const ProfileIcon = ({ fill }) => (
    <Svg viewBox='0 0 24 24 ' width="24" height="24" fill='white'>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  )

  export const TaskIcon = ({ fill }) => (
    <Svg viewBox='0 0 24 24 ' width="24" height="24" fill={fill}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  )

  export const HomeIcon = ({ fill }) => (
    <Svg width="24" height="24" fill={fill}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </Svg>
  )

  export const SettingsIcon = ({ fill }) => (
    <Svg width="24" height="24" fill='white'>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </Svg>
  )