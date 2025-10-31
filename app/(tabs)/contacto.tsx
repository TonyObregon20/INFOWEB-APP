// app/(tabs)/contacto.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function ContactoScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 700;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = () => {
    // placeholder: here you would post to your API
    alert('Solicitud enviada (demo)');
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
            <TextInput style={[styles.input, isSmall ? styles.full : styles.half]} placeholder="Tipo de servicio" value={service} onChangeText={setService} />
            <TextInput style={[styles.input, isSmall ? styles.full : styles.half]} placeholder="Fecha del evento" value={date} onChangeText={setDate} />
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
            <TouchableOpacity style={styles.whatsappBtn}>
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
