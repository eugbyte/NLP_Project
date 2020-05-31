using Microsoft.EntityFrameworkCore.Migrations;

namespace NLP.Migrations
{
    public partial class changednameofwebpagetoanalysisResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7fd0083c-2b7f-4734-8cda-b392f096d040");

            migrationBuilder.DropColumn(
                name: "WebPageId",
                table: "WebPages");

            migrationBuilder.AddColumn<int>(
                name: "AnalysisResultId",
                table: "WebPages",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages",
                column: "AnalysisResultId");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "2", 0, "059522a5-7362-4ead-8428-d7a4c4cb28fc", "User", null, false, false, null, null, null, null, null, false, "e6813303-52ad-4487-9bd9-0ea0c28151ff", false, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DropColumn(
                name: "AnalysisResultId",
                table: "WebPages");

            migrationBuilder.AddColumn<int>(
                name: "WebPageId",
                table: "WebPages",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages",
                column: "WebPageId");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "7fd0083c-2b7f-4734-8cda-b392f096d040", 0, "66fca9d5-5952-440d-8036-f2b09f560d72", "User", null, false, false, null, null, null, null, null, false, "9bf3bdc7-8014-463f-9289-f7ddfae41792", false, "Mark" });
        }
    }
}
