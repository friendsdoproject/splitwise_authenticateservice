import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    roots: ["<rootDir>/tests"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    verbose: true,
    testEnvironment: "node",
  };
};
