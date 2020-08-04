using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class UpdateInspectData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "InspectData",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "InspectData",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateTime",
                table: "InspectData",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateUser",
                table: "InspectData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TaskNo",
                table: "InspectData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "InspectData");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "InspectData");

            migrationBuilder.DropColumn(
                name: "LastUpdateTime",
                table: "InspectData");

            migrationBuilder.DropColumn(
                name: "LastUpdateUser",
                table: "InspectData");

            migrationBuilder.DropColumn(
                name: "TaskNo",
                table: "InspectData");
        }
    }
}
