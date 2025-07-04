using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Xml.Serialization;
using WEB_Api___angular_praksa.Models;

namespace WEB_Api___angular_praksa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SifarnikController : ControllerBase
    {
        private readonly Skola2025Context _context;

        public SifarnikController(Skola2025Context _context)
        {
            this._context = _context;
        }



        [HttpGet("sifarnici")]
        public IActionResult GetAll()
        {

      
            var result = _context.Sifarnici
                .Select(s => new
                {
                    id = s.SifarnikId,
                    naziv = s.Naziv,
                    stavke = s.StavkeSifarnika.Select(s => new
                    {
                        id = s.StavkaId,
                        vrednost = s.Vrednost
                    })
                })
                .ToList();

            return Ok(result);

        }

        [HttpGet("skolske-godine")]
        public IActionResult getSkolskeGodine()
        {
            
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 1)
                .Select(s => new { s.StavkaId, s.Vrednost})
                .ToList();

            return Ok(result);
        }

        [HttpGet("programi")]
        public IActionResult getProgrami()
        {
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 5)
                .Select (s => new {s.StavkaId, s.Vrednost})
                .ToList();

            return Ok(result);
        }

        [HttpGet("razredi")]
        public IActionResult getRazredi()
        {
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 6)
                .Select(s => new { s.StavkaId, s.Vrednost })
                .ToList();

            return Ok(result);
        }

        [HttpGet("prvi-strani-jezik")]
        public IActionResult getPrviStraniJezici()
        {
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 4)
                .Select(s => new { s.StavkaId, s.Vrednost })
                .ToList();

            return Ok(result);
        }

        [HttpGet("vrsta-odeljenja")]
        public IActionResult getVrsteOdeljenja()
        {
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 2)
                .Select(s => new { s.StavkaId, s.Vrednost })
                .ToList();

            return Ok(result);
        }

        [HttpGet("jezik-nastave")]
        public IActionResult getJeziciNastave()
        {
            var result = _context.StavkeSifarnika
                .Where(s => s.SifarnikId == 3)
                .Select(s => new { s.StavkaId, s.Vrednost })
                .ToList();

            return Ok(result);
        }

    }
}
