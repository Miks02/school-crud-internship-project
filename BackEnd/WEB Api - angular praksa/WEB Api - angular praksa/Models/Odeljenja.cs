using System;
using System.Collections.Generic;

namespace WEB_Api___angular_praksa.Models;

public partial class Odeljenja
{
    public int OdeljenjeId { get; set; }

    public string NazivOdeljenja { get; set; } = null!;

    public int RazredId { get; set; }

    public int SkolskaGodinaId { get; set; }

    public int VrstaOdeljenjaId { get; set; }

    public int JezikNastaveId { get; set; }

    public int? PrviStraniJezikId { get; set; }

    public bool? DvojezicnoOdeljenje { get; set; }

    public int ProgramId { get; set; }

    public bool? KombinovanoOdeljenje { get; set; }

    public bool? CelodnevnaNastava { get; set; }

    public bool? IzdvojenoOdeljenje { get; set; }

    public string? NazivIzdvojeneSkole { get; set; }

    public string? OdeljenskiStaresina { get; set; }

    public int UkupanBrojUcenika { get; set; }

    public int BrojUcenika { get; set; }

    public int BrojUcenica { get; set; }

    public string? Smena { get; set; }

    public virtual StavkeSifarnika JezikNastave { get; set; } = null!;

    public virtual StavkeSifarnika Program { get; set; } = null!;

    public virtual StavkeSifarnika PrviStraniJezik { get; set; } = null!;

    public virtual Razredi Razred { get; set; } = null!;

    public virtual StavkeSifarnika SkolskaGodina { get; set; } = null!;

    public virtual StavkeSifarnika VrstaOdeljenja { get; set; } = null!;
}
