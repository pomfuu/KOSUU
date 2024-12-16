import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Container from '../../styles/Container';
import OrderCard from './OrderCard';
import { db } from '../../dbconfig';
import { useAuth } from '../../authcontext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const OrderCanceled = () => {

  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const ordersRef = collection(db, 'Orders');
    const q = query(
      ordersRef, 
      where('userID', '==', user.uid), // Cari order berdasarkan user UID
      where('status', '==', 'Canceled') // Cari order yang status Packed
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });
      setOrders(fetchedOrders);
    }, (error) => {
      console.error("Error fetching orders: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  console.log(orders);
  //Tes
  return (
    <ScrollView showsVerticalScrollIndicator={false}> 
      <Container>
        <View style={styles.frame}>
          {orders.map(order => (
            <OrderCard key={order.id} orderData={order} isActive={false} />
          ))}
        </View>
      </Container>
    </ScrollView>
  );
  
};

export default OrderCanceled;

const styles = StyleSheet.create({
  frame: {
  },
  text: {
    fontSize: 18,
    color: '#1A47BC',
    textAlign: 'center',
    fontFamily: 'afacad_Medium'
  },
});
