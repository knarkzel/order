{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    bix = {
      url = "github:knarkzel/bix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { bix, ... }: {
    packages.x86_64-linux = bix.buildNodePackage {
      src = ./.;
      packages = ./package.json;
      hash = "sha256-FLl4/6tHNFsX+4I23JQ37dqVYeVH+7crI5z8bIbNaEQ=";
    };
  };
}
