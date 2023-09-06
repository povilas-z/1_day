import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Button({mode, style, labelStyle, ...props }){
    return (
        <PaperButton
            style= {[
                styles.button,
                mode === 'outlined' && {backgroundColor: theme.colors.surface},
                style,
            ]}
            labelStyle={[styles.text, labelStyle]}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        borderRadius: 15,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
    },
})