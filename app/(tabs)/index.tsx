import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, DancingScript_400Regular } from '@expo-google-fonts/dancing-script';
import { CormorantGaramond_300Light, CormorantGaramond_300Light_Italic } from '@expo-google-fonts/cormorant-garamond';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    DancingScript_400Regular,
    CormorantGaramond_300Light,
    CormorantGaramond_300Light_Italic,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con logo y botón COTIZAR */}
      <View style={styles.headerTop}>
        <View style={styles.logoSection}>
          <Text style={styles.logoMain}>Del Castillo</Text>
          <Text style={styles.logoSub}>EVENTOS</Text>
        </View>
        <TouchableOpacity style={styles.cotizarButton}>
          <Text style={styles.cotizarButtonText}>COTIZAR AHORA</Text>
        </TouchableOpacity>
      </View>

      {/* HERO SECTION CON IMAGEN ELEGANTE */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{uri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000'}}
          style={styles.heroImageContainer}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>PREMIUM EXPERIENCE</Text>
            </View>
            
            <Text style={styles.heroTitle}>
              Creamos{'\n'}
              momentos{'\n'}
              <Text style={styles.heroTitleItalic}>inolvidables</Text>
            </Text>
            
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => router.push('/contacto')}
            >
              <Text style={styles.heroButtonText}>COMENZAR AHORA</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
      </View>

      {/* ¿Qué necesitas? */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>¿Qué necesitas?</Text>
          <TouchableOpacity onPress={() => router.push('/Servicios')}>
            <Text style={styles.verTodo}>VER TODO</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionItem} 
            onPress={() => router.push('/Servicios')}
          >
            <View style={styles.quickActionIcon}>
              <Text style={styles.quickActionIconText}>🍽️</Text>
            </View>
            <Text style={styles.quickActionLabel}>Banquetes</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => router.push('/Servicios')}
          >
            <View style={styles.quickActionIcon}>
              <Text style={styles.quickActionIconText}>🎵</Text>
            </View>
            <Text style={styles.quickActionLabel}>Música</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => router.push('/casas')}
          >
            <View style={styles.quickActionIcon}>
              <Text style={styles.quickActionIconText}>🏡</Text>
            </View>
            <Text style={styles.quickActionLabel}>Casas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionItem}
            onPress={() => router.push('/Servicios')}
          >
            <View style={styles.quickActionIcon}>
              <Text style={styles.quickActionIconText}>📸</Text>
            </View>
            <Text style={styles.quickActionLabel}>Fotos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA ELEGANTE */}
      <View style={styles.promoCTA}>
        <Text style={styles.promoCTATitle}>¿Listo para empezar?</Text>
        <Text style={styles.promoCTASubtitle}>Déjanos tus datos y un experto se pondrá en contacto contigo.</Text>
        <TouchableOpacity 
          style={styles.promoCTAButton}
          onPress={() => router.push('/contacto')}
        >
          <Text style={styles.promoCTAButtonText}>CONTACTAR AHORA</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Del Castillo Eventos</Text>
        <Text style={styles.footerText}>Todos los derechos reservados</Text>
      </View>
      
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  
  // HEADER TOP CON LOGO Y BOTÓN COTIZAR
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoSection: {
    alignItems: 'flex-start',
  },
  logoMain: {
    fontSize: 24,
    fontFamily: 'DancingScript_400Regular',
    color: '#1a1a1a',
    letterSpacing: 0,
    lineHeight: 28,
  },
  logoSub: {
    fontSize: 7,
    fontFamily: 'Montserrat_700Bold',
    color: '#1a1a1a',
    letterSpacing: 1.8,
    marginTop: 1,
    textTransform: 'uppercase',
  },
  cotizarButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  cotizarButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // HERO SECTION
  heroContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImageContainer: {
    width: '100%',
    height: 500,
    borderRadius: 40,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  heroBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 25,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 5,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#e67e22',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 54,
    fontFamily: 'CormorantGaramond_300Light',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 36,
    lineHeight: 62,
  },
  heroTitleItalic: {
    fontFamily: 'CormorantGaramond_300Light_Italic',
  },
  heroButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 28,
    width: '90%',
    shadowColor: '#e67e22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  // SECCIÓN ¿QUÉ NECESITAS?
  section: {
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  verTodo: {
    fontSize: 11,
    fontWeight: '700',
    color: '#e67e22',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionItem: {
    width: '22%',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIconText: {
    fontSize: 32,
  },
  quickActionLabel: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    color: '#666',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },

  // PROMO CTA
  promoCTA: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 40,
    paddingHorizontal: 28,
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  promoCTATitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  promoCTASubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 21,
  },
  promoCTAButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 28,
    width: '100%',
    shadowColor: '#e67e22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  promoCTAButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // FOOTER
  footer: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});