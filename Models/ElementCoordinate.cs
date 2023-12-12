using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DashboardApp.Models
{
    public class ElementCoordinate
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        // Chiave esterna
        [ForeignKey("Elements")]
        public int ElementId { get; set; }

        public int X { get; set; }
        public int Y { get; set; }
    }

}
