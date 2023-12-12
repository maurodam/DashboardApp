using DashboardApp.Data;
using DashboardApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

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

        [HttpGet("GetElements")]
        public IActionResult ElementCoordinate()
        {
            var elements = _dashboardAppDbContext.Elements
                    .OrderBy(o => o.Name)
                    .ToList();

            if (elements == null)
            {
                return NotFound($"Elementi non trovati.");
            }

            return Ok(elements);
        }

        [HttpGet("GetCoordinate")]
        public IActionResult GetCoordinate(int elementId)
        {
            try
            {
                var element = _dashboardAppDbContext.ElementCoordinate
                    .Where(w => w.ElementId == elementId)
                    .OrderByDescending(o => o.Id)
                    .FirstOrDefault();

                if (element == null)
                {
                    return NotFound($"Elemento non trovato.");
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
        public IActionResult SaveCoordinate(ElementCoordinate element)
        {
            try
            {
                var existingElement = _dashboardAppDbContext.ElementCoordinate.FirstOrDefault(e => e.ElementId == element.ElementId);

                if (existingElement == null)
                {
                    _dashboardAppDbContext.ElementCoordinate.Add(element);
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