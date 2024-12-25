import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import profPic from '../assets/KOSU/Profile/pic2.jpg'
import profPic2 from '../assets/KOSU/Profile/profilePicture.png'

const ReviewCard = ({ name, profileImage, review }) => {
    const [imageUrl, setImageUrl] = useState(null);

     useEffect(() => {
        const loadImage = async () => {
            try {
                // Cek profileimage, apakah awalannya http
                if (profileImage?.startsWith('http')) {
                    setImageUrl(profileImage);
                    return;
                }
                
                // Kalo awalannya gs:// , convert ke HTTP
                if (profileImage?.startsWith('gs://')) {
                    const storage = getStorage();
                    const imageRef = ref(storage, profileImage);
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                }
            } catch (error) {
                console.error('Error loading image:', error);
                setImageUrl(null);
            }
        };

        loadImage();
    }, [profileImage]);

  return (
    <View style={{ gap: 10, marginTop: 10 }}>
        
        <View style={styles.wrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
                <Image source={{ uri: imageUrl }} style={{ height: 55, width: 55, marginVertical: 15, marginLeft: 25, borderRadius: 100 }} />
            </View>
            <View style={{ marginLeft: 15, }}>
                <Text style={{ fontSize: 16, fontFamily:'afacad_SemiBold' }}>{name}</Text>
                <Text style={{ fontSize: 16, fontFamily:'afacad_Regular' }}>{review}</Text>
            </View>
        </View>
        </View>
    </View>
  )
}

export default ReviewCard

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#F3F0E1',
        borderRadius: 5,
    }
})