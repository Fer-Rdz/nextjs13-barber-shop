import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PDFReport = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>Reporte de Citas</Text>
          <Text style={styles.heading}>Citas del Mes:</Text>
          {data.map((booking) => (
            <View key={booking.id}>
              <Text style={styles.text}>Fecha: {booking.date}</Text>
              <Text style={styles.text}>Hora: {booking.bookingTime}</Text>
              <Text style={styles.text}>Cliente: {booking.client.name}</Text>
              <Text style={styles.text}>Servicios:</Text>
              <View style={{ marginLeft: 20 }}>
                {booking.services.map((service) => (
                  <Text key={service.id} style={styles.text}>
                    - {service.name}: ${service.price}
                  </Text>
                ))}
              </View>
              <Text style={styles.text}>
                Precio Total: ${booking.totalPrice}
              </Text>
              <Text style={styles.text}>
                Vigencia: {booking.isExpired ? "Expirado" : "Vigente"}
              </Text>
              <Text style={{ marginBottom: 20 }} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFReport;
