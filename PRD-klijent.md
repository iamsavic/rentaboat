# Rent-a-Boat — Specifikacija sajta

**Verzija:** 1.0  
**Datum:** Mart 2026  
**Namena dokumenta:** Pregled funkcionalnosti i sadržaja sajta za klijenta

---

## Šta je ovaj sajt?

Rent-a-Boat je web sajt koji turistima i lokalcima omogućava da pregledaju vaše speedboat ture i pošalju zahtev za rezervaciju — direktno sa telefona ili računara, bez poziva i poruka.

Sajt pokriva sve od prvog utiska do potvrde rezervacije: jasne fotografije, opise tura i destinacija, kalendar dostupnosti, formu za rezervaciju i automatske email potvrde.

---

## Šta korisnik može da uradi na sajtu?

- Vidi sve 4 ture sa cenama, trajanjem i destinacijama
- Otvori detalje svake ture i pogleda fotografije
- Provjeri koje ture su slobodne za određeni datum
- Izabere datum i vreme polaska
- Pošalje zahtev za rezervaciju
- Odmah dobije email potvrdu sa svim informacijama i adresom marine

---

## Stranice sajta

### Početna strana

Prva strana koju korisnik vidi. Treba da odmah prenese vrednost ponude i odvede korisnika ka rezervaciji.

Sadrži:
- Udarni naslov i fotografiju ili video speedboata
- Dugmad "Pogledaj ture" i "Rezerviši odmah"
- Kratak prikaz sva 4 paketa
- Sekcija "Šta je uključeno" — skipper, gorivo, voda, zaustavljanja za plivanje
- Kako funkcioniše u 3 koraka: Izaberi turu → Pošalji zahtev → Dođi na marinu
- Fotografije destinacija koje se posećuju
- Recenzije gostiju (3–4 statičke recenzije)
- Najčešća pitanja (preview)
- Dugme za rezervaciju pri dnu strane

---

### Naše ture

Stranica sa prikazom sva 4 paketa. Svaki paket ima svoju karticu sa:
- Fotografijom
- Nazivom i trajanjem
- Cenom (istaknuto)
- Listom destinacija koje su uključene
- Dugmetom za detalje i rezervaciju

| Tura | Trajanje | Cena |
|---|---|---|
| Panoramska tura | 1h | €80 |
| Sveti Stefan tura | 2h | €160 |
| Petrovac tura | 3h | €240 |
| Blue Cave tura | ~3h | €300 |

Sve ture uvek uključuju: skipper, gorivo, vodu dobrodošlice i slobodna zaustavljanja za plivanje.

---

### Detaljna stranica ture

Svaka tura ima svoju stranicu sa svim informacijama koje su korisniku potrebne za odluku:

- Galerija fotografija (speedboat + destinacije)
- Trajanje i cena
- Šta je uključeno u cenu
- Lista destinacija sa kratkim opisima
- Kapacitet (max 7 osoba)
- Polazna tačka: Budva Marina
- Kalendar sa slobodnim terminima za izabrani datum
- Box za rezervaciju (datum, vreme, broj osoba, ukupna cena)

---

### Destinacije

Stranica koja opisuje sva mesta koja se posećuju tokom tura:
- Plava laguna
- Kalijpso pećina
- Ostrvo Sv. Nikole
- Sveti Stefan
- Petrovac
- Blue Cave

Svako mesto ima fotografiju, kratki opis i informaciju u kojoj turi se ono posećuje.

---

### Rezervacija (booking)

Proces rezervacije je podeljen u 4 jasna koraka:

**Korak 1 — Izaberi termin**
Korisnik bira datum, vreme polaska i broj osoba. Cena se odmah prikazuje. Zauzeti termini su blokirani.

**Korak 2 — Unesi podatke**
Korisnik unosi ime, prezime, email, telefon i državu. Opciono može ostaviti napomenu.

**Korak 3 — Pregled**
Korisnik vidi sažetak svega: tura, datum, vreme, broj osoba, ukupna cena i napomena da se plaća keš na marini. Potvrđuje rezervaciju klikom na dugme.

**Korak 4 — Potvrda**
Ekran sa brojem rezervacije i svim informacijama za dolazak:
- Adresa marine sa linkom za Google Maps
- "Molimo dođite 10 minuta pre polaska"
- Šta poneti
- Kontakt telefon i WhatsApp

---

### FAQ (Najčešća pitanja)

Stranica sa odgovorima grupisanim po temama:

- O turama (šta je uključeno, koliko osoba, skipper...)
- Rezervacija i plaćanje (kako rezervisati, keš plaćanje, depozit...)
- Na dan ture (gde je marina, vreme dolaska, šta poneti...)
- Vremenski uslovi (šta ako je loše vreme...)

---

### Kontakt

- Telefon (klik na mobilnom direktno zove)
- WhatsApp (klik otvara chat)
- Email
- Adresa marine
- Radno vreme
- Google mapa
- Kontakt forma

---

### O nama

Kratka priča o poslovanju, timu, fokusu na bezbednost i razlozima zašto korisnici biraju vaše ture.

---

### Pravne stranice

- Uslovi korišćenja
- Politika privatnosti
- Politika kolačića

**Napomena:** Politika otkazivanja ne postoji. Rezervacije su finalne.

---

## Jezici

Sajt je dostupan na **srpskom i engleskom jeziku**. Korisnik bira jezik u meniju. Sav sadržaj — ture, destinacije, FAQ, booking forma — dostupan je na oba jezika. Email potvrde se šalju na jeziku koji je korisnik koristio.

---

## Mobilni telefoni

Sajt je dizajniran primarno za mobilne uređaje jer se očekuje da većina korisnika rezerviše sa telefona. Sve funkcije — uključujući pretragu, kalendar i formu za rezervaciju — rade glatko na iOS i Android uređajima.

---

## Šta se dešava kada neko pošalje rezervaciju?

1. Korisnik dobija **email potvrdu** odmah — sa brojem rezervacije, sažetkom ture i uputstvima za dolazak.
2. Vi dobijate **email sa svim detaljima** rezervacije — ime, kontakt, tura, datum, vreme, broj osoba.
3. Vi dobijate **Telegram poruku** na telefon u istom trenutku — kratka notifikacija za brzi pregled bez otvaranja emaila.

---

## Admin panel — šta vi možete da radite

Admin panel je privatni deo sajta dostupan samo vama, sa lozinkom.

**Upravljanje turama:**
- Izmena naziva, opisa i cene ture
- Dodavanje i menjanje fotografija
- Uključivanje / isključivanje ture iz ponude

**Upravljanje kalendarom:**
- Blokiranje datuma kada ne radite (odmor, loše vreme, servis plovila)
- Blokiranje konkretnih vremenskih intervala unutar dana
- Podešavanje radnog vremena i pauze između tura

**Upravljanje rezervacijama:**
- Pregled svih rezervacija (filtrirano po datumu, statusu, imenu)
- Promena statusa rezervacije: Nova → Potvrđena → Završena (ili Otkazana / No-show)
- Kada otkazujete rezervaciju, taj termin se **automatski oslobađa** i postaje odmah dostupan na kalendaru za nove rezervacije
- Unos internih napomena uz svaku rezervaciju
- Pretraga po imenu, emailu ili broju rezervacije

**Statusi rezervacije:**

| Status | Značenje |
|---|---|
| Nova | Stigao zahtev, niste još pogledali |
| Na čekanju | Pregledate, čeka potvrdu |
| Potvrđena | Potvrdili ste rezervaciju |
| Otkazana | Otkazana (vi ili gost) — termin se odmah oslobađa na kalendaru |
| Završena | Tura je realizovana |
| No-show | Gost nije došao |

---

## Depozit

Za ture duže od 4 sata sistem automatski obaveštava korisnika da je depozit obavezan. Vi podešavate iznos depozita u admin panelu. Depozit se plaća keš pri dolasku na marinu — nema online naplate.

Trenutna 4 paketa tura (max ~3h) **ne zahtevaju depozit**.

---

## WhatsApp

WhatsApp broj je vidljiv na svim stranicama sajta — u meniju, u dnu strane i kao plutajuće dugme. Korisnici mogu jednim klikom da vas kontaktiraju direktno.

---

## Šta nije u prvoj verziji sajta

Sledeće funkcionalnosti nisu deo prve verzije, ali su planirane za kasniji razvoj:

- Online plaćanje karticom ili uplatom depozita
- Korisnički nalozi (istorija rezervacija)
- Automatske WhatsApp i Viber poruke korisnicima
- Recenzije sa moderacijom
- Dodavanje jahti i brodova od partnera
- Treći jezik (npr. nemački, ruski)

---

## Buduće proširenje — marketplace

Platforma je od starta dizajnirana tako da može da prihvati i plovila od vaših partnera (jahte, brodovi). U sledećoj fazi možete dodati partnerska plovila i njihove ture, a sajt postaje posrednička platforma sa automatskim vođenjem provizija.

---

## Šta je potrebno od vas pre razvoja

Pre nego što razvoj počne, potrebno je da obezbijedite:

- [ ] Profesionalne fotografije speedboata (minimum 8: plovilo, na vodi, destinacije, marina)
- [ ] Fotografije svih destinacija (Plava laguna, Sveti Stefan, Petrovac, Blue Cave, pećine, ostrvo)
- [ ] Tekstove za "O nama" stranicu
- [ ] WhatsApp Business broj
- [ ] Telegram nalog za admin notifikacije
- [ ] Verifikovani domen (npr. rentaboat.me) za slanje emailova
- [ ] Google Maps pin za Budva Marinu
- [ ] Kontakt informacije (telefon, email, adresa, radno vreme)

---

*Dokument pripremljen za klijenta — tehničke detalje implementacije nalaze se u posebnom tehničkom PRD-u.*
