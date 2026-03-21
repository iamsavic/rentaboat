# PRD — Rent-a-Boat (Budva Speedboat Tours)

**Verzija:** 2.0 — Revidirana  
**Datum:** Mart 2026  
**Status:** Finalna verzija za razvoj

---

## 1. Osnovne informacije

| Polje | Vrednost |
|---|---|
| Naziv proizvoda | Rent-a-Boat |
| Tip proizvoda | Web platforma za rezervaciju speedboat tura |
| Primarni cilj | Omogućiti turistima i lokalcima da brzo i jednostavno rezervišu speedboat turu u Budvi |
| Platforma | Responsive website, mobile-first |
| Jezici (MVP) | Srpski + Engleski |
| URL struktura | `/sr/` i `/en/` subdirectory |
| Lokacija | Budva Marina, Crna Gora |

---

## 2. Executive Summary

Rent-a-Boat je web sajt namenjen turistima i lokalnim korisnicima koji žele da rezervišu speedboat turu u Budvi. Proizvod nudi 4 fiksna paketa tura sa unapred poznatim cenama, sa skiperom, gorivom i vodom dobrodošlice uvek uključenim u cenu.

Platforma eliminiše potrebu za ručnom komunikacijom tako što korisniku pruža:
- jasan prikaz sva 4 paketa tura sa cenama i destinacijama
- kalendar dostupnosti sa slobodnim vremenima polaska
- jednostavan 4-koračni booking flow optimizovan za mobilni uređaj
- trenutnu potvrdu zahteva i admin notifikaciju

Plaćanje se vrši keš na licu mesta na Budva Marini. Za ture duže od 4 sata sistem automatski informiše korisnika o obaveznom depozitu.

Platforma je arhitekturno dizajnirana za skaliranje: pored sopstvenog speedboata, sistem podržava dodavanje jahti i brodova od partnerskih vlasnika (marketplace model u budućoj fazi).

---

## 3. Problem Statement

Turisti koji žele speedboat turu u Budvi trenutno nailaze na sledeće probleme:

- Ne znaju koje ture postoje i šta svaka uključuje
- Ne vide dostupnost za željeni datum bez slanja poruke ili poziva
- Nisu sigurni šta cena uključuje (gorivo? skipper?)
- Booking proces zahteva ručnu komunikaciju i čekanje na odgovor
- Mobilno iskustvo na postojećim sajovima je loše

Rent-a-Boat rešava ove probleme kroz transparentnu ponudu fiksnih paketa i brz mobile-first booking flow.

---

## 4. Product Vision

Biti prvi digitalni izbor za rezervaciju speedboat ture u Budvi — sajt koji turistu u roku od 2 minuta vodi od prve posete do potvrđene rezervacije, bez poruka i čekanja.

---

## 5. Poslovni model

### Trenutna ponuda (MVP)

- **Plovilo:** Speedboat, max 7 osoba
- **Uvek uključeno:** Skipper, gorivo, voda dobrodošlice, zaustavljanja za plivanje
- **Cena:** €80/sat (osim Blue Cave ture koja ima fiksnu cenu)
- **Plaćanje:** Isključivo keš na licu mesta, Budva Marina
- **Depozit:** Obavezan za ture duže od 4 sata; iznos definiše admin; plaćanje keš

### Paketi tura

| Naziv | Trajanje | Cena | Uključene destinacije |
|---|---|---|---|
| Panoramska tura | 1h | €80 | Stari grad Budva, Plava laguna, Kalijpso pećina, Ostrvo Sv. Nikole |
| Sveti Stefan tura | 2h | €160 | Sve od 1h + Sveti Stefan |
| Petrovac tura | 3h | €240 | Sve od 2h + Petrovac |
| Blue Cave tura | ~3h | €300 (fiksna) | Blue Cave + panorama |

### Buduća skalabilnost

Platforma podržava dodavanje jahti i brodova od partnerskih vlasnika (klijent kao posrednik). Arhitektura baze podataka je dizajnirana za ovaj model od prvog dana.

---

## 6. Ciljna grupa i persone

### Persona 1 — Turist par / porodica

**Profil:** Na odmoru u Budvi, želi nezaboravan doživljaj na vodi  
**Cilj:** Brzo naći i rezervisati turu sa telefona  
**Frustracije:** Nejasne informacije, loš mobilni sajt, ne zna šta je uključeno u cenu  
**Bitno:** Jasne fotografije destinacija, transparentna cena, jednostavna rezervacija

### Persona 2 — Spontani turist

**Profil:** Slobodan dan, želi aktivnost za danas ili sutra  
**Cilj:** Odmah videti šta je slobodno i rezervisati bez čekanja  
**Frustracije:** Mora da piše poruku i čeka odgovor  
**Bitno:** Real-time dostupnost, brzo slanje zahteva, WhatsApp kao backup

### Persona 3 — Organizator grupe

**Profil:** Organizuje izlet za grupu prijatelja (do 7 osoba)  
**Cilj:** Rezervisati konkretnu turu za konkretan datum  
**Frustracije:** Nejasno da li ima mesta, nejasno šta je uključeno  
**Bitno:** Kapacitet, datum, ukupna cena za grupu

---

## 7. Scope proizvoda

### In scope za MVP

- Homepage
- Stranica "Naše ture" (lista 4 paketa)
- Detaljna stranica ture
- Booking flow (4 koraka)
- Potvrda rezervacije (confirmation page)
- Email potvrde (korisnik + admin)
- Stranica "Destinacije"
- FAQ
- Kontakt stranica sa WhatsApp
- O nama
- Pravne stranice (Uslovi korišćenja, Politika privatnosti, Politika kolačića)
- Admin panel
- Višejezičnost SR + EN

### Out of scope za MVP

- Online plaćanje (keš na licu mesta)
- Korisnički nalozi i istorija rezervacija
- Recenzije sa moderacijom
- Marketplace model sa partnerskim vlasnicima (arhitekturno podržano, UI u sledećoj fazi)
- Loyalty program
- Live chat
- Mobilna aplikacija
- Dinamičke cene

---

## 8. Informaciona arhitektura

### Navigacija

```
Header (desktop)
├── Naše ture / Our Tours
├── Destinacije / Destinations
├── FAQ
├── O nama / About
├── Kontakt / Contact
├── [SR / EN] — language switcher
└── [Rezerviši / Book Now] — primarni CTA

Footer
├── O nama
├── Kontakt
├── FAQ
├── Uslovi korišćenja
├── Politika privatnosti
├── Politika kolačića
├── Društvene mreže
└── Adresa marine + radno vreme + WhatsApp
```

### URL struktura

```
/sr/                          — Homepage (srpski)
/en/                          — Homepage (engleski)
/sr/ture                      — Lista tura
/en/tours
/sr/ture/panoramska-tura      — Detaljna stranica ture
/en/tours/panoramic-tour
/sr/rezervacija               — Booking flow
/en/booking
/sr/potvrda                   — Confirmation page
/en/confirmation
/sr/destinacije               — Stranica destinacija
/en/destinations
/sr/faq
/en/faq
/sr/o-nama
/en/about
/sr/kontakt
/en/contact
/sr/uslovi-koriscenja
/en/terms
/sr/politika-privatnosti
/en/privacy-policy
/sr/politika-otkazivanja
/en/cancellation-policy
```

---

## 9. Ključne stranice

### 9.1 Homepage

**Svrha:** Odmah preneti vrednost ponude i usmeriti korisnika ka rezervaciji.

**Sekcije:**

1. **Hero sekcija**
   - Naslov: jasan benefit (npr. "Istraži Budvu s mora")
   - Podnaslov: kratko objašnjenje (npr. "4 speedboat ture. Skipper i gorivo uključeni. Rezerviši za 2 minuta.")
   - CTA primarno: "Pogledaj ture" / "View Tours"
   - CTA sekundarno: "Rezerviši odmah" / "Book Now"
   - Pozadinska fotografija ili video speedboata na moru

2. **Pregled tura**
   - Grid sa 4 karte tura
   - Svaka karta: naziv, trajanje, cena, 2-3 destinacije, dugme "Rezerviši"

3. **Šta je uključeno**
   - Ikone + tekst: Skipper ✓ Gorivo ✓ Voda dobrodošlice ✓ Zaustavljanja za plivanje ✓

4. **Kako funkcioniše**
   - 3 koraka: Izaberi turu → Pošalji rezervaciju → Dođi na marinu

5. **Destinacije (preview)**
   - Fotografije i nazivi mesta koja se posećuju

6. **Recenzije / Trust sekcija**
   - 3–4 statičke recenzije sa imenom, državom i tekstom
   - Opcija: Google Reviews embed

7. **FAQ preview**
   - 4–5 najčešćih pitanja, link na punu FAQ stranicu

8. **Final CTA**
   - "Rezerviši svoju turu danas" + dugme

**UAC:**
- Korisnik razume ponudu u prvih 5 sekundi
- CTA dugmad moraju biti vidljiva bez skrolovanja na mobilnom (above the fold)
- Language switcher mora biti dostupan na svakoj stranici

---

### 9.2 Stranica "Naše ture"

**Svrha:** Prikazati sva 4 paketa i omogućiti brz prelaz na detalje ili booking.

**Šta korisnik vidi:**
- Grid sa 4 karte tura (2x2 na desktopu, 1 kolona na mobilnom)
- Opcioni filter: Datum + Broj osoba (proverava dostupnost pre prikaza)

**Karta ture sadrži:**
- Cover fotografija ture
- Naziv ture
- Trajanje i cena (istaknuto)
- Lista uključenih destinacija
- "Uvek uključeno" badge (skipper, gorivo, voda)
- Dugme "Pogledaj detalje" i dugme "Rezerviši"

**UAC:**
- Svaka karta vodi na detaljnu stranicu ture
- Korisnik može pokrenuti booking direktno sa karte
- Na mobilnom karte su pune širine ekrana sa jasnim CTA

---

### 9.3 Detaljna stranica ture

**Svrha:** Dati korisniku sve informacije za odluku i omogućiti pokretanje rezervacije.

**Sekcije:**

1. **Galerija fotografija** — slideshow sa fotografijama speedboata i destinacija

2. **Osnovne informacije**
   - Naziv i kratak opis ture
   - Trajanje
   - Cena (istaknuto)
   - Max. kapacitet (7 osoba)
   - Polazna tačka: Budva Marina
   - Uvek uključeno: Skipper, gorivo, voda dobrodošlice, zaustavljanja za plivanje

3. **Mapa rute / Destinacije**
   - Lista destinacija sa kratkim opisima i fotografijama
   - Opcija: statična mapa rute

4. **Kalendar dostupnosti**
   - Datum picker
   - Prikaz slobodnih vremena polaska za izabrani datum
   - Zauzeti termini su blokirani

5. **CTA box** (sticky na mobilnom)
   - Izabrani datum i vreme
   - Broj osoba (1–7)
   - Ukupna cena (automatski izračunato)
   - Napomena: "Plaćanje keš na Budva Marini"
   - Dugme "Rezerviši"
   - Link na politiku otkazivanja

**UAC:**
- CTA box mora biti vidljiv bez previše skrolovanja
- Kalendar mora biti touch-friendly (native mobile date picker)
- Dugme "Rezerviši" postaje aktivno samo kada su datum, vreme i broj osoba izabrani
- Cena se ažurira u realnom vremenu

---

### 9.4 Booking flow

**Svrha:** Pretvoriti interesovanje u potvrđeni zahtev za rezervaciju sa minimalnim koracima.

#### Korak 1 — Izbor termina

**Šta korisnik vidi:**
- Naziv ture i cena (sažetak)
- Progress indikator (1/4)
- Datum picker (touch-friendly)
- Lista slobodnih vremena polaska za izabrani datum
- Broj osoba (stepper 1–7)
- Ukupna cena u realnom vremenu
- Ako tura zahteva depozit: jasno obaveštenje

**Validacije:**
- Datum mora biti dostupan
- Broj osoba ne sme preći 7
- Vreme polaska mora biti slobodno (sistem proverava preklapanje sa trajanjem ture + buffer)

**UAC:**
- Cena se ažurira odmah pri promeni broja osoba (ukupno ostaje ista jer je cena po turi, ne po osobi — ali ukupna cena mora biti jasna)
- Soft-lock: termin se privremeno blokira (15 min) čim korisnik nastavi na sledeći korak

---

#### Korak 2 — Podaci korisnika

**Šta korisnik vidi:**
- Forma za unos podataka
- Sažetak rezervacije (tura, datum, vreme, osobe, cena) — sticky ili iznad forme

**Polja:**
- Ime (obavezno)
- Prezime (obavezno)
- Email (obavezno)
- Telefon u međunarodnom formatu (obavezno)
- Država (obavezno)
- Posebne napomene (opciono)
- Checkbox: Prihvatam uslove korišćenja (obavezno)
- Checkbox: Saglasan/na sam sa politikom privatnosti (obavezno)
- Checkbox: Želim da primam promotivne ponude (opciono)

**Validacije:**
- Sva obavezna polja moraju biti popunjena
- Email mora biti ispravnog formata
- Telefon mora podržati međunarodni format (+382, +381, +44 itd.)

**UAC:**
- Korisnik ne može nastaviti bez svih obaveznih polja
- Greške prikazane direktno ispod polja, ne samo na vrhu forme
- Na mobilnom: keyboard se automatski prilagođava tipu polja (email, tel)

---

#### Korak 3 — Pregled rezervacije

**Šta korisnik vidi:**
- Naziv ture
- Datum i vreme polaska
- Trajanje
- Broj osoba
- Ukupna cena
- Način plaćanja: "Keš na Budva Marini pri dolasku"
- Ako važi: "Ova tura zahteva depozit od €[iznos] koji se plaća keš pri dolasku"
- Napomena o depozitu ako tura zahteva (> 4h)
- Dugme "Pošalji rezervaciju" / "Send Booking Request"
- Dugme "Izmeni" / "Edit"

**UAC:**
- Korisnik može da se vrati i izmeni podatke
- Cena mora biti transparentno prikazana
- Dugme za potvrdu mora biti jasno i istaknuto

---

#### Korak 4 — Confirmation page

**Šta korisnik vidi:**
- Poruka: "Zahtev za rezervaciju je primljen!" / "Booking request received!"
- Broj rezervacije
- Napomena: Admin će potvrditi rezervaciju i poslati email potvrdu
- Sažetak rezervacije

**Pre-arrival info:**
- Adresa marine sa Google Maps linkom
- "Molimo vas da budete na lokaciji 10 minuta pre polaska"
- "Šta poneti: lična karta ili pasoš, novac za plaćanje, kupaći kostim, peškir, sunscreen"
- Kontakt za hitne slučajeve (telefon + WhatsApp)

**CTA:**
- "Vrati se na početnu" / "Back to Home"
- "Pogledaj ostale ture" / "View Other Tours"
- "Kontaktirajte nas" / "Contact Us"

**UAC:**
- Confirmation page mora biti dostupna odmah po uspešnom submitovanju
- Broj rezervacije mora biti jedinstven
- Email potvrda mora biti poslata korisniku automatski
- Admin notifikacija mora biti poslata odmah

---

### 9.5 Stranica "Destinacije"

**Svrha:** Inspirisati korisnika kroz opise mesta koja se posećuju i direktno vezati destinacije za konkretne ture.

**Sadržaj po destinaciji:**
- Naziv i fotografija
- Kratki opis (2–3 rečenice)
- Zanimljivost ili preporuka
- "Ova destinacija je uključena u:" + link na odgovarajuću turu

**Destinacije (MVP):**
- Plava laguna (Plava Laguna)
- Kalijpso pećina (Calypso Cave)
- Ostrvo Sv. Nikole (St. Nicholas Island)
- Sveti Stefan
- Petrovac
- Blue Cave

**UAC:**
- Čitljivo na mobilnom
- Svaka destinacija ima vezu ka relevantnoj turi

---

### 9.6 FAQ

**Tematske celine:**

*O turama:*
- Koje ture nudite?
- Šta je uključeno u cenu?
- Da li je gorivo uključeno?
- Koliko osoba može biti na čamcu?
- Da li je skipper obavezan?

*Rezervacija i plaćanje:*
- Kako da rezervišem?
- Kada dobijam potvrdu?
- Kako se plaća?
- Da li je potreban depozit?

*Na dan ture:*
- Gde je polazna tačka?
- Kada da dođem?
- Šta da ponesem?
- Da li mogu da donesem hranu i piće?
- Da li mogu da vodim decu?

*Vremenski uslovi:*
- Šta se dešava ako su vremenski uslovi loši na dan ture?

**UAC:**
- FAQ grupisan po tematskim celinama sa accordion prikazom
- Najvažnija pitanja prikazana i na Homepage-u (preview)
- Pretraga ili filter po kategoriji (opciono za MVP)

---

### 9.7 Kontakt stranica

**Šta korisnik vidi:**
- Telefon (klikabilan na mobilnom)
- Email
- WhatsApp (klikabilan link)
- Adresa marine + radno vreme
- Ugrađena Google mapa
- Kontakt forma

**Kontakt forma:**
- Ime (obavezno)
- Email (obavezno)
- Telefon (opciono)
- Tema (dropdown: Pitanje o turi / Rezervacija / Otkazivanje / Ostalo)
- Poruka (obavezno)

**UAC:**
- Forma potvrđuje uspešno slanje
- Kontakt informacije dostupne bez slanja forme
- WhatsApp link otvara chat direktno na mobilnom

---

### 9.8 O nama

**Sadržaj:**
- Ko smo i koliko dugo smo u poslu
- Naša misija i pristup
- Fokus na bezbednost
- Zašto korisnici biraju nas (USP: iskusan skipper, moderna plovila, transparentne cene)
- Fotografije tima, speedboata, marine

---

### 9.9 Pravne stranice

**Obavezne stranice:**
- Uslovi korišćenja
- Politika privatnosti
- Politika kolačića (sa cookie consent bannerom)

**Napomena:** Politika otkazivanja ne postoji. Rezervacije su finalne. Jedini uslov plaćanja unapred je depozit za ture duže od 4 sata, koji se plaća keš na licu mesta.

**UAC:**
- Dostupne iz footera i tokom booking-a (linkovi na Koraku 2 i 3)

---

## 10. WhatsApp integracija

WhatsApp je obavezan kontakt kanal za ovaj tržišni segment.

**Implementacija:**
- WhatsApp broj vidljiv u headeru na mobilnom
- WhatsApp broj u footeru (desktop + mobilni)
- Floating WhatsApp dugme na svim stranicama (fiksna pozicija, donji desni ugao)
- Na detaljnoj stranici ture: "Imate pitanje? Pišite nam na WhatsApp"
- Na confirmation page-u: WhatsApp kontakt za dan ture

**Tehničko:** `https://wa.me/[broj]?text=[predefined_message]` sa predefinisanom porukom po kontekstu

---

## 11. Višejezičnost (i18n)

### Zahtevi

- Srpski (SR) i Engleski (EN) su oba obavezna za MVP
- Language switcher u headeru (SR | EN)
- Podrazumevani jezik: EN (primarni korisnici su strani turisti)
- Jezik sesije se pamti (localStorage ili cookie)
- Email potvrde se šalju na jeziku koji je korisnik koristio

### Arhitektura

- Sav UI tekst u key-value fajlovima (npr. `sr.json`, `en.json`) — nikakav hardcoded tekst
- Sadržaj tura, destinacija, FAQ se čuva u bazi po jeziku (`naziv_sr`, `naziv_en`, `opis_sr`, `opis_en`)
- URL struktura: `/sr/` i `/en/` subdirectory
- Admin panel: samo srpski jezik

### Prioritet prevoda

| Stranica | SR | EN |
|---|---|---|
| Homepage | ✓ | ✓ |
| Ture (lista i detalj) | ✓ | ✓ |
| Booking flow | ✓ | ✓ |
| Destinacije | ✓ | ✓ |
| FAQ | ✓ | ✓ |
| Kontakt | ✓ | ✓ |
| O nama | ✓ | ✓ |
| Pravne stranice | ✓ | ✓ |
| Admin panel | ✓ | — |

---

## 12. Mobile-first dizajn

Većina korisnika rezerviše ture sa mobilnog telefona. Mobilni UX je primarni dizajnski prioritet.

### Obavezni zahtevi

- Booking flow optimizovan za jednu ruku
- Touch-native date/time picker (ne desktop kalendar)
- CTA dugmad minimalno 48×48px
- Floating WhatsApp dugme ne sme prekrivati sadržaj
- Header na mobilnom: hamburger meni + language switcher + CTA dugme
- Sticky CTA box na detaljnoj stranici ture
- Form polja sa odgovarajućim keyboard tipom (email, tel, text)
- Slike optimizovane za mobilni (WebP format, lazy loading)

### Breakpoints

- Mobile: < 768px (primarni)
- Tablet: 768px – 1024px
- Desktop: > 1024px

### Testiranje

Minimum testirati na: iOS Safari (iPhone), Android Chrome (Samsung/Pixel)

---

## 13. Admin panel

Admin mora moći da upravlja svim aspektima poslovanja bez tehničke podrške.

### Upravljanje turama

- Pregled svih tura
- Izmena naziva, opisa, cene, trajanja
- Upload i uređivanje fotografija
- Aktivacija / deaktivacija ture
- Podešavanje iznosa depozita po turi

### Upravljanje dostupnošću

- Pregled kalendara po plovilu po danu
- Blokiranje datuma ili vremenskih intervala (ručno)
- Podešavanje buffer vremena između tura (npr. 30 min)
- Podešavanje radnog vremena (od kada do kada se mogu zakazivati ture)

### Upravljanje rezervacijama

- Lista svih rezervacija sa filterima (po datumu, statusu, imenu, emailu, ID-u)
- Detalji svake rezervacije
- Promena statusa rezervacije
- Ručna potvrda ili otkazivanje rezervacije
- Kada admin otkaže rezervaciju (status → Cancelled), termin se automatski oslobađa i postaje dostupan na kalendaru za nove rezervacije
- Unos napomena admina

### Statusi rezervacije

| Status | Opis |
|---|---|
| New | Zahtev stigao, admin nije pregledao |
| Pending | Admin pregleda, čeka potvrdu |
| Confirmed | Potvrđena, korisnik obavešten |
| Cancelled | Otkazana (korisnik ili admin) — termin se automatski oslobađa na kalendaru |
| Completed | Tura je realizovana |
| No-show | Korisnik nije došao |

### Detalji rezervacije u admin panelu

- ID rezervacije i booking reference
- Tura, datum, vreme polaska, trajanje
- Broj osoba
- Ukupna cena
- Da li važi depozit i da li je plaćen
- Korisnički podaci (ime, prezime, email, telefon, država)
- Napomene korisnika
- Status
- Datum i vreme kreiranja
- Admin napomene

**UAC:**
- Admin može pronaći rezervaciju po imenu, emailu, datumu ili booking reference
- Promene statusa su trenutne i bezbedne (bez dupliranja)
- Admin panel je dostupan samo sa autentifikacijom (role-based access)

---

## 14. Notifikacije

### Provideri

**Brevo (bivši Sendinblue) — email provider za MVP**
- Besplatan tier: 300 emailova/dan, 9.000/mesec — dovoljan za celu sezonu
- Verifikovani custom domen obavezan za dobru isporučivost
- Podrška za HTML šablone i transakcione emailove putem API-ja ili SMTP-a
- Bez kreditne kartice za registraciju

**Telegram bot — instant admin notifikacija**
- Besplatan, bez ograničenja broja poruka
- Setup: kreiranje bota via @BotFather (5 minuta), dobijanje bot tokena
- Integracija: direktan API poziv iz backend-a ili Zapier webhook → Telegram
- Preduslov: admin ima Telegram nalog
- Poruka stiže trenutno na admin telefon, bez čekanja na email

---

### Email korisniku — potvrda zahteva

**Trigger:** Odmah po uspešnom submitovanju forme (korak 3)  
**Provider:** Brevo  
**Jezik:** Jezik koji je korisnik koristio na sajtu

**Sadržaj:**
- Poruka da je zahtev primljen
- Booking reference broj
- Sažetak: tura, datum, vreme, broj osoba, cena
- Napomena o plaćanju keš na marini
- Ako važi: informacija o depozitu
- Pre-arrival informacije: adresa, šta poneti, vreme dolaska
- Kontakt: telefon + WhatsApp

---

### Email adminu — nova rezervacija

**Trigger:** Odmah po uspešnom database insertu, bez čekanja na admin potvrdu  
**Provider:** Brevo  
**Fallback:** Ako slanje emaila ne uspe, rezervacija ostaje u bazi — admin vidi je u panelu

**Sadržaj:**
- Naslov: `Nova rezervacija #[reference] — [ime prezime]`
- Tura, datum, vreme, trajanje, broj osoba
- Ukupna cena, depozit status
- Korisnički podaci: ime, prezime, email, telefon, država
- Napomene korisnika
- Direktan link: `[admin_url]/reservations/[id]`
- Status: "Zahteva potvrdu"

---

### Telegram poruka adminu — instant notifikacija

**Trigger:** Isti kao admin email — odmah po uspešnom database insertu  
**Provider:** Telegram Bot API (besplatno)  
**Fallback:** Ako Telegram ne uspe, email je već poslat — rezervacija nije izgubljena

**Sadržaj poruke (kratka, za brz pregled na telefonu):**
```
🚤 Nova rezervacija #RB-001
Tura: Panoramska (1h) — €80
Datum: 15.07.2026 u 10:00h
Osobe: 4 | Ime: Marko Petrović
Tel: +381641234567
→ [link na admin panel]
```

---

### Email korisniku — potvrda od admina (opciono za MVP)

- Šalje se kada admin ručno promeni status u "Confirmed"
- Potvrda datuma i vremena, finalne instrukcije

---

## 15. Funkcionalni zahtevi

| ID | Zahtev |
|---|---|
| FR-01 | Sistem mora prikazivati 4 fiksna paketa tura sa cenama i opisima |
| FR-02 | Sistem mora prikazivati dostupne termine polaska za izabrani datum i plovilo |
| FR-03 | Sistem mora sprečiti rezervaciju zauzetog termina (provjera preklapanja + trajanje + buffer) |
| FR-04 | Sistem mora automatski izračunati ukupnu cenu za izabranu turu |
| FR-05 | Sistem mora informisati korisnika o depozitu za ture duže od 4 sata |
| FR-06 | Sistem mora prikupiti i validirati obavezne korisničke podatke |
| FR-07 | Sistem mora evidentirati saglasnost korisnika sa uslovima i privatnošću |
| FR-08 | Sistem mora generisati jedinstven booking reference broj |
| FR-09 | Sistem mora poslati email potvrdu korisniku odmah po submitovanju (Brevo) |
| FR-10 | Sistem mora poslati email notifikaciju adminu odmah po submitovanju (Brevo) |
| FR-10b | Sistem mora poslati Telegram poruku adminu odmah po submitovanju (Telegram Bot API) |
| FR-11 | Sistem mora prikazati confirmation page odmah po uspešnom submitovanju |
| FR-12 | Sistem mora soft-lockovati izabrani termin na 15 minuta tokom booking-a |
| FR-13 | Admin mora moći da blokira datume i termina ručno |
| FR-14 | Admin mora moći da menja status rezervacije |
| FR-15 | Sistem mora podržavati srpski i engleski jezik na svim javnim stranicama |
| FR-16 | Language switcher mora biti dostupan na svakoj stranici |
| FR-17 | Emailovi moraju biti poslati na jeziku koji je korisnik koristio |

---

## 16. Nefunkcionalni zahtevi

### Performanse

- Stranice se učitavaju za < 3 sekunde na mobilnom 4G
- Provjera dostupnosti < 1 sekunda
- Slike optimizovane (WebP, lazy loading, responsive srcset)

### Responsive / Mobile-first

- Primarni dizajn za mobilni (< 768px)
- Potpuna podrška za tablet i desktop
- Touch-native komponente (date picker, stepper, accordion)
- Booking flow optimizovan za jednu ruku

### Bezbednost

- HTTPS obavezan
- Sigurno čuvanje korisničkih podataka
- CSRF zaštita na svim formama
- Zaštita od spam submitova (honeypot ili CAPTCHA na booking formi)
- Role-based pristup admin panelu
- GDPR / lokalna regulativa: cookie consent, pravo na brisanje podataka

### SEO

- SEO-friendly URL struktura (`/en/tours/panoramic-tour`)
- Meta title i description po stranici, po jeziku
- Hreflang tagovi za SR/EN verzije
- Schema markup: LocalBusiness, TouristAttraction, Product
- Open Graph tagovi za deljenje na društvenim mrežama
- Sitemap i robots.txt

### Accessibility

- Dovoljni kontrasti (WCAG AA minimum)
- Jasne labele svih form polja
- Alt tekst za sve slike
- Tastaturna navigacija
- Focus indikatori vidljivi

---

## 17. Edge case scenariji

1. **Korisnik bira zauzet termin**
   Sistem blokira izbor i prikazuje poruku. Prikazuje alternative: slobodna vremena na isti dan ili slobodne datume u narednih 7 dana.

2. **Korisnik unosi više od 7 osoba**
   Sistem prikazuje grešku ispod polja i onemogućava nastavak: "Maksimalan kapacitet je 7 osoba."

3. **Soft-lock ističe (15 min)**
   Sistem oslobađa termin i prikazuje korisniku obaveštenje: "Vaša rezervacija termina je istekla. Molimo izaberite termin ponovo."

4. **Dupla rezervacija (race condition)**
   Sistem koristi database-level locking pri kreiranju rezervacije. Ako drugi korisnik potvrdi isti termin u istom trenutku, drugi dobija grešku i ponudu alternativnih termina.

5. **Email slanje ne uspe**
   Rezervacija se čuva u bazi. Admin vidi rezervaciju u panelu sa statusom "New". Opcija ručnog slanja emaila iz admin panela.

6. **Admin blokira datum koji ima postojeću rezervaciju**
   Sistem upozorava admina na konflikt i traži eksplicitnu potvrdu pre blokiranja.

7. **Loši vremenski uslovi**
   Admin označava dan kao "zatvoreno zbog vremenskih uslova". Korisnici sa rezervacijama dobijaju email sa obaveštenjem i opcijama (prekazivanje, otkazivanje).

8. **Korisnik pokušava da rezerviše isti dan za danas**
   Sistem proverava radno vreme i minimum lead time (npr. minimum 1 sat pre polaska). Prikazuje samo termine koji su još dostupni za danas.

---

## 18. Analytics i KPI

### Ključne metrike

- Broj poseta sajtu (ukupno, po jeziku, po uređaju)
- Booking conversion rate (posete / submitovani zahtevi)
- Drop-off po koraku booking flow-a
- Najpopularnije ture
- Prosečna vrednost rezervacije
- Broj kontakt upita (forma + WhatsApp)
- Bounce rate po stranici

### Event tracking

| Event | Trigger |
|---|---|
| `tour_viewed` | Korisnik otvori detaljnu stranicu ture |
| `booking_started` | Korisnik klikne "Rezerviši" |
| `booking_step_2` | Korisnik pređe na Korak 2 |
| `booking_step_3` | Korisnik pređe na Korak 3 |
| `booking_submitted` | Korisnik submittuje rezervaciju |
| `booking_abandoned` | Korisnik napusti booking flow bez submita |
| `whatsapp_clicked` | Korisnik klikne WhatsApp dugme |
| `language_switched` | Korisnik promeni jezik |
| `contact_form_submitted` | Korisnik submittuje kontakt formu |

---

## 19. Entiteti baze podataka

### Dijagram veza

```
Location (1) ──── (many) Vessel (1) ──── (many) Tour (1) ──── (many) Booking
                      │
                   owner_id → Owner
```

### Location

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| naziv | string | Naziv marine |
| adresa | string | Fizička adresa |
| google_maps_url | string | Link za Google Maps |
| whatsapp_broj | string | WhatsApp broj |
| kontakt_telefon | string | Telefon |
| radno_vreme | JSON | Radno vreme po danima |

### Owner

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| naziv | string | Naziv vlasnika / firme |
| kontakt_email | string | Email |
| kontakt_telefon | string | Telefon |
| procenat_provizije | decimal | Provizija u % (za partner ownere) |
| aktivan | boolean | Da li je aktivan |

### Vessel

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| naziv | string | Naziv plovila |
| slug | string | URL-friendly naziv |
| vessel_type | enum | speedboat / yacht / boat |
| kapacitet | integer | Max. broj osoba |
| opis | text | Opis plovila |
| cover_image | string | URL naslovne fotografije |
| gallery | JSON array | URL-ovi fotografija |
| location_id | UUID | FK → Location |
| owner_id | UUID | FK → Owner |
| owner_type | enum | own / partner |
| aktivan | boolean | Da li je aktivan |

### Tour

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| naziv_sr | string | Naziv na srpskom |
| naziv_en | string | Naziv na engleskom |
| slug_sr | string | URL slug na srpskom |
| slug_en | string | URL slug na engleskom |
| vessel_id | UUID | FK → Vessel |
| trajanje_sati | decimal | Trajanje u satima |
| cena_eur | decimal | Cena u EUR |
| fixed_price | boolean | True ako je fiksna cena (Blue Cave) |
| zahteva_depozit | boolean | Auto true ako trajanje > 4h |
| iznos_depozita | decimal | Iznos depozita u EUR |
| opis_sr | text | Opis na srpskom |
| opis_en | text | Opis na engleskom |
| ukljucene_destinacije_sr | JSON | Lista destinacija (srpski) |
| ukljucene_destinacije_en | JSON | Lista destinacija (engleski) |
| cover_image | string | URL naslovne fotografije |
| gallery | JSON array | URL-ovi fotografija |
| aktivan | boolean | Da li je aktivna tura |

### Booking

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| booking_reference | string | Jedinstven kod (npr. RB-2026-0001) |
| tour_id | UUID | FK → Tour |
| vessel_id | UUID | FK → Vessel |
| first_name | string | Ime |
| last_name | string | Prezime |
| email | string | Email |
| phone | string | Telefon (međunarodni format) |
| country | string | Država |
| date | date | Datum ture |
| start_time | time | Vreme polaska |
| persons | integer | Broj osoba |
| total_price | decimal | Ukupna cena u EUR |
| requires_deposit | boolean | Da li se zahteva depozit |
| deposit_amount | decimal | Iznos depozita (ako važi) |
| deposit_paid | boolean | Da li je depozit plaćen |
| language | enum | sr / en (jezik korisnika) |
| booking_status | enum | new / pending / confirmed / cancelled / completed / no-show |
| notes | text | Napomene korisnika |
| admin_notes | text | Interne napomene admina |
| lock_expires_at | timestamp | Vreme isteka soft-locka |
| created_at | timestamp | Datum i vreme kreiranja |

### Availability (admin blokovi)

| Polje | Tip | Opis |
|---|---|---|
| id | UUID | Primary key |
| vessel_id | UUID | FK → Vessel |
| date | date | Datum blokade |
| blocked_from | time | Početak blokade (null = ceo dan) |
| blocked_to | time | Kraj blokade (null = ceo dan) |
| reason | string | Razlog blokade (interna napomena) |

---

## 20. Zavisnosti i pretpostavke

### Zavisnosti

- **Brevo** — email provider za transakcione emailove (besplatan tier, verifikovani domen obavezan)
- **Telegram Bot API** — instant admin notifikacija (besplatno, bot token obavezan, admin treba Telegram nalog)
- Hosting i baza podataka
- Google Maps embed za kontakt stranicu i detaljne stranice tura
- WhatsApp Business broj
- Admin panel (custom ili lightweight CMS)
- SSL sertifikat

### Pretpostavke

- Sadržaj (fotografije, opisi tura, destinacije, FAQ) obezbeđuje klijent pre razvoja
- Politika otkazivanja ne postoji — rezervacije su finalne, bez refundacije
- WhatsApp Business nalog je kreiran
- Google Business profil postoji ili će biti kreiran za Google Reviews

---

## 21. Rizici

| Rizik | Uticaj | Mitigacija |
|---|---|---|
| Nedostatak kvalitetnih fotografija | Visok — direktno utiče na konverziju | Profesionalno fotografisanje pre launcha |
| Loš mobilni UX na booking flow-u | Visok — većina korisnika je mobilna | Mobile-first prioritet, testiranje na iOS/Android |
| Netačna dostupnost (dupla rezervacija) | Visok — loše iskustvo i operativni problem | Soft-lock + database-level locking |
| Nepreveden ili loš engleski tekst | Srednji — gubi se turistički promet | Native ili profesionalni prevod, ne automatski |
| Admin ne odgovori brzo na zahtev | Srednji — korisnik čeka | Jasna komunikacija očekivanog vremena odgovora u emailu; opcija auto-potvrde u sledećoj fazi |
| Loši vremenski uslovi tokom sezone | Srednji — gubitak rezervacija | Jasna politika otkazivanja, admin flow za weather cancellation |

---

## 22. Prioritizacija

### Must have (MVP)

- Homepage
- Stranica "Naše ture" (4 paketa)
- Detaljna stranica ture sa kalendarom
- Booking flow (4 koraka)
- Email potvrda korisniku
- Admin email notifikacija (odmah po submitovanju)
- Confirmation page sa pre-arrival info
- FAQ (SR + EN)
- Kontakt stranica sa WhatsApp
- O nama
- Pravne stranice (SR + EN)
- Admin panel (ture, dostupnost, rezervacije)
- Višejezičnost SR + EN
- Mobile-first responsive dizajn
- WhatsApp floating dugme

### Should have

- Stranica "Destinacije"
- Statičke recenzije na homepageu
- Cookie consent banner

### Could have (buduće faze)

- Online uplata depozita
- Marketplace model (partner owneri, jahte, brodovi)
- Korisnički nalozi sa istorijom rezervacija
- Recenzije sa moderacijom
- Treći jezik (DE, RU)
- Auto-potvrda rezervacija
- **WhatsApp + Viber notifikacije putem Infobip API-ja** (automatska poruka sa brojem rezervacije i adresom marine)
- Weather API upozorenja
- Popusti i promo kodovi

---

## 23. Predlog vremenskog plana

| Faza | Trajanje | Opis |
|---|---|---|
| Discovery i sadržaj | 1 nedelja | Finalizacija poslovnih pravila, prikupljanje fotografija, prevod tekstova |
| UX i wireframes | 1–2 nedelje | Sitemap, user flow, wireframes za ključne stranice, validacija booking toka |
| UI dizajn | 1–2 nedelje | Visual direction, komponente, responsive ekrani |
| Development | 4–6 nedelja | Frontend, backend, admin panel, email integracija, i18n |
| QA i testiranje | 1–2 nedelje | Funkcionalno testiranje, mobile testiranje, booking scenariji, email testiranje |
| Launch | 1 nedelja | Produkcija, SEO setup, analytics, monitoring |

---

## 24. UAC po modulima

### Homepage
- Korisnik razume ponudu za 5 sekundi
- CTA dugmad vidljiva bez skrolovanja na mobilnom
- Language switcher dostupan odmah

### Ture (listing)
- Sva 4 paketa su vidljiva
- Svaka karta prikazuje cenu, trajanje i destinacije
- Korisnik može pokrenuti booking direktno sa karte

### Detaljna stranica ture
- Prikazana su fotografije, cena, trajanje, destinacije, šta je uključeno
- Kalendar prikazuje dostupne i zauzete termine
- CTA je vidljiv bez previše skrolovanja (sticky na mobilnom)
- Korisnik ne može izabrati zauzet termin

### Booking flow
- Svaki korak je jasan i logično povezan
- Cena je prikazana u svakom koraku
- Greške su jasno objašnjene ispod polja
- Korisnik može da se vrati i izmeni podatke
- Na Koraku 3: plaćanje keš je jasno naznačeno
- Na Koraku 3: depozit je jasno naznačen ako važi

### Confirmation page
- Korisnik vidi booking reference broj
- Korisnik zna tačno šta da uradi pre dolaska (adresa, vreme, šta poneti)
- Email potvrda je poslata
- Admin je obavešten

### Admin panel
- Admin može pronaći rezervaciju za < 30 sekundi
- Admin može blokirati termin u 2 klika
- Admin može promeniti status rezervacije
- Admin vidi sve detalje rezervacije na jednom ekranu

---

*Kraj dokumenta — verzija 2.0*
