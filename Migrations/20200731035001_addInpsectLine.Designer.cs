﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NFCWebApi.Models;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace NFCWebApi.Migrations
{
    [DbContext(typeof(NFCContext))]
    [Migration("20200731035001_addInpsectLine")]
    partial class addInpsectLine
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("NFCWebApi.Models.Device", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BaiduLatitude")
                        .HasColumnType("text");

                    b.Property<string>("BaiduLongitude")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceName")
                        .HasColumnType("text");

                    b.Property<string>("DeviceNo")
                        .HasColumnType("text");

                    b.Property<string>("DeviceType")
                        .HasColumnType("text");

                    b.Property<string>("InspectNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("Latitude")
                        .HasColumnType("text");

                    b.Property<string>("Longitude")
                        .HasColumnType("text");

                    b.Property<string>("Region")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("Site")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("Device");
                });

            modelBuilder.Entity("NFCWebApi.Models.DeviceInspectItem", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceNo")
                        .HasColumnType("text");

                    b.Property<string>("InspectItemNo")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("DeviceInspectItem");
                });

            modelBuilder.Entity("NFCWebApi.Models.Inspect", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("InspectName")
                        .HasColumnType("text");

                    b.Property<string>("InspectNo")
                        .HasColumnType("text");

                    b.Property<int>("InspectOrderNo")
                        .HasColumnType("integer");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("Inspect");
                });

            modelBuilder.Entity("NFCWebApi.Models.InspectCycles", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("CycleName")
                        .HasColumnType("text");

                    b.Property<string>("CycleType")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("InspectCycles");
                });

            modelBuilder.Entity("NFCWebApi.Models.InspectData", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceNo")
                        .HasColumnType("text");

                    b.Property<string>("InspectItemNo")
                        .HasColumnType("text");

                    b.Property<string>("InspectNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("InspectTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("InspectUser")
                        .HasColumnType("text");

                    b.Property<string>("IsJumpInspect")
                        .HasColumnType("text");

                    b.Property<string>("JumpInspectReason")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<double>("ResultValue")
                        .HasColumnType("double precision");

                    b.Property<Guid>("TaskId")
                        .HasColumnType("uuid");

                    b.Property<string>("TaskNo")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("InspectData");
                });

            modelBuilder.Entity("NFCWebApi.Models.InspectItems", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("InspectItemName")
                        .HasColumnType("text");

                    b.Property<string>("InspectItemNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("Unit")
                        .HasColumnType("text");

                    b.Property<string>("ValueType")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("InspectItems");
                });

            modelBuilder.Entity("NFCWebApi.Models.InspectLine", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceInspectItems")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("LineName")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("InspectLine");
                });

            modelBuilder.Entity("NFCWebApi.Models.InspectTask", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("InspectCompleteTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("InspectCompleteUser")
                        .HasColumnType("text");

                    b.Property<string>("InspectItemNo")
                        .HasColumnType("text");

                    b.Property<string>("InspectNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("InspectTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("InspectUser")
                        .HasColumnType("text");

                    b.Property<string>("IsComplete")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("LineName")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.Property<string>("TaskName")
                        .HasColumnType("text");

                    b.Property<string>("TaskNo")
                        .HasColumnType("text");

                    b.Property<int>("TaskOrderNo")
                        .HasColumnType("integer");

                    b.HasKey("GId");

                    b.ToTable("InspectTask");
                });

            modelBuilder.Entity("NFCWebApi.Models.NFCCard", b =>
                {
                    b.Property<Guid>("GId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreateUser")
                        .HasColumnType("text");

                    b.Property<string>("DeviceNo")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastInspectTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastInspectUser")
                        .HasColumnType("text");

                    b.Property<DateTime>("LastUpdateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("LastUpdateUser")
                        .HasColumnType("text");

                    b.Property<string>("NFCCardNo")
                        .HasColumnType("text");

                    b.Property<string>("PrintNo")
                        .HasColumnType("text");

                    b.Property<string>("Remark")
                        .HasColumnType("text");

                    b.HasKey("GId");

                    b.ToTable("NFCCard");
                });
#pragma warning restore 612, 618
        }
    }
}
