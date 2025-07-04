using System.ComponentModel.DataAnnotations;

namespace WEB_Api___angular_praksa.Models
{
    public class RazredCreatedDto
    {
        
        public string NazivRazreda { get; set; } = null!; 
        public int SkolskaGodinaId { get; set; }
        public int programId { get; set; }
    }
}
