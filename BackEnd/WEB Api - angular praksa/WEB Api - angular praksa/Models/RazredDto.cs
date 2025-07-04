namespace WEB_Api___angular_praksa.Models
{
    public class RazredDto
    {
        public int Id { get; set; }
        public string NazivRazreda { get; set; } = null!;
        public string SkolskaGodina { get; set; } = null!;
        public string Program { get; set; } = null!;

        public int UkupanBrojOdeljenja { get; set; }
        public int UkupanBrojUcenika { get; set; }


    }
}
