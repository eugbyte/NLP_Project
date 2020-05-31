using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NLP.HelperClasses;
using NLP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.Data
{
    public class NlpDbContext : IdentityDbContext
    {

        public NlpDbContext(DbContextOptions<NlpDbContext> options) : base(options)
        {
            //
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Seed();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<AnalysisResult> AnalysisResults { get; set; }
    }
}
