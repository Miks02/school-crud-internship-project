using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WEB_Api___angular_praksa.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace WEB_Api___angular_praksa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RazrediController : Controller
    {
        private readonly Skola2025Context _context;

        public RazrediController(Skola2025Context _context)
        {
            this._context = _context;
        }

        [HttpGet("svi-razredi")]
        public async Task<IActionResult> GetRazredi()
        {
            var rezultat = await _context.Razredi
                .Select(r => new RazredDto
                {
                    Id = r.RazredId,
                    NazivRazreda = r.NazivRazreda,
                    SkolskaGodina = r.SkolskaGodina.Vrednost,
                    Program = r.Program.Vrednost,
                    UkupanBrojOdeljenja = r.Odeljenja.Count,
                    UkupanBrojUcenika = r.Odeljenja.Sum(o => o.UkupanBrojUcenika)
                })
                .ToListAsync();

            return Ok(rezultat);
        }

        [HttpGet("tabela-razreda")]
        public IActionResult GetRazrediTabela(string sortBy, int page = 1, int pageSize = 5)
        {
            IQueryable<Razredi> query = _context.Razredi
                .Include(r => r.SkolskaGodina)
                .Include(r => r.Program)
                .Include(r => r.Odeljenja);

            if (string.IsNullOrEmpty(sortBy) || string.IsNullOrWhiteSpace(sortBy))
                sortBy = "Podazumevano";

            switch (sortBy)
            {
                case "SkolskaGodina":
                    query = query.OrderBy(r => r.SkolskaGodina);
                    break;
                case "Program":
                    query = query.OrderBy(r => r.Program);
                    break;
                case "NazivRazreda":
                    query = query.OrderBy(r => r.NazivRazreda);
                    break;
                case "Podrazumevano":
                    query = query.OrderBy(r => r.RazredId);
                    break;
                default:
                    return BadRequest("Pogrešan parametar za sortiranje " + sortBy);

            }

            int totalCount = query.Count();

            if (totalCount == 0)
            {
                return Ok(new
                {
                    data = new List<RazredDto>(),
                    total = 0
                });
            }

            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 5;

            var rezultat = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new RazredDto
            {
                Id = r.RazredId,
                NazivRazreda = r.NazivRazreda,
                SkolskaGodina = r.SkolskaGodina.Vrednost,
                Program = r.Program.Vrednost,
                UkupanBrojOdeljenja = r.Odeljenja.Count,
                UkupanBrojUcenika = r.Odeljenja.Sum(o => o.UkupanBrojUcenika)
            }).ToList();


            return Ok(new
            {
                data = rezultat,
                total = totalCount
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRazredById(int id)
        {
            var razred = await _context.Razredi
                .Where(r => r.RazredId == id)
                .Select(r => new
                {
                    r.RazredId,
                    r.NazivRazreda,
                    SkolskaGodina = r.SkolskaGodina.Vrednost,
                    Program = r.Program.Vrednost,
                    UkupanBrojOdeljenja = r.Odeljenja.Count,
                    UkupanBrojUcenika = r.Odeljenja.Sum(o => o.UkupanBrojUcenika)
                })
                .FirstOrDefaultAsync();

            if (razred == null)
                return NotFound();

            return Ok(razred);
        }

        [HttpPost]
        public async Task<IActionResult> AddRazred([FromBody] RazredCreatedDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var postoji = await _context.Razredi
                .AnyAsync(r =>
                    r.SkolskaGodinaId == dto.SkolskaGodinaId &&
                    r.NazivRazreda == dto.NazivRazreda &&
                    r.ProgramId == dto.programId);

            if (postoji)
                return BadRequest("Razred već postoji!");

            var noviRazred = new Razredi
            {
                NazivRazreda = dto.NazivRazreda,
                SkolskaGodinaId = dto.SkolskaGodinaId,
                ProgramId = dto.programId
            };

            _context.Razredi.Add(noviRazred);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRazredById), new { id = noviRazred.RazredId }, noviRazred);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRazred(int id,[FromBody] RazredCreatedDto updatedRazred)
        {

            if (updatedRazred == null)
                return BadRequest("Podaci za izmenu nisu prosleđeni.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingRazred = await _context.Razredi.FindAsync(id);

            if (existingRazred == null)
                return NotFound("Trazeni razred nije pronadjen");

            var postoji = await _context.Razredi
                .AnyAsync(r =>
                r.SkolskaGodinaId == updatedRazred.SkolskaGodinaId &&
                r.NazivRazreda == updatedRazred.NazivRazreda &&
                r.ProgramId == updatedRazred.programId &&
                r.RazredId != id);

            if (postoji)
                return BadRequest("Razred već postoji!");

            existingRazred.NazivRazreda = updatedRazred.NazivRazreda;
            existingRazred.SkolskaGodinaId = updatedRazred.SkolskaGodinaId;
            existingRazred.ProgramId = updatedRazred.programId;

            await _context.SaveChangesAsync();

            return Ok(existingRazred);

        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRazred(int id)
        {
            var razred = await _context.Razredi.FindAsync(id);

            if (razred == null)
                return NotFound();

            _context.Razredi.Remove(razred);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    


}
}
