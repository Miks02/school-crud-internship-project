using System;
using System.Collections.Generic;

namespace WEB_Api___angular_praksa.Models;

public partial class Razredi
{
    public int RazredId { get; set; }

    public string NazivRazreda { get; set; } = null!;

    public int SkolskaGodinaId { get; set; }

    public int ProgramId { get; set; }

    public virtual ICollection<Odeljenja> Odeljenja { get; set; } = new List<Odeljenja>();

    public virtual StavkeSifarnika Program { get; set; } = null!;

    public virtual StavkeSifarnika SkolskaGodina { get; set; } = null!;
}
