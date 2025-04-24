import React from 'react';
import { ScrollView, Text, Image, StyleSheet, Button, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen2 = ({ route, navigation }) => {
    const { product } = route.params;

    const handleAddToCart = async () => {
        try {
            const cart = await AsyncStorage.getItem('cart');
            let cartItems = cart ? JSON.parse(cart) : [];

            // Check if the product already exists in the cart
            const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                // Product already in the cart, increase quantity
                cartItems[existingProductIndex].quantity += 1;
            } else {
                // Product not in the cart, add with quantity 1
                product.quantity = 1;
                cartItems.push(product);
            }

            // Save updated cart to AsyncStorage
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems));

            Alert.alert("Added to Cart", `${product.title} has been added to your cart.`);
            navigation.navigate('Screen3'); // Navigate to Screen3 after adding to cart
        } catch (error) {
            console.error("Failed to add to cart", error);
            Alert.alert("Error", "Failed to add product to cart");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Product Details</Text>
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Button title="Add to Cart" onPress={handleAddToCart} color="#FF6F00" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40, // Add spacing to move the header down
        marginBottom: 20,
        backgroundColor: '#FF6F00', // Orange background
        color: '#fff', // White text
        paddingVertical: 10, // Padding for better appearance
    },
    content: {
        padding: 16,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        color: '#4CAF50',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify',
    },
});

export default Screen2;
