{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "node20 dev env";
  buildInputs = with pkgs; [
    nodejs_20
    nodePackages_latest.pnpm
    nodePackages_latest.typescript-language-server
    nodePackages_latest.vscode-css-languageserver-bin  
  ];
}
