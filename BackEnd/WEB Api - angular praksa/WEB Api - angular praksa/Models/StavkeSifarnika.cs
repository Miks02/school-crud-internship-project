using System;
using System.Collections.Generic;

namespace WEB_Api___angular_praksa.Models;

public partial class StavkeSifarnika
{
    public int StavkaId { get; set; }

    public int SifarnikId { get; set; }

    public string Vrednost { get; set; } = null!;

    public virtual ICollection<Odeljenja> OdeljenjaJezikNastave { get; set; } = new List<Odeljenja>();

    public virtual ICollection<Odeljenja> OdeljenjaProgram { get; set; } = new List<Odeljenja>();

    public virtual ICollection<Odeljenja> OdeljenjaPrviStraniJezik { get; set; } = new List<Odeljenja>();

    public virtual ICollection<Odeljenja> OdeljenjaSkolskaGodina { get; set; } = new List<Odeljenja>();

    public virtual ICollection<Odeljenja> OdeljenjaVrstaOdeljenja { get; set; } = new List<Odeljenja>();

    public virtual ICollection<Razredi> RazrediProgram { get; set; } = new List<Razredi>();

    public virtual ICollection<Razredi> RazrediSkolskaGodina { get; set; } = new List<Razredi>();

    public virtual Sifarnici Sifarnik { get; set; } = null!;
}
