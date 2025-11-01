// app/(tabs)/contacto.tsx
import { API_BASE_URL } from '@/constants/api';
import { getSelectedService } from '@/utils/selectedService';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function ContactoScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 700;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [sending, setSending] = useState(false);
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // fetch services to allow resolving service name -> id
    const fetchServicios = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        if (!res.ok) return;
        const data = await res.json();
        setServicesList(data || []);
      } catch (err) {
        // ignore, services are optional for this form
      }
    };
    fetchServicios();
  }, []);

  const handleSubmit = async () => {
    // Normalize event date to ISO yyyy-mm-dd
    if (!name || !email || !date) {
      Alert.alert('Faltan campos', 'Por favor completa nombre, correo y fecha del evento.');
      return;
    }

    // Try to resolve serviceId: first check selectedService, then match by name
    const selected = getSelectedService();
    let serviceId: string | undefined;
    if (selected && selected._id) serviceId = selected._id;
    else if (service) {
      const found = servicesList.find((s) => s.name && s.name.toLowerCase().trim() === service.toLowerCase().trim());
      if (found) serviceId = found._id;
    }

    if (!serviceId) {
      Alert.alert('Servicio requerido', 'Selecciona un servicio válido desde la pantalla de Servicios o escribe exactamente el nombre del servicio.');
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
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Error ${res.status}: ${txt}`);
      }

      Alert.alert('Enviado', 'Tu solicitud ha sido enviada correctamente.');
      // clear form
      setName('');
      setEmail('');
      setPhone('');
      setService('');
      setDate(null);
      setMessage('');
    } catch (err) {
      console.error('Error enviando lead:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'No se pudo enviar la solicitud');
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacto</Text>
        <Text style={styles.headerSub}>Cuéntanos qué necesitas y te ayudamos con la organización de tu evento.</Text>
      </View>

      <View style={isSmall ? styles.column : styles.row}>
        <View style={[styles.formCard, isSmall && styles.fullWidthCard]}>
          <Text style={styles.cardTitle}>Solicitar cotización</Text>
          <TextInput style={styles.input} placeholder="Nombre y apellido *" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Correo electrónico *" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <View style={[styles.inlineRow, isSmall && styles.inlineColumn]}>
            {servicesList && servicesList.length > 0 ? (
              <>
                <TouchableOpacity
                  style={[styles.input, isSmall ? styles.full : styles.half, styles.dateInput]}
                  onPress={() => setShowServicePicker(true)}
                >
                  <Text style={{ color: service ? '#000' : '#888' }}>{service || 'Tipo de servicio'}</Text>
                </TouchableOpacity>

                <Modal visible={showServicePicker} animationType="slide" transparent={true}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Selecciona un servicio</Text>
                      <ScrollView>
                        {servicesList.map((s) => (
                          <TouchableOpacity
                            key={s._id}
                            style={styles.modalItem}
                            onPress={() => {
                              setService(s.name);
                              // set global selected like other screens might expect
                              try {
                                // lazy import/set to avoid circulars — use dynamic require
                                const { setSelectedService } = require('@/utils/selectedService');
                                setSelectedService(s);
                              } catch (e) {
                                // ignore
                              }
                              setShowServicePicker(false);
                            }}
                          >
                            <Text>{s.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                      <TouchableOpacity style={styles.modalClose} onPress={() => setShowServicePicker(false)}>
                        <Text style={{ color: '#fff' }}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </>
            ) : (
              <TextInput style={[styles.input, isSmall ? styles.full : styles.half]} placeholder="Tipo de servicio" value={service} onChangeText={setService} />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.input, isSmall ? styles.full : styles.half, styles.dateInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ color: date ? '#000' : '#888' }}>{date ? date.toLocaleDateString() : 'Fecha del evento'}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date ?? new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={(event: any, selectedDate?: Date) => {
                  // On Android the picker closes after selection; on iOS it may remain open
                  if (Platform.OS === 'android') {
                    setShowDatePicker(false);
                  }
                  if (selectedDate) setDate(selectedDate);
                }}
              />
            )}
          </View>

          <TextInput style={[styles.input, styles.textarea]} placeholder="Mensaje *" value={message} onChangeText={setMessage} multiline numberOfLines={5} />

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar solicitud</Text>
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  content: { paddingBottom: 40 },
  header: { backgroundColor: '#F4B36A', paddingVertical: 24, paddingHorizontal: 16 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#3a2b1f', marginBottom: 6 },
  headerSub: { color: '#4b3a2d' },
  row: { flexDirection: 'row', padding: 16, gap: 16 },
  column: { flexDirection: 'column', padding: 12 },
  formCard: { flex: 2, backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  sideColumn: { flex: 1, marginLeft: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, padding: 10, marginBottom: 10, backgroundColor: '#fff' },
  dateInput: { justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', maxHeight: '70%', backgroundColor: '#fff', borderRadius: 10, padding: 12 },
  modalTitle: { fontWeight: '700', marginBottom: 8 },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalClose: { marginTop: 12, backgroundColor: '#F4A042', padding: 10, borderRadius: 8, alignItems: 'center' },
  inlineRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
  inlineColumn: { flexDirection: 'column' },
  half: { flex: 1 },
  full: { width: '100%' },
  fullWidthCard: { width: '100%', marginLeft: 0, marginTop: 12 },
  textarea: { height: 120, textAlignVertical: 'top' },
  submit: { backgroundColor: '#F4A042', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  submitText: { color: '#fff', fontWeight: '700' },
  infoCard: { backgroundColor: '#fff', padding: 12, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, elevation: 1, marginBottom: 12 },
  infoTitle: { fontWeight: '700', marginBottom: 8 },
  infoText: { color: '#444', marginBottom: 8 },
  bold: { fontWeight: '700', marginTop: 6 },
  whatsappBtn: { marginTop: 10, backgroundColor: '#fff', borderRadius: 8, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e6e6e6' },
  whatsappText: { color: '#3a2b1f', fontWeight: '700' },
  bullet: { paddingVertical: 6 },
  qRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  qText: { fontWeight: '400' },
  chev: { color: '#666', marginLeft: 8 },
  chevOpen: { transform: [{ rotate: '90deg' }] },
  aText: { color: '#666', paddingBottom: 8 },
});
