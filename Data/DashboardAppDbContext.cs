using DashboardApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DashboardApp.Data
{
    public class DashboardAppDbContext : DbContext
    {
        public DashboardAppDbContext(DbContextOptions<DashboardAppDbContext> options) : base(options)
        {
        }

        public DbSet<ElementCoordinate> ElementCoordinate { get; set; }
        public DbSet<Elements> Elements { get; set; }
    }

}
