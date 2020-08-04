using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class EditInspectItem20200706 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "InspectItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "InspectItems",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateTime",
                table: "InspectItems",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateUser",
                table: "InspectItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "InspectItems");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "InspectItems");

            migrationBuilder.DropColumn(
                name: "LastUpdateTime",
                table: "InspectItems");

            migrationBuilder.DropColumn(
                name: "LastUpdateUser",
                table: "InspectItems");
        }
    }
}
