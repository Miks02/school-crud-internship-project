namespace WEB_Api___angular_praksa.Models
{
    public class OdeljenjeCreatedDto
    {
        public string NazivOdeljenja { get; set; } = null!;
        public int RazredId { get; set; }
        public int SkolskaGodinaId { get; set; }
        public int VrstaOdeljenjaId { get; set; }
        public int? PrviStraniJezikId { get; set; }
        public int JezikNastaveId { get; set; }
        public bool? DvojezicnoOdeljenje { get; set; }
        public int ProgramId { get; set; }
        public bool? KombinovanoOdeljenje { get; set; }
        public bool? CelodnevnaNastava { get; set; }
        public bool? IzdvojenoOdeljenje { get; set; }
        public string? NazivIzdvojeneSkole { get; set; }
        public string? OdeljenskiStaresina { get; set; }
        public int UkupanBrojUcenika { get; set; }
        public int BrojUcenika { get; set; }
        public int BrojUcenica { get; set;}
        public string? Smena { get; set; }
    }
}
