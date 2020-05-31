using Microsoft.EntityFrameworkCore.Migrations;

namespace NLP.Migrations
{
    public partial class WebPageaddedaccuracyScoreConfusionMatrix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4c9eecce-2f22-451e-b8d5-676889f18e5c");

            migrationBuilder.DropColumn(
                name: "Analysis",
                table: "WebPages");

            migrationBuilder.AddColumn<double>(
                name: "AccuracyScore",
                table: "WebPages",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ConfusionMatrix",
                table: "WebPages",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "7fd0083c-2b7f-4734-8cda-b392f096d040", 0, "66fca9d5-5952-440d-8036-f2b09f560d72", "User", null, false, false, null, null, null, null, null, false, "9bf3bdc7-8014-463f-9289-f7ddfae41792", false, "Mark" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7fd0083c-2b7f-4734-8cda-b392f096d040");

            migrationBuilder.DropColumn(
                name: "AccuracyScore",
                table: "WebPages");

            migrationBuilder.DropColumn(
                name: "ConfusionMatrix",
                table: "WebPages");

            migrationBuilder.AddColumn<string>(
                name: "Analysis",
                table: "WebPages",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "4c9eecce-2f22-451e-b8d5-676889f18e5c", 0, "c63d1806-27a4-4f02-a3fb-9e9d0208d068", "User", null, false, false, null, null, null, null, null, false, "c96df57d-6e7b-486d-b72c-34fe2067171b", false, "Mark" });
        }
    }
}
