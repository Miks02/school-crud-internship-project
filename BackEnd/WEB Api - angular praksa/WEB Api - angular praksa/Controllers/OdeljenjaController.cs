using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WEB_Api___angular_praksa.Models;

namespace WEB_Api___angular_praksa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OdeljenjaController : Controller
    {
        private readonly Skola2025Context _context;

        public OdeljenjaController(Skola2025Context context)
        {
            _context = context;
        }

        [HttpGet("sva-odeljenja")]
        public async Task<ActionResult<IEnumerable<OdeljenjeDto>>> GetOdeljenja()
        {

            IQueryable<Odeljenja> query = _context.Odeljenja;

            var odeljenja = await query
               .Include(o => o.JezikNastave)
               .Include(o => o.VrstaOdeljenja)
               .Include(o => o.Razred)
               .Select(o => new OdeljenjeDto
               {
                   Id = o.OdeljenjeId,
                   RazredId = o.RazredId,
                   NazivOdeljenja = o.NazivOdeljenja,
                   VrstaOdeljenja = o.VrstaOdeljenja.Vrednost,
                   OdeljenjskiStaresina = o.OdeljenskiStaresina,
                   UkupanBrojUcenika = o.UkupanBrojUcenika,
                   IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                   JezikNastave = o.JezikNastave.Vrednost
               })
               .ToListAsync();

            return Ok(odeljenja);
        }

        [HttpGet("odeljenja-tabela")]
        public async Task<ActionResult<IEnumerable<OdeljenjeDto>>> GetTabelaOdeljenja(string sortBy, int page = 1, int pageSize = 5)
        {

            IQueryable<Odeljenja> query = _context.Odeljenja
                .Include(o => o.JezikNastave)
                .Include(o => o.VrstaOdeljenja)
                .Include(o => o.Razred);

            if (string.IsNullOrEmpty(sortBy) || string.IsNullOrWhiteSpace(sortBy))
                sortBy = "Podazumevano";

            switch (sortBy)
            {
                case "UkupanBrojUcenika":
                    query = query.OrderByDescending(o => o.UkupanBrojUcenika);
                    break;
                case "VrstaOdeljenja":
                    query = query.OrderBy(o => o.VrstaOdeljenja);
                    break;
                case "NazivOdeljenja":
                    query = query.OrderBy(o => o.NazivOdeljenja);
                    break;
                case "Podrazumevano":
                    query = query.OrderBy(o => o.OdeljenjeId);
                    break;
                default:
                    return BadRequest("Pogrešan parametar za sortiranje " + sortBy);

            }

            int totalCount = await query.CountAsync();

            if (totalCount == 0)
            {
                return Ok(new
                {
                    data = new List<OdeljenjeDto>(),
                    total = 0
                });
            }

            var rezultat = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new OdeljenjeDto
                {
                    Id = o.OdeljenjeId,
                    RazredId = o.RazredId,
                    NazivOdeljenja = o.NazivOdeljenja,
                    VrstaOdeljenja = o.VrstaOdeljenja.Vrednost,
                    OdeljenjskiStaresina = o.OdeljenskiStaresina,
                    UkupanBrojUcenika = o.UkupanBrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost
                })
                .ToListAsync();

            return Ok(new
            {
                data = rezultat,
                total = totalCount
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetOdeljenjeById(int id)
        {
            var query = _context.Odeljenja
                .Where(o => o.OdeljenjeId == id)
                .Select(o => new
                {
                    o.OdeljenjeId,
                    o.NazivOdeljenja,
                    o.IzdvojenoOdeljenje,
                    o.JezikNastaveId,
                    o.VrstaOdeljenja,
                    o.BrojUcenica,
                    o.BrojUcenika,
                    o.UkupanBrojUcenika,
                    o.PrviStraniJezikId,
                    o.SkolskaGodinaId,
                    o.ProgramId,
                    o.OdeljenskiStaresina,
                    o.Smena,
                    o.CelodnevnaNastava,
                    o.DvojezicnoOdeljenje,
                    o.NazivIzdvojeneSkole,
                    o.VrstaOdeljenjaId,
                    o.KombinovanoOdeljenje,
                    o.RazredId,
                    o.Razred.NazivRazreda
                });

            var odeljenje = await query.FirstOrDefaultAsync();

            if (odeljenje == null)
                return NotFound();

            return Ok(odeljenje);
        }

        [HttpPost]
        public async Task<ActionResult> AddOdeljenje(OdeljenjeCreatedDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var novoOdeljenje = new Odeljenja
            {
                NazivOdeljenja = dto.NazivOdeljenja,
                RazredId = dto.RazredId,
                SkolskaGodinaId = dto.SkolskaGodinaId,
                VrstaOdeljenjaId = dto.VrstaOdeljenjaId,
                JezikNastaveId = dto.JezikNastaveId,
                ProgramId = dto.ProgramId,
                OdeljenskiStaresina = dto.OdeljenskiStaresina,
                CelodnevnaNastava = dto.CelodnevnaNastava,
                Smena = dto.Smena,
                KombinovanoOdeljenje = dto.KombinovanoOdeljenje,
                IzdvojenoOdeljenje = dto.IzdvojenoOdeljenje,
                PrviStraniJezikId = dto.PrviStraniJezikId,
                DvojezicnoOdeljenje = dto.DvojezicnoOdeljenje,
                NazivIzdvojeneSkole = dto.NazivIzdvojeneSkole,
                BrojUcenika = dto.BrojUcenika,
                BrojUcenica = dto.BrojUcenica,
                UkupanBrojUcenika = dto.BrojUcenika + dto.BrojUcenica
            };

            _context.Odeljenja.Add(novoOdeljenje);
            await _context.SaveChangesAsync();

            return Ok(new { poruka = "Odeljenje je uspešno dodato", id = novoOdeljenje.OdeljenjeId });
        }

        [HttpDelete("brisanje-odeljenja-po-razredu/{razredId}")]
        public async Task<IActionResult> DeleteOdeljenjaByRazredId(int razredId)
        {
            var query = _context.Odeljenja.Where(o => o.RazredId == razredId);
            var odeljenja = await query.ToListAsync();

            if (!odeljenja.Any())
                return NotFound();

            _context.Odeljenja.RemoveRange(odeljenja);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOdeljenje(int id)
        {
            var odeljenje = await _context.Odeljenja.FindAsync(id);

            if (odeljenje == null)
                return NotFound("Odeljenje nije pronađeno!");

            _context.Odeljenja.Remove(odeljenje);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOdeljenje(int id, [FromBody] OdeljenjeCreatedDto updatedOdeljenje)
        {
            if (updatedOdeljenje == null)
                return BadRequest("Podaci za izmenu nisu prosleđeni");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

          

            var existingOdeljenje = await _context.Odeljenja.FindAsync(id);

            if (existingOdeljenje == null)
                return NotFound("Traženo odeljenje nije pronađeno");

            var query = _context.Odeljenja
                .Where(o => o.OdeljenjeId != id &&
                    o.NazivOdeljenja == updatedOdeljenje.NazivOdeljenja &&
                    o.RazredId == updatedOdeljenje.RazredId &&
                    o.SkolskaGodinaId == updatedOdeljenje.SkolskaGodinaId &&
                    o.VrstaOdeljenjaId == updatedOdeljenje.VrstaOdeljenjaId &&
                    o.PrviStraniJezikId == updatedOdeljenje.PrviStraniJezikId &&
                    o.JezikNastaveId == updatedOdeljenje.JezikNastaveId &&
                    o.DvojezicnoOdeljenje == updatedOdeljenje.DvojezicnoOdeljenje &&
                    o.ProgramId == updatedOdeljenje.ProgramId &&
                    o.KombinovanoOdeljenje == updatedOdeljenje.KombinovanoOdeljenje &&
                    o.CelodnevnaNastava == updatedOdeljenje.CelodnevnaNastava &&
                    o.IzdvojenoOdeljenje == updatedOdeljenje.IzdvojenoOdeljenje &&
                    o.NazivIzdvojeneSkole == updatedOdeljenje.NazivIzdvojeneSkole &&
                    o.OdeljenskiStaresina == updatedOdeljenje.OdeljenskiStaresina &&
                    o.UkupanBrojUcenika == updatedOdeljenje.UkupanBrojUcenika &&
                    o.BrojUcenika == updatedOdeljenje.BrojUcenika &&
                    o.BrojUcenica == updatedOdeljenje.BrojUcenica &&
                    o.Smena == updatedOdeljenje.Smena
                );

            if (await query.AnyAsync())
                return BadRequest("Odeljenje već postoji!");

            
            existingOdeljenje.NazivOdeljenja = updatedOdeljenje.NazivOdeljenja;
            existingOdeljenje.RazredId = updatedOdeljenje.RazredId;
            existingOdeljenje.SkolskaGodinaId = updatedOdeljenje.SkolskaGodinaId;
            existingOdeljenje.VrstaOdeljenjaId = updatedOdeljenje.VrstaOdeljenjaId;
            existingOdeljenje.PrviStraniJezikId = updatedOdeljenje.PrviStraniJezikId;
            existingOdeljenje.JezikNastaveId = updatedOdeljenje.JezikNastaveId;
            existingOdeljenje.DvojezicnoOdeljenje = updatedOdeljenje.DvojezicnoOdeljenje;
            existingOdeljenje.ProgramId = updatedOdeljenje.ProgramId;
            existingOdeljenje.KombinovanoOdeljenje = updatedOdeljenje.KombinovanoOdeljenje;
            existingOdeljenje.CelodnevnaNastava = updatedOdeljenje.CelodnevnaNastava;
            existingOdeljenje.IzdvojenoOdeljenje = updatedOdeljenje.IzdvojenoOdeljenje;
            existingOdeljenje.NazivIzdvojeneSkole = updatedOdeljenje.NazivIzdvojeneSkole;
            existingOdeljenje.OdeljenskiStaresina = updatedOdeljenje.OdeljenskiStaresina;
            existingOdeljenje.UkupanBrojUcenika = updatedOdeljenje.UkupanBrojUcenika;
            existingOdeljenje.BrojUcenika = updatedOdeljenje.BrojUcenika;
            existingOdeljenje.BrojUcenica = updatedOdeljenje.BrojUcenica;
            existingOdeljenje.Smena = updatedOdeljenje.Smena;

            await _context.SaveChangesAsync();

            return Ok(existingOdeljenje);
        }

    }
}
