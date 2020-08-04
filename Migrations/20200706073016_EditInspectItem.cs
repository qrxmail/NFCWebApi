using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class EditInspectItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InspectNo",
                table: "InspectItems");

            migrationBuilder.AddColumn<string>(
                name: "InspectItemNo",
                table: "InspectItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InspectItemNo",
                table: "InspectItems");

            migrationBuilder.AddColumn<string>(
                name: "InspectNo",
                table: "InspectItems",
                type: "text",
                nullable: true);
        }
    }
}
