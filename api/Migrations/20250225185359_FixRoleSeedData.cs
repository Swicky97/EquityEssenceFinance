using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixRoleSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "85a2d909-a7dd-49b3-9544-8f3a91895924");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a025a1e-0cf0-48a6-9330-e50a885a276d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d2a6b9c-8a8f-4c39-91b4-dbbf8b987c2a", null, "User", "USER" },
                    { "8f5b2c62-3d84-4a2e-a833-3344f8a9d9c1", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d2a6b9c-8a8f-4c39-91b4-dbbf8b987c2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f5b2c62-3d84-4a2e-a833-3344f8a9d9c1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "85a2d909-a7dd-49b3-9544-8f3a91895924", null, "User", "USER" },
                    { "8a025a1e-0cf0-48a6-9330-e50a885a276d", null, "Admin", "ADMIN" }
                });
        }
    }
}
