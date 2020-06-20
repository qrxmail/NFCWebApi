using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NFCWebApi.Migrations
{
    public partial class nfc20200618 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Inspect",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    InspectNo = table.Column<string>(nullable: true),
                    InspectName = table.Column<string>(nullable: true),
                    InspectOrderNo = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateUser = table.Column<string>(nullable: true),
                    LastUpdateTime = table.Column<DateTime>(nullable: false),
                    LastUpdateUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inspect", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "InspectCycles",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    CycleName = table.Column<string>(nullable: true),
                    CycleType = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectCycles", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "InspectData",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    InspectNo = table.Column<string>(nullable: true),
                    DeviceNo = table.Column<string>(nullable: true),
                    InspectItemName = table.Column<string>(nullable: true),
                    ResultValue = table.Column<string>(nullable: true),
                    IsJumpInspect = table.Column<string>(nullable: true),
                    JumpInspectReason = table.Column<string>(nullable: true),
                    InspectTime = table.Column<DateTime>(nullable: false),
                    InspectUser = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectData", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "InspectItems",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    InspectNo = table.Column<string>(nullable: true),
                    InspectItemName = table.Column<string>(nullable: true),
                    ValueType = table.Column<string>(nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectItems", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "InspectTask",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    InspectNo = table.Column<string>(nullable: true),
                    DeviceNo = table.Column<string>(nullable: true),
                    InspectItemName = table.Column<string>(nullable: true),
                    TaskOrderNo = table.Column<string>(nullable: true),
                    TaskName = table.Column<string>(nullable: true),
                    InspectTime = table.Column<DateTime>(nullable: false),
                    InspectUser = table.Column<string>(nullable: true),
                    IsComplete = table.Column<string>(nullable: true),
                    InspectCompleteTime = table.Column<DateTime>(nullable: false),
                    InspectCompleteUser = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateUser = table.Column<string>(nullable: true),
                    LastUpdateTime = table.Column<DateTime>(nullable: false),
                    LastUpdateUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InspectTask", x => x.GId);
                });

            migrationBuilder.CreateTable(
                name: "NFCCard",
                columns: table => new
                {
                    GId = table.Column<Guid>(nullable: false),
                    NFCCardNo = table.Column<string>(nullable: true),
                    PrintNo = table.Column<string>(nullable: true),
                    DeviceNo = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    CreateTime = table.Column<DateTime>(nullable: false),
                    CreateUser = table.Column<string>(nullable: true),
                    LastUpdateTime = table.Column<DateTime>(nullable: false),
                    LastUpdateUser = table.Column<string>(nullable: true),
                    LastInspectTime = table.Column<DateTime>(nullable: false),
                    LastInspectUser = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NFCCard", x => x.GId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inspect");

            migrationBuilder.DropTable(
                name: "InspectCycles");

            migrationBuilder.DropTable(
                name: "InspectData");

            migrationBuilder.DropTable(
                name: "InspectItems");

            migrationBuilder.DropTable(
                name: "InspectTask");

            migrationBuilder.DropTable(
                name: "NFCCard");
        }
    }
}
