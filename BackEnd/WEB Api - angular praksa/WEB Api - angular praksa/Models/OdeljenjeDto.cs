namespace WEB_Api___angular_praksa.Models
{
    public class OdeljenjeDto
    {
        public int Id { get; set; }
        public int RazredId { get; set; }
        public string NazivOdeljenja { get; set; } = null!;
        public string VrstaOdeljenja { get; set; } = null!;
        public string? OdeljenjskiStaresina { get; set; }
        public int UkupanBrojUcenika { get; set; }
        public bool? IzdvojenoOdeljenje { get; set; }
        public string JezikNastave { get; set; } = null!;
    }
}
