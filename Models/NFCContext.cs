using Microsoft.EntityFrameworkCore;

namespace NFCWebApi.Models
{
    public class NFCContext : DbContext
    {
        public NFCContext(DbContextOptions<NFCContext> options) : base(options)
        {

        }
        public DbSet<Device> Device { get; set; }
        public DbSet<Inspect> Inspect { get; set; }
        public DbSet<InspectLine> InspectLine { get; set; }
        public DbSet<InspectCycles> InspectCycles { get; set; }
        public DbSet<InspectData> InspectData { get; set; }
        public DbSet<InspectItems> InspectItems { get; set; }
        public DbSet<InspectTask> InspectTask { get; set; }
        public DbSet<NFCCard> NFCCard { get; set; }
        public DbSet<DeviceInspectItem> DeviceInspectItem { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}

