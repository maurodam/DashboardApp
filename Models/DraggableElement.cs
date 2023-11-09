﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DashboardApp.Models
{
    public class DraggableElement
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }

}
