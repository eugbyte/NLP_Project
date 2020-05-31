using Microsoft.EntityFrameworkCore;
using NLP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NLP.HelperClasses
{
    public static class ModelBuilderExtension
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            User user1 = new User();
            user1.Id = "1";

            modelBuilder.Entity<User>().HasData(user1);
        }
    }
}
