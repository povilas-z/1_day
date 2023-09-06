import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import randomColor from 'randomcolor';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import 'firebase/compat/firestore';

const RandomColorAvatar = () => {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid;
    const docRef = firebase.firestore().collection('users').doc(uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const { color1, color2 } = doc.data();
            if (color1 && color2) {
                setColor1(doc.data().color1);
                setColor2(doc.data().color2);
            } else {
                const newColor1 = randomColor({ format: 'hex' });
                const newColor2 = randomColor({ format: 'hex' });
          
                docRef.set({ color1: newColor1, color2: newColor2 });
                setColor1(newColor1);
                setColor2(newColor2);
            }
        } else {
            const newColor1 = randomColor({ format: 'hex' });
            const newColor2 = randomColor({ format: 'hex' });

            docRef.set({ color1: newColor1, color2: newColor2 });
            setColor1(newColor1);
            setColor2(newColor2);

        }
        setLoading(false);
      }).catch((error) => {
        console.log("Error:", error)
      })
}, []);

if (loading) {
    return null;
}

return (
    <Svg height="85" width="85">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={color1} stopOpacity="1" />
          <Stop offset="1" stopColor={color2} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle cx="42.5" cy="42.5" r="40" fill="url(#grad)" stroke='white' strokeWidth="2" />
    </Svg>
  );
};

export default RandomColorAvatar;
