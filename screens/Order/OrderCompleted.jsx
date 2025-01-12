import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from '../../styles/Container';
import OrderCard from './OrderCard';
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const OrderCompleted = () => {

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const ordersRef = collection(db, 'Orders');
    const q = query(
      ordersRef, 
      where('userID', '==', user.uid),
      where('status', '==', 'Completed') 
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        const orderData = doc.data();
        const userReviewed = orderData.reviews?.some(review => review.userId === user.uid);
        fetchedOrders.push({ id: doc.id, ...orderData, userReviewed });
      });
      setOrders(fetchedOrders);
    }, (error) => {
      console.error("Error fetching orders: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <ScrollView style={{ marginBottom: 70 }} showsVerticalScrollIndicator={false}> 
      <Container>
        <View style={styles.frame}>
          {orders.length === 0 ? (
            <Text style={styles.noOrderText}>No Order Yet</Text>
          ) : (
            orders.map(order => (
              <OrderCard 
                key={order.id} 
                orderData={order} 
                isActive={!order.userReviewed} 
              />
            ))
          )}
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frame: {},
  noOrderText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'afacad_Bold',
    marginTop: 20,
  },
});

export default OrderCompleted;
