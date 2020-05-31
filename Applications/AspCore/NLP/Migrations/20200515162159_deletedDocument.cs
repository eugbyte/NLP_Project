using Microsoft.EntityFrameworkCore.Migrations;

namespace NLP.Migrations
{
    public partial class deletedDocument : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "97057b6f-f627-4449-bb58-e852eb471cc1");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "4c9eecce-2f22-451e-b8d5-676889f18e5c", 0, "c63d1806-27a4-4f02-a3fb-9e9d0208d068", "User", null, false, false, null, null, null, null, null, false, "c96df57d-6e7b-486d-b72c-34fe2067171b", false, "Mark" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4c9eecce-2f22-451e-b8d5-676889f18e5c");

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    DocumentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WebPageId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.DocumentId);
                    table.ForeignKey(
                        name: "FK_Documents_WebPages_WebPageId",
                        column: x => x.WebPageId,
                        principalTable: "WebPages",
                        principalColumn: "WebPageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "97057b6f-f627-4449-bb58-e852eb471cc1", 0, "803d2a68-1dd2-4bf7-9892-3630966d11dc", "User", null, false, false, null, null, null, null, null, false, "a29e6fad-810c-45ba-bb30-d44fbc7dcaf4", false, "Mark" });

            migrationBuilder.CreateIndex(
                name: "IX_Documents_WebPageId",
                table: "Documents",
                column: "WebPageId");
        }
    }
}
