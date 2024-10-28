# Tutormatch

Tutormatch er en mobilapplikation udviklet til at forbinde studerende med kvalificerede tutorer, der kan støtte dem i deres faglige behov. Applikationen er bygget i React Native og integrerer Firebase til datahåndtering og billedopbevaring, hvilket gør det nemt for tutorer at tilmelde sig, tilføje deres fag og priser, og for studerende at søge efter relevante tutorer.

## Funktionaliteter

- **Tutor Tilmelding**: Tutorer kan tilmelde sig ved at angive deres navn, fag, timepris og uploade et profilbillede direkte fra appen.
- **Søgning efter Tutorer**: Studerende kan søge efter tutorer baseret på eksamensfag og se detaljerede profiler af tutorer.
- **Kamerafunktion**: Applikationen indeholder kamerafunktionalitet, der tillader brugere at tage og uploade billeder.
- **Indstillinger**: En simpel indstillingsskærm, hvor notifikationer og fremtidige funktioner som mørkt tema kan justeres.
- **Firebase Integration**: Firebase Realtime Database og Firebase Storage bruges til at håndtere og opbevare data og billeder sikkert.

## Teknologier Brugt

- **React Native**: Framework til at bygge mobilapplikationen.
- **Firebase Realtime Database**: Bruges til at opbevare tutordata og gøre det muligt for studerende at søge i dem i realtid.
- **Firebase Storage**: Bruges til opbevaring af profilbilleder og billeder taget af tutorer.
- **Expo Camera**: Gør det muligt at tage billeder i appen og uploade dem direkte til Firebase Storage.
- **JavaScript**: Sproget, der er brugt til at udvikle applikationen.

## Installationsvejledning

Følg disse trin for at installere og køre projektet på din lokale maskine:

1. **Klon repositoryet**:
   ```sh
   git clone https://github.com/CCOvergaard/INNO2.git

2. **Naviger til projektmappen:**
   ```sh
   cd INNO2/Inno2


3. **Installer afhængigheder:** Sørg for, at du har Node.js og npm installeret.
   ```sh
   npm install


4. **Kør applikationen:** Kør følgende kommando for at starte projektet, og få en QR-kode op i terminalen:
   ```sh
   npx expo start

Scan QR-koden med Expo Go-appen på din iOS- eller Android-enhed for at se applikationen.

## Krav og Forudsætninger

- **Node.js**: Sørg for, at Node.js er installeret (version 14 eller nyere).
- **npm eller yarn**: Bruges til at installere projektets afhængigheder.
- **Expo Go App**: Installer Expo Go-appen på din telefon for at scanne QR-koden.

## Projektstruktur

- **App.js**: Hovedfilen, hvor applikationen starter.
- **firebase.js**: Indeholder Firebase-konfiguration og opsætning.
- **/screens**: Indeholder de forskellige views såsom `TutorSignUp`, `StudentSearch`, `TutorProfile`, `TutorDetails`, `CameraTest`, og `Settings`.
- **/assets**: Indeholder eventuelle billeder eller ressourcer, som appen bruger.

## Forbedringer i Fremtidige Iterationer

- Implementere dynamisk funktionalitet til "Settings", "TutorDetails" og "TutorProfile" for en mere personlig oplevelse.
- Yderligere sikkerhedsforanstaltninger for Firebase-databasen og -storage.



## Licens

Dette projekt er licenseret under MIT-licensen.
