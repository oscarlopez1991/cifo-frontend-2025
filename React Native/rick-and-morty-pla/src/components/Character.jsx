import { Image, Pressable, StyleSheet, View, Text } from 'react-native'
import Colors from '../common/Colors'

const Character = ({ gender, image, name, species, status, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ backgroundColor: pressed ? Colors.cell : '#fff' }]}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} accessibilityLabel={name} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>Species: {species}</Text>
          <Text style={styles.description}>Gender: {gender}</Text>
          <Text style={styles.description}>Status: {status}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const size = 100
const padding = 16

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: size,
    paddingLeft: padding,
    alignItems: 'center',
  },
  image: {
    height: size - padding,
    width: size - padding,
    borderRadius: (size - padding) / 2,
    marginRight: padding,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
  },
})

export default Character
