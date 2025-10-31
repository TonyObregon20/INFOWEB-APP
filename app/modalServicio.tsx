import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/constants/api';
import { clearSelectedService, getSelectedService } from '@/utils/selectedService';

export default function ServiceScreen() {
  const router = useRouter();
  const [service, setService] = useState<any | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const s = getSelectedService();
    setService(s);
    setIndex(0);
  }, []);


  // Form state (hooks must be called unconditionally)
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [localField, setLocalField] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [sending, setSending] = useState(false);

  if (!service) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.loadingText}>No hay datos del servicio seleccionado.</Text>
      </ThemedView>
    );
  }

  const mainImage = service.images?.[index]?.imageId ? `${API_BASE_URL}/api/images/${service.images[index].imageId}` : undefined;

  const handleSubmit = async () => {
    if (!nombre || !email || !fecha) {
      Alert.alert('Faltan campos', 'Completa todos los campos');
      return;
    }

    const payload = {
      servicio: service?.name || 'Servicio',
      servicioId: service?._id,
      nombre,
      email,
      telefono,
      fecha,
      lugar: localField,
      mensaje,
    };

    try {
      setSending(true);
      const res = await fetch(`${API_BASE_URL}/api/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '<no body>');
        throw new Error(`Error ${res.status}: ${text}`);
      }

      Alert.alert('Enviado', 'Tu solicitud ha sido enviada correctamente.');
      clearSelectedService();
      router.back();
    } catch (err) {
      console.error('submit solicitud error:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'No se pudo enviar la solicitud');
    } finally {
      setSending(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {mainImage ? <Image source={{ uri: mainImage }} style={styles.hero} /> : null}

        <View style={styles.formCard}>
            <Text style={styles.panelTitle}>Solicita tu cotización</Text>

            <Text style={styles.label}>Servicio</Text>
            <TextInput style={[styles.input, styles.disabled]} value={service.name} editable={false} />

            <Text style={styles.label}>Nombre*</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Tu nombre" />

            <Text style={styles.label}>Email*</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="tu@correo.com" keyboardType="email-address" />

            <Text style={styles.label}>Teléfono</Text>
            <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} placeholder="999123456" keyboardType="phone-pad" />

            <Text style={styles.label}>Fecha del evento*</Text>
            <TextInput style={styles.input} value={fecha} onChangeText={setFecha} placeholder={Platform.OS === 'web' ? 'dd/mm/aaaa' : 'AAAA-MM-DD'} />

            <Text style={styles.label}>Casa / local (opcional)</Text>
            <TextInput style={styles.input} value={localField} onChangeText={setLocalField} placeholder="Ej: Casa Miraflores" />

            <Text style={styles.label}>Mensaje</Text>
            <TextInput style={[styles.input, styles.textarea]} value={mensaje} onChangeText={setMensaje} multiline numberOfLines={4} />

            <TouchableOpacity style={styles.submit} onPress={handleSubmit} disabled={sending}>
            <Text style={styles.submitText}>{sending ? 'Enviando...' : 'Enviar solicitud'}</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, color: '#666' },
  hero: { width: '100%', height: 260, borderRadius: 12, marginBottom: 12 },
  thumbsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  thumbWrap: { padding: 2 },
  thumb: { width: 60, height: 44, borderRadius: 6, opacity: 0.9 },
  thumbActive: { borderWidth: 2, borderColor: '#FFA500', opacity: 1 },
  /* layout and form styles */
  formCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  panelTitle: { fontWeight: '700', fontSize: 16, marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 6, padding: 8, backgroundColor: '#fff' },
  disabled: { backgroundColor: '#f7f7f7' },
  textarea: { height: 90, textAlignVertical: 'top' },
  submit: { marginTop: 12, backgroundColor: '#FFA500', paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' },
});
