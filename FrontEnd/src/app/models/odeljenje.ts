export interface Odeljenje {
    OdeljenjeId: number;
    NazivOdeljenja: string;
    RazredId: number;
    NazivRazreda: string,
    SkolskaGodinaId: number;
    VrstaOdeljenjaId: number;
    JezikNastaveId: number;
    PrviStraniJezikId?: number;
    DvojezicnoOdeljenje?: boolean;
    KombinovanoOdeljenje: boolean;
    CelodnevnaNastava: boolean;
    IzdvojenoOdeljenje: boolean;
    NazivIzdvojeneSkole?: string;
    OdeljenskiStaresina?: string;
    Smena?: string;
    ProgramId: number;
    BrojUcenika: number;
    BrojUcenica: number;
    UkupanBrojUcenika: number;

    // Neki od property-ja (npr. prviStraniJezikId, nazivIzdvojeneSkole, odeljenskiStaresina, smena) imaju oznaku `?` (optional operator)
    // Ova oznaka znači da je taj property opcion (nije obavezan).
    // Drugim rečima, objekat tipa `Odeljenje` može da sadrži ove property-je, ali i ne mora.
    // To omogućava veću fleksibilnost, npr. ako vrednost nije poznata ili nije primenljiva (null/undefined),
    // kompajler neće prijaviti grešku jer zna da ti podaci mogu biti izostavljeni.
}
