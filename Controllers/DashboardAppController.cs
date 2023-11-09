using DashboardApp.Data;
using DashboardApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DashboardAppAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class DraggableElementController : ControllerBase
    {
        private readonly DashboardAppDbContext _dashboardAppDbContext;

        public DraggableElementController(DashboardAppDbContext dashboardAppDbContext)
        {
            _dashboardAppDbContext = dashboardAppDbContext;
        }

        [HttpGet("GetCoordinate")]
        public IActionResult GetCoordinate(string elementName)
        {
            try
            {
                var element = _dashboardAppDbContext.DraggableElements
                    .Where(w => w.Name == elementName)
                    .OrderByDescending(o => o.Id)
                    .FirstOrDefault();

                if (element == null)
                {
                    return NotFound($"Elemento con il nome {elementName} non trovato.");
                }

                return Ok(element);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante il recupero delle coordinate: {ex.Message}");
                return StatusCode(500, "Errore interno del server");
            }
        }



        [HttpPost("SaveCoordinate")]
        public IActionResult SaveCoordinate(DraggableElement element)
        {
            try
            {
                var existingElement = _dashboardAppDbContext.DraggableElements.FirstOrDefault(e => e.Name == element.Name);

                if (existingElement == null)
                {
                    _dashboardAppDbContext.DraggableElements.Add(element);
                }
                else
                {
                    // Aggiorna solo le proprietà necessarie
                    existingElement.X = element.X;
                    existingElement.Y = element.Y;
                }

                _dashboardAppDbContext.SaveChanges();

                return Ok(element);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore durante il salvataggio dell'elemento: {ex.Message}");
                return StatusCode(500, "Errore interno del server");
            }
        }


    }
}