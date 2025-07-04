export interface StavkaSifarnika {
    id:number,
    vrednost: string; 
}

export interface Sifarnik {
    id:number,
    naziv: string,
    stavke: Array<StavkaSifarnika>;
}

// S obzirom da su modeli za sifarnik i stavke sifarnika veoma mali odnosno imaju malu kolicinu podataka
// logicnije mi je bilo da oba interfejsa smestim u jedan fajl s obzirom na to da su povezani.
// Vama olaksava citljivost a meni posao
