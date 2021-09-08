
let registrovaniKorisnici = [
    {
        ime: "Pera",
        sifra: "blabla",
        korpa: []
    },
    {
        ime: "Nikola",
        sifra: "sifra1",
        korpa: []
    },
    {
        ime: "Nina",
        sifra: "hello",
        korpa: []
    },
    {
        ime: "Milica",
        sifra: "novo",
        korpa: []
    },
]

let nizImena =[] 
registrovaniKorisnici.forEach(korisnik => {
    nizImena.push(korisnik.ime)
})


export { registrovaniKorisnici, nizImena}


