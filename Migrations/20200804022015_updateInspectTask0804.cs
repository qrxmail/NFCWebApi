using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class updateInspectTask0804 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CycleEndTime",
                table: "InspectTask",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CycleStartTime",
                table: "InspectTask",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "InspectCycles",
                table: "InspectTask",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CycleEndTime",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "CycleStartTime",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "InspectCycles",
                table: "InspectTask");
        }
    }
}
