export interface OdeljenjeRead {
    Id: number,
    RazredId: number,
    NazivOdeljenja: string,
    VrstaOdeljenja: string,
    OdeljenjskiStaresina?: string,
    UkupanBrojUcenika: number,
    IzdvojenoOdeljenje?: boolean,
    JezikNastave: string
}
