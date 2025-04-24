import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';

const Screen1 = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // loader state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false); // stop loading
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Button
                title="View Details"
                onPress={() => navigation.navigate('Screen2', { product: item })}
                color="#FF6F00"
            />
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#FF6F00" />
                <Text style={{ marginTop: 10 }}>Loading products...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select Product</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default Screen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, // adds spacing for the header
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 40, // Adjusted margin to push the header down
        backgroundColor: '#FF6F00', // Orange background
        color: '#fff', // White text
        paddingVertical: 10, // Added padding for better spacing
    },
    list: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'normal',
        marginBottom: 4,
        fontFamily: 'fuzzy-bubbles',
    },
    price: {
        fontSize: 14,
        color: '#4CAF50',
        marginBottom: 10,
        fontWeight: 'normal',
        fontFamily: 'fuzzy-bubbles',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
