using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class UpdateInspectTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InspectItemName",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "InspectItemName",
                table: "InspectData");

            migrationBuilder.AddColumn<string>(
                name: "InspectItemNo",
                table: "InspectTask",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaskNo",
                table: "InspectTask",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InspectItemNo",
                table: "InspectData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InspectItemNo",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "TaskNo",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "InspectItemNo",
                table: "InspectData");

            migrationBuilder.AddColumn<string>(
                name: "InspectItemName",
                table: "InspectTask",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InspectItemName",
                table: "InspectData",
                type: "text",
                nullable: true);
        }
    }
}
