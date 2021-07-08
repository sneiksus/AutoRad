using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoRad.Models
{
    public class EFContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public EFContext(DbContextOptions<EFContext> options)
            : base(options)
        {
            Database.EnsureCreated();  
        }
    }
}
