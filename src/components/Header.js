import { StyleSheet } from 'react-native';
import  React  from "react";
import { Text } from 'react-native-paper';
import  { theme }  from '../core/theme';

export default function Header(props) {
    return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
        lineHeight: 25,
        marginTop: 15,
        marginBottom: -5,
    },
})