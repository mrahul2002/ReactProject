import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

export default function Screen3() {
    const [cartItems, setCartItems] = useState([]);

    // Load cart data every time the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const loadCart = async () => {
                try {
                    const savedCart = await AsyncStorage.getItem('cart');
                    if (savedCart) {
                        setCartItems(JSON.parse(savedCart));
                    }
                } catch (error) {
                    console.error("Error loading cart:", error);
                }
            };
            loadCart();
        }, [])
    );

    const removeFromCart = async (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.totalItems}>Total Items: {totalItems}</Text>
            </View>

            {/* FlatList of Cart Items */}
            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#FF6F00', // Orange background
        paddingVertical: 10, // Padding for better appearance
        alignItems: 'center', // Center align the title
        marginTop: 40, // Add spacing to move the header down
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // White text for the header title
    },
    totalItems: {
        fontSize: 16,
        color: 'white',
        marginTop: 4,
    },
    listContent: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    cardText: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: '#4CAF50',
        marginBottom: 8,
    },
    removeBtn: {
        marginTop: 4,
        backgroundColor: '#e53935',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    removeBtnText: {
        color: 'white',
        fontSize: 14,
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 60,
        color: '#888',
        fontSize: 30,
    },
});
