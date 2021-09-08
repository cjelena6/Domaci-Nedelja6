// ## Prodavnica

// 1. Korisnik unosi username i password i na klik Login dugmeta se kreira objekat klase Kupac.
// Klasa kupac sadrzi ime, sifru i korpu.
// Div korpa se prikazuje tek kada se korisnik ulogovao.

// 2. Na stranici su sve vreme izlistani svi dostupni proizvodi iz niza proizvoda kreiranih klasom Proizvod

// jedan proizvod treba da sadrzi naziv, cenu, dostupnu kolicinu

// proizvod moze biti prehrambeni ili bela tehnika

// ako je bela tehnika ima i garanciju

// ako je prehrambeni ima rok trajanja

// 3. Korisnik moze da doda proizvod u korpu, ako unese kolicinu vecu od dostupne kolicine ispisati poruku o gresci
// Proizvod iz korpe moze da se obrise klikom na dugme Obrisi iz korpe

// DODATNO, NE MORA:
// 4. Ako je korisnik admin moze da doda nov proizvod

import { nizImena, registrovaniKorisnici } from "./service.js";

const forma = document.querySelector("#forma");
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const username = document.querySelector("#username-text");
const korpa = document.querySelector(".korpa");
const proizvodiUKorpi = document.querySelector(".proizvod-korpa");
const btnObrisi = document.querySelector("#obrisi");
const listaProizvoda = document.querySelector(".proizvodi");


korpa.style.display = "None";

let kupac1;
let prehrambeniProizvodi = [];
let belaTehnikaProizvodi = [];

class Kupac {
    ime;
    sifra;
    korpa;

    constructor(ime, sifra, korpa) {
        this.ime = ime;
        this.sifra = sifra;
        this.korpa = korpa;
    }

    kupacPostoji() {
        if (nizImena.indexOf(this.ime) != -1) {
            return this;
        } else {
            return false;
        }
    }
}

class Proizvod {
    naziv;
    cena;
    kolicna;

    constructor(naziv, cena, kolicina) {
        this.naziv = naziv;
        this.cena = cena;
        this.kolicina = kolicina;
    }
}

class BelaTehnikaiProizvod extends Proizvod {
    garancija;
    constructor(naziv, cena, kolicina, garancija) {
        super(naziv, cena, kolicina);
        this.garancija = garancija;
    }
    dodajuNiz(proizvod) {
        return belaTehnikaProizvodi.push(proizvod);
    }
}

class PrehrambeniProizvod extends Proizvod {
    rokTrajanja;
    constructor(naziv, cena, kolicina, rokTrajanja) {
        super(naziv, cena, kolicina);
        this.rokTrajanja = rokTrajanja;
    }
    dodajuNiz(proizvod) {
        return prehrambeniProizvodi.push(proizvod);
    }
}

function addToDom() {
    if (kupac1.kupacPostoji()) {
        username.innerHTML = `${inputUsername.value}`;
        korpa.style.display = "Block";
    }
    btnObrisi.addEventListener("click", () => {
        korpa.textContent = "";
        proizvodiUKorpi.append(btnObrisi);
    });

}


forma.addEventListener("submit", (event) => {
    event.preventDefault();

    kupac1 = new Kupac(inputUsername.value, inputPassword.value, []);

    console.log(kupac1.kupacPostoji());

    addToDom();
    forma.reset();
});

let proizvodBT1 = new BelaTehnikaiProizvod("Sporet", "15000", "4", "2 godine");
let proizvodBT2 = new BelaTehnikaiProizvod(
    "Frizider",
    "30000",
    "6",
    "2 godine"
);

proizvodBT1.dodajuNiz(proizvodBT1);
proizvodBT2.dodajuNiz(proizvodBT2);

let proizvodP1 = new PrehrambeniProizvod("Mleko", "150", "4", "3 meseca");

proizvodP1.dodajuNiz(proizvodP1);


//Proizvodi na stranici

prehrambeniProizvodi.forEach((proizvod) => {
    let proizvodDiv = document.createElement("div");
    proizvodDiv.innerHTML = ` <p>Naziv: ${proizvod.naziv}</p>
        <p> Cena: ${proizvod.cena}</p>
            <p>Rok trajanja: ${proizvod.rokTrajanja}</p>
          <p>Kolicina: ${proizvod.kolicina}</p> `;

    let kolicinaInput = document.createElement("input");
    kolicinaInput.setAttribute("type", "number");

    let btnDodaj = document.createElement("button");
    btnDodaj.textContent = "Dodaj u Korpu";

    btnDodaj.addEventListener("click", () => {
        proizvodiUKorpi.innerHTML = ` <p>Naziv: ${proizvod.naziv}</p>
        <p> Cena: ${proizvod.cena}</p>
            <p>Rok trajanja: ${proizvod.garancija}</p>
        <p> Kolicina:${kolicinaInput.value} `;
    });
    if (kolicinaInput.value <= proizvod.kolicina) {
        proizvodDiv.append(kolicinaInput, btnDodaj);
        listaProizvoda.append(proizvodDiv);
    } else {
        let p = document.createElement("p")
        p.textContent = "Izabrali ste vecu kolicinu proizvoda od dostupne"
        proizvodiUKorpi.append(p)
    }
});

belaTehnikaProizvodi.forEach((proizvod) => {


    let proizvodDiv = document.createElement("div");

    proizvodDiv.innerHTML = ` <p>Naziv: ${proizvod.naziv}</p>
        <p> Cena: ${proizvod.cena}</p>
            <p>Rok trajanja: ${proizvod.garancija}</p>
            <p>Kolicina: ${proizvod.kolicina}</p> `;

    let kolicinaInput = document.createElement("input");
    kolicinaInput.setAttribute("type", "number");

    let btnDodaj = document.createElement("button");
    btnDodaj.textContent = "Dodaj u Korpu";

    btnDodaj.addEventListener("click", () => {
        proizvodiUKorpi.innerHTML = ` <p>Naziv: ${proizvod.naziv}</p>
        <p> Cena: ${proizvod.cena}</p>
            <p>Garancija: ${proizvod.garancija}</p>
        <p> Kolicina:${kolicinaInput.value} `;
    });
    if (kolicinaInput.value <= proizvod.kolicina) {
        listaProizvoda.append(proizvodDiv);
        proizvodDiv.append(kolicinaInput, btnDodaj);

    } else {
        let p = document.createElement("p")
        p.textContent = "Izabrali ste vecu kolicinu proizvoda od dostupne"
        proizvodiUKorpi.append(p)
    }
});

console.log(belaTehnikaProizvodi);
console.log(prehrambeniProizvodi);
