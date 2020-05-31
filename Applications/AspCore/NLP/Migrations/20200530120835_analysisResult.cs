using Microsoft.EntityFrameworkCore.Migrations;

namespace NLP.Migrations
{
    public partial class analysisResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WebPages_AspNetUsers_UserId",
                table: "WebPages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages");

            migrationBuilder.RenameTable(
                name: "WebPages",
                newName: "AnalysisResults");

            migrationBuilder.RenameIndex(
                name: "IX_WebPages_UserId",
                table: "AnalysisResults",
                newName: "IX_AnalysisResults_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AnalysisResults",
                table: "AnalysisResults",
                column: "AnalysisResultId");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "452c64fe-521f-4881-9668-057b9ffbcafc", "00e02b36-78e8-41a1-849a-89621d50e350" });

            migrationBuilder.AddForeignKey(
                name: "FK_AnalysisResults_AspNetUsers_UserId",
                table: "AnalysisResults",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalysisResults_AspNetUsers_UserId",
                table: "AnalysisResults");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AnalysisResults",
                table: "AnalysisResults");

            migrationBuilder.RenameTable(
                name: "AnalysisResults",
                newName: "WebPages");

            migrationBuilder.RenameIndex(
                name: "IX_AnalysisResults_UserId",
                table: "WebPages",
                newName: "IX_WebPages_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WebPages",
                table: "WebPages",
                column: "AnalysisResultId");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "SecurityStamp" },
                values: new object[] { "059522a5-7362-4ead-8428-d7a4c4cb28fc", "e6813303-52ad-4487-9bd9-0ea0c28151ff" });

            migrationBuilder.AddForeignKey(
                name: "FK_WebPages_AspNetUsers_UserId",
                table: "WebPages",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
