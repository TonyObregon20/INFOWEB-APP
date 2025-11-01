// app/(tabs)/index.tsx
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header con logo y menú */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/LOGO_DEL_CASTILLO.png')} // Ajusta la ruta si tu logo tiene otro nombre
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Sección naranja principal */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Organizamos el evento que imaginas</Text>
        <Text style={styles.heroSubtitle}>
          Servicios para bodas, corporativos y celebraciones. Cotiza fácil y rápido.
        </Text>
        <TouchableOpacity style={styles.whatsappButton}>
          <Text style={styles.buttonText}>💬 Cotizar por WhatsApp</Text>
        </TouchableOpacity>
       
      </View>

      {/* ¿Qué necesitas? */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Qué necesitas?</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={[styles.gridItem, styles.serviceItem]}
          onPress={() => router.push('/Servicios')}>
            <Text style={styles.icon}>⭐</Text>
            <Text style={styles.gridText}>Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, styles.houseItem]}
          onPress={() => router.push('/casas')}>
            <Text style={styles.icon}>🏡</Text>
            <Text style={styles.gridText}>Casas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, styles.usItem]}
          onPress={() => router.push('/nosotros')}>
            <Text style={styles.icon}>📅</Text>
            <Text style={styles.gridText}>Nosotros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridItem, styles.contactItem]}
          onPress={() => router.push('/contacto')}>
            <Text style={styles.icon}>📞</Text>
            <Text style={styles.gridText}>Contacto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ¿Por qué elegirnos? */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>
        <View style={styles.reasonsList}>
          <View style={styles.reasonItem}>
            <View style={styles.reasonIcon}>
              <Text>✨</Text>
            </View>
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Experiencia</Text>
              <Text style={styles.reasonSubtitle}>+120 eventos exitosos</Text>
            </View>
          </View>
          <View style={styles.reasonItem}>
            <View style={styles.reasonIcon}>
              <Text>🎯</Text>
            </View>
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Personalizado</Text>
              <Text style={styles.reasonSubtitle}>Cada evento es único</Text>
            </View>
          </View>
          <View style={styles.reasonItem}>
            <View style={styles.reasonIcon}>
              <Text>💬</Text>
            </View>
            <View style={styles.reasonText}>
              <Text style={styles.reasonTitle}>Cotización rápida</Text>
              <Text style={styles.reasonSubtitle}>Respuesta en 24 horas</Text>
            </View>
          </View>
        </View>
      </View>

      {/* CTA final */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>¿Listo para comenzar?</Text>
        <Text style={styles.ctaSubtitle}>Cotiza tu evento ahora</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>💬 Contactar por WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Del Castillo Eventos.</Text>
        <Text style={styles.footerText}>Todos los derechos reservados.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 100,   // Ajusta el ancho según tu logo
  height: 40, 
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#333',
  },
  heroSection: {
    backgroundColor: '#FFA500', // Naranja
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  whatsappButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '90%',
  },
  servicesButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  serviceItem: {
    backgroundColor: '#FFD700', // Amarillo claro
  },
  houseItem: {
    backgroundColor: '#FF8C00', // Naranja oscuro
  },
  usItem: {
    backgroundColor: '#1a1a2e', // Negro oscuro
    color: '#fff',
  },
  contactItem: {
    backgroundColor: '#E94E0F', // Rojo anaranjado
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
    color: '#fff',
  },
  gridText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  reasonsList: {
    gap: 10,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
  },
  reasonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  reasonText: {
    flex: 1,
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reasonSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  ctaSection: {
    backgroundColor: '#FFA500', // Naranja
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  footer: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});