import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        marginTop: 70,
        flex: 1
    },

    displayContainer: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    displayText: {
        color: '#00974A',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 20
    },

    inputContainer: {
        flex: 8,
    },

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'black'
    },

    inputButtonHighlighted: {
        backgroundColor: '#193441'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00974A'
    },

    inputRow: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default Style;