// app/(tabs)/contacto.tsx
import AppHeader from '@/components/app-header';
import { API_BASE_URL } from '@/constants/api';
import { Montserrat_400Regular, Montserrat_700Bold, useFonts } from '@expo-google-fonts/montserrat';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function ContactoScreen() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // State hooks deben ir antes del return condicional
  const { width } = useWindowDimensions();
  const isSmall = width < 700;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [sending, setSending] = useState(false);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Esconder splash screen cuando fonts estén cargadas
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      setLoadingServices(true);
      console.log('🔄 Fetching services from:', `${API_BASE_URL}/api/services`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
      
      const res = await fetch(`${API_BASE_URL}/api/services`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) throw new Error(`HTTP ${res.status}: No se pudieron cargar los servicios`);
      const data = await res.json();
      console.log('✅ Servicios cargados:', data);
      setServicesList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('❌ Error fetching services:', err?.message || err);
      let errorMsg = 'No se pudieron cargar los servicios';
      
      if (err?.name === 'AbortError') {
        errorMsg = 'Tiempo agotado. Revisa que el servidor esté corriendo en ' + API_BASE_URL;
      } else if (err?.message?.includes('Network')) {
        errorMsg = 'Error de conexión. ¿El servidor está en ' + API_BASE_URL + '?';
      }
      
      Alert.alert('Error', errorMsg);
    } finally {
      setLoadingServices(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !date) {
      Alert.alert('Faltan campos', 'Por favor completa nombre, correo y fecha del evento.');
      return;
    }

    if (!serviceId) {
      Alert.alert('Servicio requerido', 'Selecciona un servicio válido.');
      return;
    }

    const eventDate = date instanceof Date ? date.toISOString().split('T')[0] : String(date);

    const payload = {
      name,
      email,
      phone: phone || '',
      eventDate,
      house: '',
      message: message || '',
      serviceId,
    };

    try {
      setSending(true);
      console.log('📤 Enviando payload:', payload);
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Error ${res.status}: ${txt}`);
      }

      Alert.alert('✅ Enviado', 'Tu solicitud ha sido enviada correctamente.');
      // Limpiar formulario
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setServiceId('');
      setDate(new Date());
      setMessage('');
    } catch (err) {
      console.error('❌ Error enviando lead:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'No se pudo enviar la solicitud');
    } finally {
      setSending(false);
    }
  };

  // Mostrar loading mientras se cargan los fonts
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contacto</Text>
          <Text style={styles.headerSub}>Cuéntanos qué necesitas y te ayudamos con la organización de tu evento.</Text>
        </View>

      <View style={isSmall ? styles.column : styles.row}>
        <View style={[styles.formCard, isSmall && styles.fullWidthCard]}>
          <Text style={styles.cardTitle}>Solicitar cotización</Text>
          <TextInput style={styles.input} placeholder="Nombre y apellido *" value={name} onChangeText={setName} placeholderTextColor="#C0C0C0" />
          <TextInput style={styles.input} placeholder="Correo electrónico *" value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#C0C0C0" />
          <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor="#C0C0C0" />

          <View style={[styles.inlineRow, isSmall && styles.inlineColumn]}>
            {/* ✅ SERVICIO SELECTOR MEJORADO */}
            <TouchableOpacity
              style={[styles.input, isSmall ? styles.full : styles.half, styles.selectButton]}
              onPress={() => setShowServicePicker(true)}
            >
              <Text style={{ color: service ? '#000' : '#888', fontWeight: service ? '600' : '400' }}>
                {service || 'Tipo de servicio *'}
              </Text>
            </TouchableOpacity>

            {/* MODAL DE SERVICIOS */}
            <Modal visible={showServicePicker} animationType="slide" transparent={true}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Selecciona un servicio</Text>
                    <TouchableOpacity onPress={() => setShowServicePicker(false)}>
                      <Text style={styles.modalClose}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {loadingServices ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                      <ActivityIndicator size="large" color="#F4A042" />
                    </View>
                  ) : (
                    <ScrollView>
                      {servicesList && servicesList.length > 0 ? (
                        servicesList.map((s) => (
                          <TouchableOpacity
                            key={s._id}
                            style={styles.modalItem}
                            onPress={() => {
                              setService(s.name);
                              setServiceId(s._id);
                              setShowServicePicker(false);
                            }}
                          >
                            <Text style={styles.modalItemText}>{s.name}</Text>
                            {s.description && <Text style={styles.modalItemSub}>{s.description}</Text>}
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text style={styles.modalEmpty}>No hay servicios disponibles</Text>
                      )}
                    </ScrollView>
                  )}
                </View>
              </View>
            </Modal>

            {/* ✅ FECHA MEJORADA CON MINICALENDARIO */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.input, isSmall ? styles.full : styles.half, styles.selectButton]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: date ? '#000' : '#888', fontWeight: date ? '600' : '400' }}>
                {date ? date.toLocaleDateString('es-CO', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Fecha del evento *'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                minimumDate={new Date()}
                onChange={(event: any, selectedDate?: Date) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                  // Cerrar picker en ambas plataformas después de seleccionar
                  setShowDatePicker(false);
                }}
                textColor="#1A1A1A"
                accentColor="#E67E22"
              />
            )}
          </View>

          <TextInput style={[styles.input, styles.textarea]} placeholder="Mensaje (opcional)" value={message} onChangeText={setMessage} multiline numberOfLines={5} placeholderTextColor="#C0C0C0" />

          <TouchableOpacity 
            style={[styles.submit, sending && styles.submitDisabled]} 
            onPress={handleSubmit}
            disabled={sending}
          >
            <Text style={styles.submitText}>{sending ? 'Enviando...' : 'Enviar solicitud'}</Text>
          </TouchableOpacity>
        </View>

  <View style={[styles.sideColumn, isSmall && styles.fullWidthCard] }>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Datos de contacto</Text>
            <Text style={styles.infoText}>Puedes escribirnos por correo o WhatsApp. ¡Responderemos lo antes posible!</Text>
            <Text style={styles.bold}>Correo:</Text>
            <Text style={styles.infoText}>delcastilloeventos.jf@gmail.com</Text>
            <Text style={styles.bold}>WhatsApp:</Text>
            <Text style={styles.infoText}>+51 961 212 121</Text>
            <TouchableOpacity style={styles.whatsappBtn} onPress={() => Linking.openURL('https://wa.me/51961212121')}>
              <Text style={styles.whatsappText}>Escribir por WhatsApp</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>¿Por qué elegirnos?</Text>
            <View style={styles.bullet}><Text>• Asesoría personalizada y respuesta rápida</Text></View>
            <View style={styles.bullet}><Text>• Presupuestos a medida y transparentes</Text></View>
            <View style={styles.bullet}><Text>• Experiencia en bodas, corporativos y sociales</Text></View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Preguntas frecuentes</Text>
            {[
              {
                q: '¿En cuánto tiempo responden?',
                a: 'Normalmente dentro del mismo día hábil. Si es urgente, escríbenos por WhatsApp.'
              },
              {
                q: '¿Puedo pedir un presupuesto sin compromiso?',
                a: '¡Claro! Envíanos los detalles de tu evento y te proponemos opciones sin compromiso.'
              },
              {
                q: '¿Trabajan fuera de la ciudad?',
                a: 'Sí, coordinamos logística y desplazamiento según el proyecto y presupuesto.'
              }
            ].map((item, idx) => {
              const open = openFaq === idx;
              return (
                <View key={idx}>
                  <TouchableOpacity style={styles.qRow} onPress={() => setOpenFaq(open ? null : idx)}>
                    <Text style={styles.qText}>{item.q}</Text>
                    <Text style={[styles.chev, open && styles.chevOpen]}>{open ? '▾' : '▸'}</Text>
                  </TouchableOpacity>
                  {open ? <Text style={styles.aText}>{item.a}</Text> : null}
                </View>
              );
            })}
          </View>
        </View>
      </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF7' },
  scroll: { flex: 1 },
  content: { paddingBottom: 20 },
  
  // Header Section
  header: { backgroundColor: 'transparent', paddingVertical: 0, paddingHorizontal: 0 },
  headerTitle: { fontSize: 32, fontWeight: '700', color: '#1A1A1A', marginBottom: 8, paddingHorizontal: 16, paddingTop: 20, fontFamily: 'Montserrat_700Bold' },
  headerSub: { color: '#6B6B6B', paddingHorizontal: 16, marginBottom: 20, fontSize: 15, fontFamily: 'Montserrat_400Regular', lineHeight: 22 },
  
  // Layout
  row: { flexDirection: 'row', paddingHorizontal: 16, gap: 20 },
  column: { flexDirection: 'column', paddingHorizontal: 16 },
  
  // Form Card
  formCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 32, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  sideColumn: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16, color: '#1A1A1A', fontFamily: 'Montserrat_700Bold' },
  
  // Inputs
  input: { borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, marginBottom: 12, backgroundColor: '#FFFFFF', color: '#1A1A1A', fontSize: 14, fontFamily: 'Montserrat_400Regular' },
  selectButton: { justifyContent: 'center', paddingVertical: 16 },
  
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { maxHeight: '75%', backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 12 },
  modalTitle: { fontWeight: '700', fontSize: 18, color: '#1A1A1A', fontFamily: 'Montserrat_700Bold' },
  modalClose: { fontSize: 24, color: '#999' },
  modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  modalItemText: { fontSize: 15, fontWeight: '500', color: '#1A1A1A', fontFamily: 'Montserrat_700Bold' },
  modalItemSub: { fontSize: 13, color: '#999', marginTop: 4, fontFamily: 'Montserrat_400Regular' },
  modalEmpty: { textAlign: 'center', paddingVertical: 20, color: '#999', fontFamily: 'Montserrat_400Regular' },

  inlineRow: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  inlineColumn: { flexDirection: 'column' },
  half: { flex: 1 },
  full: { width: '100%' },
  fullWidthCard: { width: '100%', marginLeft: 0, marginTop: 16 },
  
  textarea: { height: 100, textAlignVertical: 'top', borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, backgroundColor: '#FFFFFF', color: '#1A1A1A', fontSize: 14, fontFamily: 'Montserrat_400Regular' },
  
  // Submit Button
  submit: { backgroundColor: '#E67E22', paddingVertical: 20, paddingHorizontal: 24, borderRadius: 16, alignItems: 'center', marginTop: 8, shadowColor: '#E67E22', shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 },
  submitDisabled: { opacity: 0.6 },
  submitText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16, textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Montserrat_700Bold' },
  
  // Info Cards
  infoCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 2, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', alignItems: 'center' },
  infoTitle: { fontWeight: '700', marginBottom: 12, color: '#1A1A1A', textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, fontFamily: 'Montserrat_700Bold' },
  infoText: { color: '#1A1A1A', marginBottom: 0, fontWeight: '700', fontSize: 15, textAlign: 'center', fontFamily: 'Montserrat_700Bold' },
  bold: { fontWeight: '700', marginTop: 8 },
  
  whatsappBtn: { marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E8', marginBottom: 12 },
  whatsappText: { color: '#1A1A1A', fontWeight: '700', fontSize: 14, fontFamily: 'Montserrat_700Bold' },
  
  bullet: { paddingVertical: 8, flexDirection: 'row', alignItems: 'flex-start' },
  
  qRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  qText: { fontWeight: '600', color: '#1A1A1A', fontSize: 14, flex: 1, fontFamily: 'Montserrat_700Bold' },
  chev: { color: '#D4AF37', marginLeft: 12, fontWeight: '700' },
  chevOpen: { transform: [{ rotate: '90deg' }] },
  aText: { color: '#6B6B6B', paddingVertical: 12, paddingHorizontal: 0, fontFamily: 'Montserrat_400Regular', fontSize: 14 },
});
