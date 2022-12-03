#include <ESP8266WiFi.h>


//Put your SSID & Password/
const char* ssid = "iPhone de Armando";  // Enter SSID here
const char* password = "11235813";  //Enter Password here
const char* host = "172.20.10.2";
const int port = 8080;
const int watchdog = 5000;

unsigned int previousMillis = millis();
          
const float sonido = 34300.0;
unsigned long tiempo;
float distancia;
float sinVal;
int toneVal;
bool estado;


#define buzzer 14
#define trig 12
#define echo 13
#define pir 4
#define ledRojo 15
#define ledVerde 5
 
void setup() {
  Serial.begin(9600);
  delay(10);
  Serial.println();
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);
  Serial.print("Espere un momento");

  //Inicializando WiFi
  WiFi.begin(ssid, password);
  
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
    }

  Serial.println(" ");
  Serial.println("Conectado a red WiFi exitosamente");


  Serial.print("Utilice la sigueinte ULR para conectarse: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");

  delay(100);
  pinMode(buzzer, OUTPUT);
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(pir, INPUT);
  pinMode(ledRojo, OUTPUT);
  pinMode(ledVerde, OUTPUT);
  
  Serial.println("Dispositivo Treno Activado\n\n");



}
void loop() {
    digitalWrite(ledRojo, LOW);
    digitalWrite(ledVerde, HIGH);

    digitalWrite(estado, LOW);                 
    digitalWrite(trig, HIGH); //Comienza a lanzar los pulsos ultrasónicos
    delayMicroseconds(10); //Espera 10 us, recomendado
  
    digitalWrite(trig, LOW); // Se detiene
    
    tiempo = pulseIn(echo, HIGH);
    distancia = tiempo/59;
    if(distancia == 0)
      return;

    Serial.print("Distancia: ");
    Serial.print(distancia);
    Serial.print("cm");
    
    if(distancia <= 60)
      estado = digitalRead(pir);
      
    Serial.print("\t\tEstado: ");
    Serial.println(estado);
 

    unsigned int currentMillis = millis();

    if(currentMillis - previousMillis > watchdog){
      previousMillis = currentMillis;
      WiFiClient client;  
    
    if(!client.connect(host, port)){
      Serial.println("Fallo al conectar ");
      return;
    }

      String url = "/arduino/signal/";
      url += "pargo69";
      
     
      unsigned long timeout = millis();
      
      if(estado == HIGH){   
         client.print(String("GET ") + url + " HTTP/1.1\r\n" + 
              "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
         digitalWrite(ledRojo, HIGH);
         digitalWrite(ledVerde, LOW);
         while(estado == HIGH){
            for( int x = 0; x < 180; x++){ //Función senoidal de 0 a pi
              sinVal = (sin(x* (3.1412/180))); //Cálculo de la función en radianes
              toneVal = 2000 + (int(sinVal*1000)); // Obtener frecuencias de 2000Hz a 3000Hz
              tone(buzzer, toneVal); // Emitir sonido al buzzer en la frecuencia indicada
              delay(2);
            }
            estado = digitalRead(pir);
         }
         digitalWrite(buzzer, LOW);
         digitalWrite(ledRojo, LOW);
         digitalWrite(ledVerde, HIGH);
      } 
      
      while(client.available() == 0){
        if(millis() - timeout > 5000){
          Serial.print(">>> Client Timeout !") ; 
          client.stop();
          return;
        }
      }
      

      while(client.available()){
        String line = client.readStringUntil('\r');
        Serial.print(line);  
      }

      
    }
  
}
