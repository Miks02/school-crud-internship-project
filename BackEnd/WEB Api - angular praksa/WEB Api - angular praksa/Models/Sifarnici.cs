using System;
using System.Collections.Generic;

namespace WEB_Api___angular_praksa.Models;

public partial class Sifarnici
{
    public int SifarnikId { get; set; }

    public string Naziv { get; set; } = null!;

    public virtual ICollection<StavkeSifarnika> StavkeSifarnika { get; set; } = new List<StavkeSifarnika>();
}
