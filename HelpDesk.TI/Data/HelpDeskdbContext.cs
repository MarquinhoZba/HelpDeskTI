using Microsoft.EntityFrameworkCore;

namespace HelpDesk.TI.Data
{
    public class HelpDeskDbContext : DbContext
    {
        public HelpDeskDbContext(DbContextOptions<HelpDeskDbContext> options)
            : base(options)
        {
        }
    }
}