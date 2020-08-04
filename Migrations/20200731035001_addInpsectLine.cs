using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class addInpsectLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LineName",
                table: "InspectTask",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "InspectCycles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreateUser",
                table: "InspectCycles",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateTime",
                table: "InspectCycles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastUpdateUser",
                table: "InspectCycles",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "InspectOrderNo",
                table: "Inspect",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "InspectLine",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    LineName = table.Column<string>(nullable: true),
                    DeviceInspectItems = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateUser = table.Column<string>(nullable: true),
                    LastUpdateTime = table.Column<DateTime>(nullable: false),
                    LastUpdateUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectLine", x => x.GId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InspectLine");

            migrationBuilder.DropColumn(
                name: "LineName",
                table: "InspectTask");

            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "InspectCycles");

            migrationBuilder.DropColumn(
                name: "CreateUser",
                table: "InspectCycles");

            migrationBuilder.DropColumn(
                name: "LastUpdateTime",
                table: "InspectCycles");

            migrationBuilder.DropColumn(
                name: "LastUpdateUser",
                table: "InspectCycles");

            migrationBuilder.AlterColumn<string>(
                name: "InspectOrderNo",
                table: "Inspect",
                type: "text",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
